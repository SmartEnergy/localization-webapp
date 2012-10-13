var UserNavView = Backbone.View.extend({
  webglObjects: [],
  headObject: null,
  initialize: function(options) {
    var self = this;

    this.navContent = options.navContent;

    this.setElement(ich.userNavTmpl());
    $(this.navContent).append(this.el);


     this.render();
     this.model.on('change', this.render, this)
     _.bindAll(this, 'render');
  },  
  
  events: {

  },
  removeUser: function(realdelete) {
    if (this.webglObjects.length > 0) {
      for (var i in this.webglObjects) {
        var l = this.webglObjects[i];
        app.sceneview.webgl.scene.remove(l);
      }
    } 
    if (this.headObject && realdelete === true) {
      app.sceneview.webgl.scene.remove(this.headObject);
    }   
  },
  render: function() {
    this.removeUser();
    
    // Wenn joints da sind, dann hinmalen, sonst nur kopf
    if (this.model.has("joints") && this.model.get("joints").length > 0) {
      var joints = this.model.get("joints");
      
      var jointsOrdered = this.model.getJointsSortedById();
      
      var material = new THREE.LineBasicMaterial({
          color: 0x000000,
          linewidth: 5
      });      
        
      // lowest joint z
      var lowestZ = 99999;
      for (var l in joints) {
        var k = joints[l];
        if (k.z < lowestZ)  {
          lowestZ = k.z
        }
      }  
            
      for (var j in joints) {
        var jo = joints[j];
        if (jo.x !== 0 || jo.y !== 0 || jo.z !== 0) {
        jo.z -= lowestZ; 
        jo.x = app.sceneview.model.get("sceneOrigin").x  + jo.x; 
        jo.y = app.sceneview.model.get("sceneOrigin").z - jo.y ;
        }
      }  
      
      jointsOrdered[4].x = (jointsOrdered[17].x + jointsOrdered[21].x) / 2;
      jointsOrdered[4].y = (jointsOrdered[17].y + jointsOrdered[21].y) / 2;
      jointsOrdered[4].z = jointsOrdered[17].z;
      
      var geometry1 = new THREE.Geometry();
      if (jointsOrdered[1].x !== 0 || jointsOrdered[1].y !== 0 || jointsOrdered[1].z !== 0) {
        geometry1.vertices.push(new THREE.Vector3(jointsOrdered[1].x, jointsOrdered[1].z, jointsOrdered[1].y));
        
      }
      
      if (jointsOrdered[2].x !== 0 || jointsOrdered[2].y !== 0 || jointsOrdered[2].z !== 0) {
        geometry1.vertices.push(new THREE.Vector3(jointsOrdered[2].x, jointsOrdered[2].z, jointsOrdered[2].y));
      }
      
      if (jointsOrdered[3].x !== 0 || jointsOrdered[3].y !== 0 || jointsOrdered[3].z !== 0) {
        geometry1.vertices.push(new THREE.Vector3(jointsOrdered[3].x, jointsOrdered[3].z, jointsOrdered[3].y));
      }
                  
      if (jointsOrdered[4].x !== 0 || jointsOrdered[4].y !== 0 || jointsOrdered[4].z !== 0) {
        geometry1.vertices.push(new THREE.Vector3(jointsOrdered[4].x, jointsOrdered[4].z, jointsOrdered[4].y));
      }                  
      
      
      var geometry2 = new THREE.Geometry();
      if (jointsOrdered[2].x !== 0 || jointsOrdered[2].y !== 0 || jointsOrdered[2].z !== 0) {
        geometry2.vertices.push(new THREE.Vector3(jointsOrdered[2].x, jointsOrdered[2].z, jointsOrdered[2].y));
      }  
      
      
      if (jointsOrdered[12].x !== 0 || jointsOrdered[12].y !== 0 || jointsOrdered[12].z !== 0) {
      geometry2.vertices.push(new THREE.Vector3(jointsOrdered[12].x, jointsOrdered[12].z, jointsOrdered[12].y));
      } 
      
      if (jointsOrdered[13].x !== 0 || jointsOrdered[13].y !== 0 || jointsOrdered[13].z !== 0) {
      geometry2.vertices.push(new THREE.Vector3(jointsOrdered[13].x, jointsOrdered[13].z, jointsOrdered[13].y));
      } 
      
      
      if (jointsOrdered[15].x !== 0 || jointsOrdered[15].y !== 0 || jointsOrdered[15].z !== 0) {
      geometry2.vertices.push(new THREE.Vector3(jointsOrdered[15].x, jointsOrdered[15].z, jointsOrdered[15].y));
      }                                   
      
      
      
      var geometry3 = new THREE.Geometry();
      
      if (jointsOrdered[2].x !== 0 || jointsOrdered[2].y !== 0 || jointsOrdered[2].z !== 0) {
      geometry3.vertices.push(new THREE.Vector3(jointsOrdered[2].x, jointsOrdered[2].z, jointsOrdered[2].y));
      }  
      
      
      if (jointsOrdered[6].x !== 0 || jointsOrdered[6].y !== 0 || jointsOrdered[6].z !== 0) {
      geometry3.vertices.push(new THREE.Vector3(jointsOrdered[6].x, jointsOrdered[6].z, jointsOrdered[6].y));
      }  
      
      if (jointsOrdered[7].x !== 0 || jointsOrdered[7].y !== 0 || jointsOrdered[7].z !== 0) {
      geometry3.vertices.push(new THREE.Vector3(jointsOrdered[7].x, jointsOrdered[7].z, jointsOrdered[7].y));
      }  
      
      
      if (jointsOrdered[9].x !== 0 || jointsOrdered[9].y !== 0 || jointsOrdered[9].z !== 0) {
      geometry3.vertices.push(new THREE.Vector3(jointsOrdered[9].x, jointsOrdered[9].z, jointsOrdered[9].y)); 
      }  
      
                                                
      
      var geometry4 = new THREE.Geometry();
      
      if (jointsOrdered[4].x !== 0 || jointsOrdered[4].y !== 0 || jointsOrdered[4].z !== 0) {
      geometry4.vertices.push(new THREE.Vector3(jointsOrdered[4].x, jointsOrdered[4].z, jointsOrdered[4].y));
      }  
      
      if (jointsOrdered[21].x !== 0 || jointsOrdered[21].y !== 0 || jointsOrdered[21].z !== 0) {
      geometry4.vertices.push(new THREE.Vector3(jointsOrdered[21].x, jointsOrdered[21].z, jointsOrdered[21].y));
      } 
      
      if (jointsOrdered[22].x !== 0 || jointsOrdered[22].y !== 0 || jointsOrdered[22].z !== 0) {
      geometry4.vertices.push(new THREE.Vector3(jointsOrdered[22].x, jointsOrdered[22].z, jointsOrdered[22].y));
      } 
      

      
      if (jointsOrdered[24].x !== 0 || jointsOrdered[24].y !== 0 || jointsOrdered[24].z !== 0) {
      geometry4.vertices.push(new THREE.Vector3(jointsOrdered[24].x, jointsOrdered[24].z, jointsOrdered[24].y));
      } 
                                                  
       
      var geometry5 = new THREE.Geometry();
      
      if (jointsOrdered[4].x !== 0 || jointsOrdered[4].y !== 0 || jointsOrdered[4].z !== 0) {
      geometry5.vertices.push(new THREE.Vector3(jointsOrdered[4].x, jointsOrdered[4].z, jointsOrdered[4].y));
      }   
      
      if (jointsOrdered[17].x !== 0 || jointsOrdered[17].y !== 0 || jointsOrdered[17].z !== 0) {
      geometry5.vertices.push(new THREE.Vector3(jointsOrdered[17].x, jointsOrdered[17].z, jointsOrdered[17].y));
      } 
      
      if (jointsOrdered[18].x !== 0 || jointsOrdered[18].y !== 0 || jointsOrdered[18].z !== 0) {
      geometry5.vertices.push(new THREE.Vector3(jointsOrdered[18].x, jointsOrdered[18].z, jointsOrdered[18].y));
      } 
      
      if (jointsOrdered[20].x !== 0 || jointsOrdered[20].y !== 0 || jointsOrdered[20].z !== 0) {
      geometry5.vertices.push(new THREE.Vector3(jointsOrdered[20].x, jointsOrdered[20].z, jointsOrdered[20].y));
      } 
      
                                         
          
      var line1 = new THREE.Line(geometry1, material);
      var line2 = new THREE.Line(geometry2, material);
      var line3 = new THREE.Line(geometry3, material);
      var line4 = new THREE.Line(geometry4, material);
      var line5 = new THREE.Line(geometry5, material);
      
      line1.castShadow = true;
      line2.castShadow = true;
      line3.castShadow = true;
      line4.castShadow = true;
      line5.castShadow = true;

      app.sceneview.webgl.scene.add(line1);
      app.sceneview.webgl.scene.add(line2);
      app.sceneview.webgl.scene.add(line3);
      app.sceneview.webgl.scene.add(line4);
      app.sceneview.webgl.scene.add(line5);
      
      
      
 
      
      this.webglObjects = [line1,line2,line3,line4,line5];

    }
    else {
      

    } 
    
    // Egal ob es joints gibt, kopf immer zeichnen
    if (this.headObject === null) {
      var headgeo = new THREE.SphereGeometry(12, 16 ,16);
      var headmat = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false } )
      var head = new THREE.Mesh( headgeo, headmat );
      head.castShadow = true;
      app.sceneview.webgl.scene.add( head );   
      
      this.headObject = head;
    }
    
    if ((this.model.has("joints") && this.model.get("joints").length > 0) && (jointsOrdered[1].x != 0 || jointsOrdered[1].y != 0 || jointsOrdered[1].z != 0 ) ) {
      this.headObject.position.x = jointsOrdered[1].x;
      this.headObject.position.y = jointsOrdered[1].z;
      this.headObject.position.z = jointsOrdered[1].y;       
    }
    else {
      this.headObject.position.x  = this.model.get("position").x + app.sceneview.model.get("sceneOrigin").x;
      this.headObject.position.z  = app.sceneview.model.get("sceneOrigin").z - this.model.get("position").y ;
       this.headObject.position.y  = 180;
    }
  
  }
});