var SceneView = Backbone.View.extend({
  webgl: {
    scene: null,
    renderer: null,
    camera: null,
    stats: null,
    clock: new THREE.Clock(),
    objects: {
      ground: null,
      walls: [],
      lights: [],
      items: []
    },
    backboneSceneModel: null,
    
    initWebgl: function(scenemodel) {
      this.backboneSceneModel = scenemodel;
      
      if( Detector.webgl ){
        this.renderer = new THREE.WebGLRenderer({
          antialias   : true,
          preserveDrawingBuffer : true, 
          maxLights: 15 
        });

      }
      else{
        this.renderer  = new THREE.CanvasRenderer();
      }
    
      this.renderer.setClearColorHex( 0xEEEEEE, 1 );
      if (app.shadow === true) {
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;
      }         
      
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      document.getElementById('container').appendChild(this.renderer.domElement);
  
      // add Stats.js 
      this.stats = new Stats();
      this.stats.getDomElement().style.position = 'absolute';
      this.stats.getDomElement().style.left = '0px';
      this.stats.getDomElement().style.bottom = '0px';
      
      document.body.appendChild( this.stats.getDomElement() );

      // create a scene
      this.scene = new THREE.Scene();

      // put a camera in the scene
      this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000 );
      this.cameraTopView();
      
      //this.camera.position.set(0, 2350, 0.001);
      this.scene.add(this.camera);

      // transparently support window resize
      THREEx.WindowResize.bind(this.renderer, this.camera);
      THREEx.Screenshot.bindKey(this.renderer);


      this.camera.lookAt(this.scene.position);
      
      if ($.cookie('se_scene_cam') === null) {
        this.hideWalls();
      }      
    },
    animate: function() {
      var self = this;
      requestAnimationFrame( function() {
        TWEEN.update();
        self.animate();
        
      });
     
      this.render();
      this.stats.update();
    },
    
    // render the scene
    render: function() {
      this.renderer.render( this.scene, this.camera );
    },
    
    drawCube: function(cubedata) {
      var geometry  = new THREE.CubeGeometry( cubedata.size.width, cubedata.size.height, cubedata.size.depth );;
      var material  = cubedata.getMaterial();
      var mesh  = new THREE.Mesh( geometry, material );

      this.translateObjectToOrigin(cubedata, mesh)
      
      mesh.castShadow = true;
      mesh.receiveShadow  = true;  
      
      cubedata.meshes = [mesh];
      if (cubedata.category !== undefined && cubedata.category === "wall") {
        this.objects.walls.push(cubedata);  
      }
      else if (cubedata.category !== undefined && cubedata.category === "ground") {
        this.objects.ground = cubedata; 
      }      
      else {
        this.objects.items.push(cubedata);
      }
      
      if (cubedata.dynamic === undefined || cubedata.dynamic === false) { 
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();      
      }      
      
      if (cubedata.action) {
        app.mouse.addClickableObject(mesh, cubedata);
      }       
      
      this.scene.add( mesh ); 
    },
    
    drawComplexObject: function(complexdata) {
      var meshes = complexdata.getMashes();
      for (var i in meshes) {
        var mesh = meshes[i];
        
        mesh.castShadow = true;
        mesh.receiveShadow  = true;
        
        this.translateObjectToOrigin(complexdata, mesh);
        
        if (complexdata.meshes) {
          complexdata.meshes.push(mesh);
        }
        else {
          complexdata.meshes = [mesh];
        }
        if (complexdata.category !== undefined && complexdata.category === "wall") {
          this.objects.walls.push(complexdata);        
        }
        else if (complexdata.category !== undefined && complexdata.category === "ground") {
          this.objects.ground = complexdata; 
        }          
        else {
          this.objects.items.push(complexdata);
          
        }        
        
        if (complexdata.dynamic === undefined || complexdata.dynamic === false) { 
          mesh.matrixAutoUpdate = false;
          mesh.updateMatrix();      
        }    
        
        if (complexdata.action) {
          app.mouse.addClickableObject(mesh, complexdata);
        }    
        
        this.scene.add( mesh );             
      }
    },
    
    drawLight: function(lightdata) {
      var light = lightdata.getLight();
      if (lightdata.position) {
        this.translateObjectToOrigin(lightdata, light);
      }
      this.scene.add( light );
      
      var mesh = null;
      if (lightdata.getMesh) {
        mesh = lightdata.getMesh();
        this.translateObjectToOrigin(lightdata, mesh);
        this.scene.add( mesh );        
      
      
        if (lightdata.dynamic === undefined || lightdata.dynamic === false) { 
          mesh.matrixAutoUpdate = false;
          mesh.updateMatrix();
          
          light.matrixAutoUpdate = false;
          light.updateMatrix();        
                
        }  
        
        if (lightdata.action) {
          app.mouse.addClickableObject(mesh, lightdata);
        }          
        
      }
      
      if (lightdata.lookAt) {
        this.scene.add(light.target);
        light.target.position.set(this.backboneSceneModel.get("sceneOrigin").x + lightdata.lookAt.x,
                                      this.backboneSceneModel.get("sceneOrigin").y + lightdata.lookAt.y,
                                      this.backboneSceneModel.get("sceneOrigin").z - lightdata.lookAt.z);
      }     
      
    },
    
    translateObjectToOrigin: function(objectdata, mesh) {
      
      if (objectdata.rotate) {
        mesh.rotation.x = objectdata.rotate.x;
        mesh.rotation.y = objectdata.rotate.y;
        mesh.rotation.z = objectdata.rotate.z;
      }
    
      var transx = this.backboneSceneModel.get("sceneOrigin").x + objectdata.position.x;
      var transy = this.backboneSceneModel.get("sceneOrigin").y + objectdata.position.y;
      var transz = this.backboneSceneModel.get("sceneOrigin").z - objectdata.position.z;
      
      if (objectdata.objectOrigin === "bottomleft") {
        transx += objectdata.size.width/2;
        transy += objectdata.size.height/2;
        transz -= objectdata.size.depth/2;
      }    
      
      mesh.translateX(transx);
      mesh.translateY(transy);
      mesh.translateZ(transz);
    },
    changeCamera: function(pos) {
      if (pos.x !== undefined) {
        this.camera.position.x = pos.x
      }
      if (pos.y !== undefined) {
        this.camera.position.y = pos.y
      }
      if (pos.z !== undefined) {
        this.camera.position.z = pos.z
      }
      $("body").trigger("onCameraChange", [{x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z}]);           
    },
    cameraTopView: function() {
      this.changeCamera({
        x:0,
        y: 2200,
        z: 1
      })    
      this.camera.lookAt(this.scene.position); 
    },
    camera45DegreeView: function() {
      this.changeCamera({
        x: 0,
        y: 1800,
        z: 1700
      })
      this.camera.lookAt(this.scene.position); 
    },
    _zoom: function(factor) {
      
      var fpsFactor = 60.0/this.stats.getFps();
      
      var i = 0;
      var self = this;
      var a = setInterval(function() {
        i += 1;
        self.changeCamera({
          x: self.camera.position.x * factor,
          y: self.camera.position.y * factor,
          z: self.camera.position.z * factor
        })
        if (i >= 25) {
          clearInterval(a);
        }
      },5);        
    },
    zoomIn: function() {
      factor = 0.995;
      this._zoom(factor);
    
    },
    zoomOut: function() {
      factor = 1.005;
      this._zoom(factor);
    },
    hideWalls: function() {
      for (var i in this.objects.walls) {
        var objectdata = this.objects.walls[i];
        var wallmeshes = objectdata.meshes;
        for (var j in wallmeshes) {
          var mesh = wallmeshes[j];
          if (mesh.scale.y !== 0.2) {
            mesh.scale.y = 0.2;
            mesh.lastPosY = mesh.position.y;
            mesh.position.y = 0; 
            mesh.updateMatrix();
          }
       }
      }
    },
    showWalls: function() {
      for (var i in this.objects.walls) {
        var objectdata = this.objects.walls[i];
        var wallmeshes = objectdata.meshes;
        for (var j in wallmeshes) {
          var mesh = wallmeshes[j];
          if (mesh.scale.y != 1) {
            mesh.scale.y = 1; 
            //this.translateObjectToOrigin(objectdata, mesh);
            mesh.position.y = mesh.lastPosY;
            mesh.updateMatrix();
          }
       }
      }      
         
    }
    
  },
  
  manualInit: function() {
    var self = this;

    this.webgl.initWebgl(this.model)
    
    var wmi = new WebglMouseInteraction(self.webgl, '#container');
    wmi.initDraggableObjects();
    wmi.initMouseWheelZoom();
    wmi.initLeftButtonMove();
    wmi.initRightButtonRotate();
    wmi.initResizeableObjects();
    wmi.initClickableObjects(); 
    
    app.mouse = wmi;    
    
    var modelDownloadsRunning = 0;
    
    for(var i in mapObjects) {
      var mapObject = mapObjects[i];
      if (mapObject.type === "cube") {
        this.webgl.drawCube(mapObject);
      }
      else if(mapObject.type === "complex") {
        if (mapObject.async && mapObject.async === true) {
          modelDownloadsRunning++;
          mapObject.load(function(m) {
            self.webgl.drawComplexObject(m);
            modelDownloadsRunning--;
          });
        }
        else {
          this.webgl.drawComplexObject(mapObject);
        }
      }
      
      else if(mapObject.type === "light") {
        if (mapObject.async && mapObject.async === true) {
          modelDownloadsRunning++;
          mapObject.load(function(m) {
            self.webgl.drawLight(m);
            modelDownloadsRunning--;
          });
        }
        else {
          this.webgl.drawLight(mapObject);
        }
      }      
    }
    
    var iv;
    iv = setInterval(function() {
      if (modelDownloadsRunning === 0) {
        clearInterval(iv);
        
        
        
        var snv = new SceneNavigationView({
          model: self.model
        });
        
        var lv = new LocalizationView();    
        var rv = new RegionView();
        var dv = new DeviceView();
        var uv = new UserView(); 
        var cv = new CommandView(); 
        self.webgl.animate();       
            
        
      }
    },50)
    
                    
    
    
    

   

    
  },  
  
  events: {
  },
  

  
  render: function() {
    
  }
  
});
   /* $(document).bind("mousedown" ,function(event) {
      event.preventDefault();
    })
    
    //$(document).bind("touchmove", function(event) {
    $(document).bind("mousemove", function(event) {      
      ///*if (!event.originalEvent.touches) {
       // return;
      //}
      //mouseX = event.originalEvent.touches[ 0 ].pageX - windowHalfX;
      //mouseY = event.originalEvent.touches[ 0 ].pageY - windowHalfY;
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
      $("#bla").html(mouseX);
      mouseX = mouseX/4;
      mouseY = -mouseY/4;
      var theta = 0 + mouseX;
      var theta2 = 60 + mouseY;
      
      self.webgl.camera.position.x = 3000 * Math.sin( theta * Math.PI / 360 );
      self.webgl.camera.position.z = 2400*Math.cos( theta2 * Math.PI / 360 ) * Math.cos( theta * Math.PI / 360 ) ; 
      self.webgl.camera.position.y = 2500 * Math.sin( theta2 * Math.PI / 360 );
      self.webgl.camera.lookAt(self.webgl.scene.position);

    })*/

