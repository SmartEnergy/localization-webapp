var mapObjects = [

  {
    type: "cube",
    name: "Ground",
    category: "ground",
    size: {
      width: 1070,
      height: 1,
      depth: 585
    },
    position: {
      x: 535,
      y: 0,
      z: 292.5
    },
    objectOrigin: "center",
    getMaterial: function() {
      var a = new THREE.MeshLambertMaterial( { color: 0xd0bea4, wireframe: false } )
      return a;
    }
    
  },
  
  {
    type: "cube",
    name: "Wall Left",
    category: "wall",
    size: {
      width: 5,
      height: 250,
      depth: 150//585
    },
    objectOrigin: "bottomleft",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  }, 
  
  {
    type: "cube",
    name: "Wall Left",
    category: "wall",
    size: {
      width: 5,
      height: 250,
      depth: 335//585
    },
    objectOrigin: "bottomleft",
    position: {
      x: 0,
      y: 0,
      z: 250
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },    
  
  {
    type: "cube",
    name: "Wall Right",
    category: "wall",
    size: {
      width: 5,
      height: 250,
      depth: 50
    },
    objectOrigin: "bottomleft",
    position: {
      x: 1070,
      y: 0,
      z: 0
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  }, 
  
  {
    type: "cube",
    name: "Wall Right",
    category: "wall",
    size: {
      width: 5,
      height: 250,
      depth: 435
    },
    objectOrigin: "bottomleft",
    position: {
      x: 1070,
      y: 0,
      z: 150
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },    
  
  {
    type: "cube",
    name: "Wall Back",
    category: "wall",
    size: {
      width: 75,
      height: 250,
      depth: 5
    },
    objectOrigin: "bottomleft",
    position: {
      x: 0,
      y: 0,
      z: 585
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  } ,  
  
  {
    type: "cube",
    name: "Wall Back2",
    category: "wall",
    size: {
      width: 75,
      height: 250,
      depth: 5
    },
    objectOrigin: "bottomleft",
    position: {
      x: 520,
      y: 0,
      z: 585
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  } ,    
  
  {
    type: "cube",
    name: "Wall Back3",
    category: "wall",
    size: {
      width: 510,
      height: 20,
      depth: 5
    },
    objectOrigin: "bottomleft",
    position: {
      x: 75,
      y: 230,
      z: 585
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  } ,   
  
  
  {
    type: "cube",
    name: "Wall Back4",
    category: "wall",
    size: {
      width: 420,
      height: 20,
      depth: 5
    },
    objectOrigin: "bottomleft",
    position: {
      x: 595,
      y: 230,
      z: 585
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  } ,   
  
  {
    type: "cube",
    name: "Wall Back2",
    category: "wall",
    size: {
      width: 75,
      height: 250,
      depth: 5
    },
    objectOrigin: "bottomleft",
    position: {
      x: 1000,
      y: 0,
      z: 585
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  } ,   
  
  {
    type: "cube",
    name: "Wall Front",
    category: "wall",
    size: {
      width: 1070,
      height: 250,
      depth: 5
    },
    objectOrigin: "bottomleft",
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  } ,    
  
  {
    type: "cube",
    name: "Wall Living1",
    category: "wall x",
    size: {
      width: 5,
      height: 250,
      depth: 210
    },
    objectOrigin: "bottomleft",
    position: {
      x: 450,
      y: 0,
      z: 0
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },  
  
  {
    type: "cube",
    name: "Wall Living2",
    category: "wall x",
    size: {
      width: 5,
      height: 250,
      depth: 150
    },
    objectOrigin: "bottomleft",
    position: {
      x: 450,
      y: 0,
      z: 324
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  }   
  
,  
  
  {
    type: "cube",
    name: "Wall Bed1",
    category: "wall x",
    size: {
      width: 5,
      height: 250,
      depth: 210
    },
    objectOrigin: "bottomleft",
    position: {
      x: 680,
      y: 0,
      z: 0
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },  
  
  {
    type: "cube",
    name: "Wall BEd2",
    category: "wall x",
    size: {
      width: 5,
      height: 250,
      depth: 150
    },
    objectOrigin: "bottomleft",
    position: {
      x: 680,
      y: 0,
      z: 324
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },  
  
  {
    type: "cube",
    name: "Wall Bath1",
    category: "wall x",
    size: {
      width: 120,
      height: 250,
      depth: 5
    },
    objectOrigin: "bottomleft",
    position: {
      x: 370,
      y: 0,
      z: 210
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  }, 
  
  {
    type: "cube",
    name: "Wall Bath2",
    category: "wall x",
    size: {
      width: 40,
      height: 250,
      depth: 5
    },
    objectOrigin: "bottomleft",
    position: {
      x: 645,
      y: 0,
      z: 210
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xf6eee8, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },      
  

 
  {
    type: "complex",
    name: "living couch new",
    objectOrigin: "bottomleft",
    size: {
      width: 0,
      height: 0,
      depth: 150
    },
    position: {
      x: 250,
      y: 0,
      z: 480
    },
    rotate: {
      x: 0,
      y: -50* 2*Math.PI/360,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/couch.dae', function (result) {
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );        
        var dummy = new THREE.Object3D();
        result.scene.scale.set(2.1,2.12,2.1);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    270* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } , 
  
  {
    type: "complex",
    name: "Chair 1",
    objectOrigin: "bottomleft",
    size: {
      width: 110,
      height: 0,
      depth: 10
    },
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/chair2.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );           
        
        
        var geometry = result.scene.children[ 0 ].geometry;
        var material = result.scene.children[ 0 ].material;
        
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 30, 0, 0 );
        result.scene.add( mesh );
        
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( 45, -25, 0 );
        mesh.rotation.z = 180* 2*Math.PI/360
        result.scene.add( mesh );
        
        
        result.scene.scale.set(2.7,2.7,2.7);
        result.scene.rotation.set(270* 2*Math.PI/360,  0 ,    90* 2*Math.PI/360);
        
        dummy.add( result.scene );
        
        
        
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,  
  
  {
    type: "complex",
    name: "fridge 1",
    objectOrigin: "bottomleft",
    size: {
      width: 140,
      height: 0,
      depth: 160
    },
    position: {
      x: 190,
      y: 0,
      z: 0
    },
    rotate: {
      x: 0,
      y: 180* 2*Math.PI/360,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/fridge.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );           
        
        result.scene.scale.set(2.7,2.7,2.7);
        result.scene.rotation.set(270* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,    
  
  
  {
    type: "complex",
    name: "Bed",
    category: "Bed",
    objectOrigin: "bottomleft",
    size: {
      width: 10,
      height: 0,
      depth: 300
    },
    position: {
      x: 885,
      y: 0,
      z: 300
    },
    rotate: {
      x: 0,
      y: 270* 2*Math.PI/360,
      z: 0
    },    
    action: {
      actionName: "Bett",
      icon: "../img/deviceicons/bett_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "Top",
          type: "slider",                            
          values: [0,255,5],
          value: 0,
          onChange: function(parent, oldvalue, newvalue) {
          }                         
        },
       {
          name: "Bottom",
          type: "slider",                            
          values: [0,255,5],
          value: 0,
          onChange: function(parent, oldvalue, newvalue) {
          }                         
        }        
     ]  
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/bed2.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );            
        
        result.scene.scale.set(2.2,2.2,2.2);
        result.scene.rotation.set(270* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,    
  
  {
    type: "complex",
    name: "tv board 1",
    objectOrigin: "bottomleft",
    size: {
      width: 10,
      height: 0,
      depth: 0
    },
    position: {
      x: 0,
      y: 0,
      z: 270
    },
    rotate: {
      x: 0,
      y: 0,//270* 2*Math.PI/360,
      z: 0
    },    
    async: true,
    load: function(callback) {
      //console.log(1);
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/sideboard.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );            
        
        result.scene.scale.set(2.2,3.2,2.2);
        result.scene.rotation.set(270* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,   
  
  
  
  {
    type: "complex",
    name: "Table 1",
    objectOrigin: "bottomleft",
    size: {
      width: 160,
      height: 0,
      depth: 0
    },
    position: {
      x: 55,
      y: 0,
      z: 0
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/table.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );            
        
        result.scene.scale.set(2.8,2.8,2.8);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    90* 2*Math.PI/360);
        
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,   
  

  
  {
    type: "complex",
    name: "tv",
    objectOrigin: "bottomleft",
    size: {
      width: 20,
      height: 0,
      depth: 200
    },
    position: {
      x: 680,
      y: 65,
      z: 350
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/tv.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );            
        
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    180* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,      
      
  {
    type: "complex",
     name: "Toilet",
    category: "Bath",
    objectOrigin: "bottomleft",
    size: {
      width: 10,
      height: 0,
      depth: 10
    },
    position: {
      x: 450,
      y: 15,
      z: 130
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    dynamic: true,
    action: {
      actionName: "bathroomToilet",
      actionId: "2/0/5",
      icon: "../img/deviceicons/toilet.png",
      category: "Baall",
      options: [ 
       {
          name: "Position",
          type: "slider",                            
          values: [0,255,5],
          value: 0,
          onChange: function(parent, oldvalue, newvalue) {
            var self = this;
            if (parent.loadedMesh && oldvalue !== newvalue) {
              if (!self.scenePosition) {
                self.scenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              }
              self.lastScenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              var target = {
                y: self.scenePosition.y - ((15/self.values[1]) * newvalue)  
              };
              var tween = new TWEEN.Tween(self.lastScenePosition).to(target, 4000);
              tween.onUpdate(function(){
                 parent.loadedMesh.position.y = this.y;
              });  
              tween.start();
            }
           
           }                         
        }
     ]  
    },      
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/toilet.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );            
        
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    0* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,        
       
  {
    type: "complex",
    name: "shower",
    objectOrigin: "bottomleft",
    size: {
      width: 10,
      height: 0,
      depth: 10
    },
    position: {
      x: 445,
      y: 185,
      z: 50
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/shower2.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.position.x = -200;
        result.scene.position.y = -45;
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    0);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,       
           
{
    type: "complex",
    name: "wardrobe",
    objectOrigin: "bottomleft",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    position: {
      x: 460,
      y: 0,
      z: 340
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/wardrobe.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );            
        
        //result.scene.position.x = -200;
        //result.scene.position.y = -45;
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    0);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
},           

 {
    type: "complex",
    name: "rack",
    objectOrigin: "bottomleft",
    size: {
      width: 80,
      height: 10,
      depth: 10
    },
    position: {
      x: 260,
      y: 0,
      z: 0
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/rack.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );          
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    90* 2*Math.PI/360);
        
        
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,           
                 
  {
    type: "complex",
    name: "desk",
    objectOrigin: "bottomleft",
    size: {
      width: 500,
      height: 10,
      depth: 10
    },
    position: {
      x: 690,
      y: 0,
      z: 0
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/desk.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );            
        
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    90* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } , 
  
  {
    type: "complex",
    name: "Sink",
    category: "Bath",
    objectOrigin: "bottomleft",
    size: {
      width: 150,
      height: 0,
      depth: 10
    },
    position: {
      x: 580,
      y: 30,
      z: 0
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    dynamic: true,
    action: {
      actionName: "basin",
      actionId: "2/0/2",
      icon: "../img/deviceicons/basin_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "Position",
          type: "slider",                            
          values: [0,255,5],
          value: 0,
          onChange: function(parent, oldvalue, newvalue) {
            var self = this;
            if (parent.loadedMesh && oldvalue !== newvalue) {
              if (!self.scenePosition) {
                self.scenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              }
              self.lastScenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              var target = {
                y: self.scenePosition.y - ((30/self.values[1]) * newvalue)  
              };
              var tween = new TWEEN.Tween(self.lastScenePosition).to(target, 4000);
              tween.onUpdate(function(){
                 parent.loadedMesh.position.y = this.y;
              });  
              tween.start();
            }
           
           }                         
        }
     ]  
    },      
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/bath_sink2.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.position.y = -50;
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    90* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,  
  
  {
    type: "complex",
    name: "nightstand 1",
    objectOrigin: "bottomleft",
    size: {
      width: 110,
      height: 0,
      depth: 10
    },
    position: {
      x: 1013,
      y: 0,
      z: 260
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/nightstand.dae', function (result) {
        var dummy = new THREE.Object3D();
       
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );           
       
        result.scene.scale.set(1.15,1.15,0.7);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    90* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,    
      
  {
    type: "complex",
    name: "nightstand 2",
    objectOrigin: "bottomleft",
    size: {
      width: 110,
      height: 0,
      depth: 10
    },
    position: {
      x: 1013,
      y: 0,
      z: 450
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/nightstand.dae', function (result) {
        var dummy = new THREE.Object3D();
       
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;        
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );           
       
        result.scene.scale.set(1.15,1.15,0.7);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    90* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } , 
    
    
  
  {
    type: "complex",
    name: "Upper Door - Bedroom",
    category: "Bed",
    objectOrigin: "bottomleft",
    size: {
      width: 20,
      height: 0,
      depth: 10
    },
    position: {
      x: 662,
      y: 0,
      z: 470
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    dynamic: true,
    action: {
      actionName: "lowerLeftDoor",
      actionId: "3/0/0",
      icon: "../img/deviceicons/door_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "Auf/Zu",
          type: "switch",                            
          values: ["On", "Off"],
          value: "Off",
          onChange: function(parent, oldvalue, newvalue) {
            var self = this;
            if (parent.loadedMesh && oldvalue !== newvalue) {
              
              if (!self.scenePositionZ) {
                self.scenePositionZ = parent.loadedMesh.position.z;
              }
              var target;
              if (this.value === "On") {
                target = { z : self.scenePositionZ+110};
              }
              else {
                target = { z : self.scenePositionZ};
              }
              var tween = new TWEEN.Tween({z: parent.loadedMesh.position.z }).to(target, 4000);
              tween.onUpdate(function(){
                 parent.loadedMesh.position.z = this.z ;
              });  
              tween.easing( TWEEN.Easing.Quartic.InOut )
              tween.start();
            }
          }                         
       }
     ]  
    },     
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/tuer4.dae', function (result) {
        var dummy = new THREE.Object3D();
       
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );        
       
        result.scene.scale.set(2.8,2.8,2.8);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    0);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,      
    
  {
    type: "complex",
    name: "Lower Door - Bedroom",
    category: "Bed",
    objectOrigin: "bottomleft",
    size: {
      width: 20,
      height: 0,
      depth: 10
    },
    position: {
      x: 667,
      y: 0,
      z: 210
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    dynamic: true,
    action: {
      actionName: "lowerRightDoor",
      actionId: "3/0/1",
      icon: "../img/deviceicons/door_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "Auf/Zu",
          type: "switch",                            
          values: ["On", "Off"],
          value: "Off",
          onChange: function(parent, oldvalue, newvalue) {
            var self = this;
            if (parent.loadedMesh && oldvalue !== newvalue) {
              
              if (!self.scenePositionZ) {
                self.scenePositionZ = parent.loadedMesh.position.z;
              }
              var target;
              if (this.value === "On") {
                target = { z : self.scenePositionZ-110};
              }
              else {
                target = { z : self.scenePositionZ};
              }
              var tween = new TWEEN.Tween({z: parent.loadedMesh.position.z }).to(target, 4000);
              tween.onUpdate(function(){
                 parent.loadedMesh.position.z = this.z ;
              });  
              tween.easing( TWEEN.Easing.Quartic.InOut )
              tween.start();
            }
          }                         
       }
     ]  
    },     
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/tuer4.dae', function (result) {
        var dummy = new THREE.Object3D();
       
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );         
       
        result.scene.scale.set(2.8,2.8,2.8);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    0);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,    

  


  {
    type: "complex",
    name: "living table",
    objectOrigin: "bottomleft",
    size: {
      width: 100,
      height: 160,
      depth: 100
    },
    position: {
      x: 90,
      y: 0,
      z: 480
    },
    getMashes: function() {
      var material = new THREE.MeshLambertMaterial( { color: 0x333333, wireframe: false });
      var segments = Math.round(32 * app.speed);
      
      var geometry1  = new THREE.CylinderGeometry( 37,37, 5, segments,segments );;
      var mesh1  = new THREE.Mesh( geometry1, material );
      
      var geometry2  = new THREE.CylinderGeometry( 5,5,80,segments,segments );;
      var mesh2  = new THREE.Mesh( geometry2, material );
      mesh2.translateY(-40);
      
      var geometry3 = new THREE.CylinderGeometry( 25,25,5,segments,segments );;
      var mesh3  = new THREE.Mesh( geometry3, material );
      mesh3.translateY(-70);
      return [mesh1, mesh2, mesh3];
    }
  } , 
  
  {
    type: "complex",
    name: "living table small",
    objectOrigin: "bottomleft",
    size: {
      width: 100,
      height: 160,
      depth: 100
    },
    position: {
      x: 10,
      y: 0,
      z: 480
    },
    getMashes: function() {
      var material = new THREE.MeshLambertMaterial( { color: 0x333333, wireframe: false });
      var segments = Math.round(32 * app.speed);
      
      var geometry1  = new THREE.CylinderGeometry( 30,30, 5, segments,segments );;
      var mesh1  = new THREE.Mesh( geometry1, material );
      
      var geometry2  = new THREE.CylinderGeometry( 5,5,80,segments,segments );;
      var mesh2  = new THREE.Mesh( geometry2, material );
      mesh2.translateY(-40);
      
      var geometry3 = new THREE.CylinderGeometry( 20,20,5,segments,segments );;
      var mesh3  = new THREE.Mesh( geometry3, material );
      mesh3.translateY(-70);
      return [mesh1, mesh2, mesh3];
    }
  } ,   
  
  
  
  {
    type: "complex",
    name: "kitchen back",
    objectOrigin: "bottomleft",
    size: {
      width: 15,
      height: 90,
      depth: 420
    },
    position: {
      x: 440,
      y: 0,
      z: 0
    },
    rotate: {
      x: 0,
      y: 180* 2*Math.PI/360,
      z: 0
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/kitchen_back.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    0);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,  
  
  {
    type: "complex",
    name: "Cups",
    category: "Kitchen",
    objectOrigin: "bottomleft",
    size: {
      width: 80,
      height: 0,
      depth: 130
    },
    position: {
      x: 400,
      y: 120,
      z: 135
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    dynamic: true,
    action: {
      actionName: "cupboard",
      actionId: "2/1/6",
      icon: "../img/deviceicons/cups_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "Position",
          type: "slider",                            
          values: [0,255,5],
          value: 0,
          onChange: function(parent, oldvalue, newvalue) {
            var self = this;
            if (parent.loadedMesh && oldvalue !== newvalue) {
              if (!self.scenePosition) {
                self.scenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              }
              self.lastScenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              var target = {
                x: self.scenePosition.x - ((15/self.values[1]) * newvalue)  ,
                y: self.scenePosition.y - ((30/self.values[1]) * newvalue)  
              };
              var tween = new TWEEN.Tween(self.lastScenePosition).to(target, 4000);
              tween.onUpdate(function(){
                 parent.loadedMesh.position.y = this.y;
                 parent.loadedMesh.position.x = this.x
              });  
              tween.start();
            }
           
           }                         
        }
     ]  
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/kuechenschrank.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    180* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,       
  
  {
    type: "complex",
    name: "kitchen schrank2",
    objectOrigin: "bottomleft",
    size: {
      width: 80,
      height: 0,
      depth: 130
    },
    position: {
      x: 400,
      y: 120,
      z: 75
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    async: true,
    load: function(callback) {
      //console.log(1);
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/kuechenschrank.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    180* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,  
  
  {
    type: "complex",
    name: "Microwave",
    category: "Kitchen",
    objectOrigin: "bottomleft",
    size: {
      width: 0,
      height: 0,
      depth: 130
    },
    position: {
      x: 400,
      y: 120,
      z: 15
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    dynamic: true,
    action: {
      actionName: "microwaveBoard",
      actionId: "2/1/5",
      icon: "../img/deviceicons/microwave_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "Position",
          type: "slider",                            
          values: [0,255,5],
          value: 0,
          onChange: function(parent, oldvalue, newvalue) {
            newvalue = parseInt(newvalue);
            var self = this;
            if (parent.loadedMesh && oldvalue !== newvalue) {
              if (!self.scenePosition) {
                self.scenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              }
              self.lastScenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              var target = {
                x: self.scenePosition.x - ((15/self.values[1]) * newvalue)  ,
                y: self.scenePosition.y - ((30/self.values[1]) * newvalue)  
              };
              var tween = new TWEEN.Tween(self.lastScenePosition).to(target, 4000);
              tween.onUpdate(function(){
                 parent.loadedMesh.position.y = this.y;
                 parent.loadedMesh.position.x = this.x
              });  
              tween.start();
            }
           
           }                         
        }
     ]  
    },     
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/microwave.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    270* 2*Math.PI/360);
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } , 
  
  {
    type: "complex",
    name: "Sink",
    category: "Kitchen",
    objectOrigin: "bottomleft",
    size: {
      width: 130,
      height: 0,
      depth: 400
    },
    position: {
      x: 380,
      y: 70,
      z: 0
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },   
    dynamic: true,
    action: {
      actionName: "kitchenet",
      actionId: "2/1/4",
      icon: "../img/deviceicons/kitchenette_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "Position",
          type: "slider",                            
          values: [0,255,5],
          value: 0,
          onChange: function(parent, oldvalue, newvalue) {
            var self = this;
            if (parent.loadedMesh && oldvalue !== newvalue) {
              if (!self.scenePosition) {
                self.scenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              }
              self.lastScenePosition = {x: parent.loadedMesh.position.x, y: parent.loadedMesh.position.y};
              var target = {
                y: self.scenePosition.y - ((30/self.values[1]) * newvalue)  
              };
              var tween = new TWEEN.Tween(self.lastScenePosition).to(target, 4000);
              tween.onUpdate(function(){
                 parent.loadedMesh.position.y = this.y;
              });  
              tween.start();
            }
           
           }                         
        }
     ]  
    },      
    async: true,
    load: function(callback) {
      //console.log(1);
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/kitchen_sink.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        result.scene.scale.set(2.6,2.6,2.6);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    180* 2*Math.PI/360);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,  
 
  
  
  
    
 {
    type: "complex",
    name: "Lower Door - Livingroom",
    category: "Living",
    objectOrigin: "bottomleft",
    size: {
      width: 20,
      height: 0,
      depth: 10
    },
    position: {
      x: 448,
      y: 0,
      z: 210
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    dynamic: true,
    action: {
      actionName: "upperRightDoor",
      actionId: "3/1/1",
      icon: "../img/deviceicons/door_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "Auf/Zu",
          type: "switch",                            
          values: ["On", "Off"],
          value: "Off",
          onChange: function(parent, oldvalue, newvalue) {
            var self = this;
            if (parent.loadedMesh && oldvalue !== newvalue) {
              
              if (!self.scenePositionZ) {
                self.scenePositionZ = parent.loadedMesh.position.z;
              }
              var target;
              if (this.value === "On") {
                target = { z : self.scenePositionZ-110};
              }
              else {
                target = { z : self.scenePositionZ};
              }
              var tween = new TWEEN.Tween({z: parent.loadedMesh.position.z }).to(target, 4000);
              tween.onUpdate(function(){
                 parent.loadedMesh.position.z = this.z ;
              });  
              tween.easing( TWEEN.Easing.Quartic.InOut )
              tween.start();
            }
          }                         
       }
     ]  
    },       
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/tuer4.dae', function (result) {
        var dummy = new THREE.Object3D();
       
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );  
               
        result.scene.scale.set(2.8,2.8,2.8);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    0);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,  
  
  {
    type: "complex",
    name: "Upper Door",
    category: "Living",
    objectOrigin: "bottomleft",
    size: {
      width: 20,
      height: 0,
      depth: 10
    },
    position: {
      x: 453,
      y: 0,
      z: 470
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },    
    dynamic: true,
    action: {
      actionName: "upperLeftDoor",
      actionId: "3/1/0",
      icon: "../img/deviceicons/door_icon.png",
      category: "Baall",
      options: [ 
                 {
                    name: "Auf/Zu",
                    type: "switch",                            
                    values: ["On", "Off"],
                    value: "Off",
                    onChange: function(parent, oldvalue, newvalue) {
                      var self = this;
                      if (parent.loadedMesh && oldvalue !== newvalue) {
                        
                        if (!self.scenePositionZ) {
                          self.scenePositionZ = parent.loadedMesh.position.z;
                        }
                        var target;
                        if (this.value === "On") {
                          target = { z : self.scenePositionZ+110};
                        }
                        else {
                          target = { z : self.scenePositionZ};
                        }
                        var tween = new TWEEN.Tween({z: parent.loadedMesh.position.z }).to(target, 4000);
                        tween.onUpdate(function(){
                           parent.loadedMesh.position.z = this.z ;
                        });  
                        tween.easing( TWEEN.Easing.Quartic.InOut )
                        tween.start();
                      }
                    }                         
                 }
               ]  
    },    
    async: true,
    load: function(callback) {
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/collada/tuer4.dae', function (result) {
        var dummy = new THREE.Object3D();
       
        result.scene.castShadow = true;
        result.scene.receiveShadow = true;
        THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {
        
            child.castShadow = true;
            child.receiveShadow = true;
        
        } );         
       
        result.scene.scale.set(2.8,2.8,2.8);
        result.scene.rotation.set(270* 2*Math.PI/360,   0,    0);
        
        dummy.add( result.scene );
        self.loadedMesh = dummy;
        
        callback(self);
        
      });        
    },
    getMashes: function() {
      return [this.loadedMesh];
    }
  } ,     
    
  {
    type: "light",
    name: "Table Light",
    category: "Living",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 100,
      y: 180,
      z: 100
    },
    lookAt: {
      x: 100,
      y: 80,
      z: 100
    },
    webglLight: null,
    dynamic: true,
    action: {
      actionName: "livingLight1",
      actionId: "0/0/2",
      icon: "../img/deviceicons/lamp3_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "On/Off",
          type: "switch",                            
          values: ["On", "Off"],
          value: "On",
          onChange: function(parent, oldvalue, newvalue) {
            if (this.value === "On") {
              parent.webglLight.intensity = 1;
              parent.webglLight.shadowDarkness = 0.2;
            }
            else {
              parent.webglLight.intensity = 0;
              parent.webglLight.shadowDarkness = 0;
            }
            
            
          }                         
       }
     ]  
    },
    
    getLight: function() {
      var spotLight = new THREE.SpotLight( 0xfffcca,3, 250,  Math.PI / 6);

      spotLight.castShadow = true;
      
      spotLight.shadowMapWidth = 1024;
      spotLight.shadowMapHeight = 1024;
      spotLight.shadowDarkness = 0.2;
      spotLight.shadowCameraNear = 50;
      spotLight.shadowCameraFar = 200;
      spotLight.shadowCameraFov = 70;
      spotLight.shadowCameraVisible       = false;
      
      
      
      this.webglLight = spotLight;
      return this.webglLight;      
    },
    loadedMesh: null,
    async: true,
    load: function(callback) {
      var self = this;
      if (this.loadedMesh === null) {
        var loader = new THREE.ColladaLoader();
        loader.load('/collada/spotlight.dae', function (result) {
          var dummy = new THREE.Object3D();
          
          result.scene.rotation.set(310* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
          
          dummy.add( result.scene );
          self.loadedMesh = dummy;
          
          callback(self);
          
        });
      }        
    },
    getMesh: function() {
      return this.loadedMesh;
    } 
  }, 
  {
    type: "light",
    name: "Couch Light",
    category: "Living",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 230,
      y: 0,
      z: 550
    }, 
    webglLight: null,
    action: {
      actionName: "livingJack1",
      actionId: "1/0/0",
      icon: "../img/deviceicons/lamp1_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "On/Off",
          type: "switch",                            
          values: ["On", "Off"],
          value: "On",
          onChange: function(parent, oldvalue, newvalue) {
            if (newvalue === "On") {
              parent.webglLight.intensity = 1;
              parent.webglLight.visible = true;
            }
            else {
              parent.webglLight.intensity = 0;
              parent.webglLight.visible = false;
            }
            
          }                         
       }
     ]  
    },
    loadedMesh: null,
    async: true,
    load: function(callback) {
      var self = this;
      if (this.loadedMesh === null) {
        var loader = new THREE.ColladaLoader();
        loader.load('/collada/lamp2.dae', function (result) {
          var dummy = new THREE.Object3D();
          
          result.scene.rotation.set(270* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
          
          dummy.add( result.scene );
          self.loadedMesh = dummy;
          
          callback(self);
          
        });
      }        
    },
    getMesh: function() {
      return this.loadedMesh;
    },  
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 600 );


      return this.webglLight;      
    }
  }, 
  {
    type: "light",
    name: "Kitchen Light",
    category: "Kitchen",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 410,
      y: 110,
      z: 100
    }, 
    webglLight: null,
    action: {
      actionName: "kitchenLight",
      actionId: "0/0/1",
      icon: "../img/deviceicons/lamp2_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "On/Off",
          type: "switch",                            
          values: ["On", "Off"],
          value: "Off",
          onChange: function(parent, oldvalue, newvalue) {
            if (this.value === "On") {
              parent.webglLight.intensity = 1;
              parent.webglLight.visible = true;
            }
            else {
              parent.webglLight.intensity = 0;
              parent.webglLight.visible = false;
            }
            
          }                         
       }
     ]  
    },
    getMesh: function() {
      var geometry  = new THREE.CubeGeometry( this.size.width, this.size.height, this.size.depth );;
      var material  = new THREE.MeshLambertMaterial();
      var mesh  = new THREE.Mesh( geometry, material );
      return mesh;
    },    
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 200 );


      return this.webglLight;      
    }
  }, 
  
  {
    type: "light",
    name: "Bath Light",
    category: "Bath",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 550,
      y: 180,
      z: 100
    }, 
    webglLight: null,
    action: {
      actionName: "bathroomLight",
      actionId: "0/4/0",
      icon: "../img/deviceicons/lamp4_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "On/Off",
          type: "switch",                            
          values: ["On", "Off"],
          value: "On",
          onChange: function(parent, oldvalue, newvalue) {
            if (this.value === "On") {
              parent.webglLight.intensity = 1;
              parent.webglLight.visible = true;
            }
            else {
              parent.webglLight.intensity = 0;
              parent.webglLight.visible = false;
            }
            
          }                         
       }
     ]  
    },
       
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 210 );


      return this.webglLight;      
    },
    loadedMesh: null,
    async: true,
    load: function(callback) {
      var self = this;
      if (this.loadedMesh === null) {
        var loader = new THREE.ColladaLoader();
        loader.load('/collada/spotlight.dae', function (result) {
          var dummy = new THREE.Object3D();
          
          result.scene.rotation.set(310* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
          
          dummy.add( result.scene );
          self.loadedMesh = dummy;
          
          callback(self);
          
        });
      }        
    },
    getMesh: function() {
      return this.loadedMesh;
    } 
  },    
  
  {
    type: "light",
    name: "Wardrobe Light",
    category: "Hall",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 550,
      y: 180,
      z: 530
    }, 
    webglLight: null,
    action: {
      actionName: "corridorLight",
      actionId: "0/4/1",
      icon: "../img/deviceicons/spotlight_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "On/Off",
          type: "switch",                            
          values: ["On", "Off"],
          value: "On",
          onChange: function(parent, oldvalue, newvalue) {
            if (this.value === "On") {
              parent.webglLight.intensity = 1;
              parent.webglLight.visible = true;
            }
            else {
              parent.webglLight.intensity = 0;
              parent.webglLight.visible = false;
            }
            
          }                         
       }
     ]  
    },  
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 270 );


      return this.webglLight;      
    },
    loadedMesh: null,
    async: true,
    load: function(callback) {
      var self = this;
      if (this.loadedMesh === null) {
        var loader = new THREE.ColladaLoader();
        loader.load('/collada/spotlight.dae', function (result) {
          var dummy = new THREE.Object3D();
          
          result.scene.rotation.set(220* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
          
          dummy.add( result.scene );
          self.loadedMesh = dummy;
          
          callback(self);
          
        });
      }        
    },
    getMesh: function() {
      return this.loadedMesh;
    } 
  },
  
  {
    type: "light",
    name: "Desk Light",
    category: "Bed",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 720,
      y: 180,
      z: 80
    }, 
    webglLight: null,
    action: {
      actionName: "livinglight2",
      actionId: "2/0/2",
      icon: "../img/deviceicons/lamp3_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "On/Off",
          type: "switch",                            
          values: ["On", "Off"],
          value: "On",
          onChange: function(parent, oldvalue, newvalue) {
            if (this.value === "On") {
              parent.webglLight.intensity = 1;
              parent.webglLight.visible = true;
            }
            else {
              parent.webglLight.intensity = 0;
              parent.webglLight.visible = false;
            }
            
          }                         
       }
     ]  
    },   
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 270 );


      return this.webglLight;      
    },
    loadedMesh: null,
    async: true,
    load: function(callback) {
      var self = this;
      if (this.loadedMesh === null) {
        var loader = new THREE.ColladaLoader();
        loader.load('/collada/spotlight.dae', function (result) {
          var dummy = new THREE.Object3D();
          
          result.scene.rotation.set(310* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
          
          dummy.add( result.scene );
          self.loadedMesh = dummy;
          
          callback(self);
          
        });
      }        
    },
    getMesh: function() {
      return this.loadedMesh;
    } 
  },  
  
  {
    type: "light",
    name: "Nightstand Light 1",
    category: "Bed",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 1040,
      y: 30,
      z: 275
    }, 
    webglLight: null,
    action: {
      actionName: "livinglight2",
      icon: "../img/deviceicons/lamp1_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "On/Off",
          type: "switch",                            
          values: ["On", "Off"],
          value: "On",
          onChange: function(parent, oldvalue, newvalue) {
            if (this.value === "On") {
              parent.webglLight.intensity = 1;
              parent.webglLight.visible = true;
            }
            else {
              parent.webglLight.intensity = 0;
              parent.webglLight.visible = false;
            }
            
          }                         
       }
     ]  
    },  
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 100 );
      return this.webglLight;      
    },
    loadedMesh: null,
    async: true,
    load: function(callback) {
      var self = this;
      if (this.loadedMesh === null) {
        var loader = new THREE.ColladaLoader();
        loader.load('/collada/lamp2.dae', function (result) {
          var dummy = new THREE.Object3D();
          result.scene.scale.set(0.8,0.8,0.6);
          result.scene.rotation.set(270* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
          
          dummy.add( result.scene );
          self.loadedMesh = dummy;
          
          callback(self);
          
        });
      }        
    },
    getMesh: function() {
      return this.loadedMesh;
    }, 
  },  
  
  {
    type: "light",
    name: "Nightstand Light 2",
    category: "Bed",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 1040,
      y: 30,
      z: 465
    }, 
    webglLight: null,
    action: {
      actionName: "livinglight2",
      icon: "../img/deviceicons/lamp1_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "On/Off",
          type: "switch",                            
          values: ["On", "Off"],
          value: "On",
          onChange: function(parent, oldvalue, newvalue) {
            if (this.value === "On") {
              parent.webglLight.intensity = 1;
              parent.webglLight.visible = true;
            }
            else {
              parent.webglLight.intensity = 0;
              parent.webglLight.visible = false;
            }
            
          }                         
       }
     ]  
    }, 
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 100 );


      return this.webglLight;      
    },
    loadedMesh: null,
    async: true,
    load: function(callback) {
      var self = this;
      if (this.loadedMesh === null) {
        var loader = new THREE.ColladaLoader();
        loader.load('/collada/lamp2.dae', function (result) {
          var dummy = new THREE.Object3D();
          result.scene.scale.set(0.8,0.8, 0.6);
          result.scene.rotation.set(270* 2*Math.PI/360,  0 ,    0* 2*Math.PI/360);
          
          dummy.add( result.scene );
          self.loadedMesh = dummy;
          
          callback(self);
          
        });
      }        
    },
    getMesh: function() {
      return this.loadedMesh;
    },
  },   
  
  {
    type: "light",
    name: "Bed Light",
    category: "Bed",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 690,
      y: 180,
      z: 400
    }, 
    webglLight: null,
    action: {
      actionName: "livinglight2",
      icon: "../img/deviceicons/lamp2_icon.png",
      category: "Baall",
      options: [ 
       {
          name: "On/Off",
          type: "switch",                            
          values: ["On", "Off"],
          value: "On",
          onChange: function(parent, oldvalue, newvalue) {
            if (this.value === "On") {
              parent.webglLight.intensity = 1;
              parent.webglLight.visible = true;
            }
            else {
              parent.webglLight.intensity = 0;
              parent.webglLight.visible = false;
            }
            
          }                         
       }
     ]  
    },
    getMesh: function() {
      var geometry  = new THREE.CubeGeometry( this.size.width, this.size.height, this.size.depth );;
      var material  = new THREE.MeshLambertMaterial();
      var mesh  = new THREE.Mesh( geometry, material );
      return mesh;
    },    
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 200 );


      return this.webglLight;      
    }
  },
  
{
    type: "light",
    name: "Sunlight 1",
    size: {
      width: 10,
      height: 10,
      depth: 10
    },
    objectOrigin: "bottomleft",
    position: {
      x: 500,
      y: 1500,
      z: 500
    },
    lookAt: {
      x: 450,
      y: 0,
      z: 0
    },     
    getLight: function() {
      this.webglLight = new THREE.DirectionalLight(0xffffff);//new THREE.PointLight( 0xfffcca, 1, 430 );
      this.webglLight.intensity = 0.2;
      this.webglLight.castShadow = true;
      this.webglLight.shadowMapWidth = 1024;
      this.webglLight.shadowMapHeight = 1024;
      this.webglLight.shadowDarkness = 0.2;
      this.webglLight.shadowCameraNear = 100;
      this.webglLight.shadowCameraFar = 3000;
      this.webglLight.shadowCameraFov = 70;
      this.webglLight.shadowCameraVisible       = false;

      return this.webglLight;           
    }
  },    
  
  {
    type: "light",
    name: "DirectionalLight 1", 
    webglLight: null,  
    getLight: function() {
      light = new THREE.DirectionalLight(0xffffff, 0.4);//new THREE.PointLight( 0xfffcca, 1, 430 );
      light.castShadow = false;
      light.position.set( -350, 200, 100 );
      this.webglLight = light;


      return this.webglLight;      
    }
  },
  
  {
    type: "light",
    name: "DirectionalLight 2", 
    webglLight: null,  
    getLight: function() {
      light = new THREE.DirectionalLight(0xffffff, 0.4);//new THREE.PointLight( 0xfffcca, 1, 430 );
      light.castShadow = false;
      light.position.set( 350, 200, 100 );
      this.webglLight = light;


      return this.webglLight;      
    }
  }      
       
   
]


