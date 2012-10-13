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
    type: "cube",
    name: "living couch new",
    size: {
      width: 155,
      height: 50,
      depth: 80
    },
    objectOrigin: "bottomleft",
    position: {
      x: 188,
      y: 0,
      z: 370
    },
    rotate: {
      x: 0,
      y: -50* 2*Math.PI/360,
      z: 0
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0x333333, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },   

  {
    type: "cube",
    name: "Chair1",
    size: {
      width: 50,
      height: 55,
      depth: 50
    },
    objectOrigin: "bottomleft",
    position: {
      x: 10,
      y: 0,
      z: 10
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },  
  {
    type: "cube",
    name: "Chair2",
    size: {
      width: 50,
      height: 55,
      depth: 50
    },
    objectOrigin: "bottomleft",
    position: {
      x: 10,
      y: 0,
      z: 70
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },   
  {
    type: "cube",
    name: "Chair3",
    size: {
      width: 50,
      height: 55,
      depth: 50
    },
    objectOrigin: "bottomleft",
    position: {
      x: 130,
      y: 0,
      z: 70
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },   
  
  {
    type: "cube",
    name: "fridge",
    size: {
      width: 70,
      height: 180,
      depth: 80
    },
    objectOrigin: "bottomleft",
    position: {
      x: 200,
      y: 0,
      z: 5
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xAAAAAA, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },  
  
  {
    type: "cube",
    name: "Bed",
    category: "Bed",
    size: {
      width: 185,
      height: 40,
      depth: 140
    },
    objectOrigin: "bottomleft",
    position: {
      x: 885,
      y: 0,
      z: 310
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xCCCCCC, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
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
  },    
  
  
  {
    type: "cube",
    name: "tvboard1",
    size: {
      width: 35,
      height: 60,
      depth: 190
    },
    objectOrigin: "bottomleft",
    position: {
      x: 5,
      y: 0,
      z: 270
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xCCCCCC, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },   
  
  
  {
    type: "cube",
    name: "table1",
    size: {
      width: 80,
      height: 90,
      depth: 135
    },
    objectOrigin: "bottomleft",
    position: {
      x: 55,
      y: 0,
      z: 5
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xFFFFFF, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },   
    
  
  {
    type: "cube",
    name: "tv",
    size: {
      width: 5,
      height: 60,
      depth: 100
    },
    objectOrigin: "bottomleft",
    position: {
      x: 685,
      y: 65,
      z: 350
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0x000000, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },
  
  {
    type: "cube",
     name: "Toilet",
    category: "Bath",
    size: {
      width: 75,
      height: 50,
      depth: 55
    },
    objectOrigin: "bottomleft",
    position: {
      x: 450,
      y: 20,
      z: 130
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xFFFFFF, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    },
    dynamic: true,
    action: {
      actionName: "toilet",
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
    } 
    
  },  
  {
    type: "cube",
    name: "shower",
    size: {
      width: 70,
      height: 10,
      depth: 20
    },
    objectOrigin: "bottomleft",
    position: {
      x: 450,
      y: 190,
      z: 50
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xCCCCCC, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },     
      
           
           
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
      loader.load('/3d/collada/wardrobe.dae', function (result) {
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
      loader.load('/3d/collada/rack.dae', function (result) {
        var dummy = new THREE.Object3D();
        
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
      loader.load('/3d/collada/desk.dae', function (result) {
        var dummy = new THREE.Object3D();
        
        
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
    type: "cube",
    name: "Sink",
    category: "Bath",
    size: {
      width: 65,
      height: 60,
      depth: 45
    },
    objectOrigin: "bottomleft",
    position: {
      x: 590,
      y: 60,
      z: 0
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    },
    dynamic: true,
    action: {
      actionName: "basin",
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
  },    
  
  {
    type: "cube",
    name: "nightstand 1",
    size: {
      width: 50,
      height: 40,
      depth: 50
    },
    objectOrigin: "bottomleft",
    position: {
      x: 1020,
      y: 0,
      z: 250
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xCCCCCC, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },
  
  {
    type: "cube",
    name: "nightstand 2",
    size: {
      width: 50,
      height: 40,
      depth: 50
    },
    objectOrigin: "bottomleft",
    position: {
      x: 1020,
      y: 0,
      z: 460
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xCCCCCC, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    }
  },        
    
    
  
  {
    type: "complex",
    name: "Upper Door",
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
      actionName: "upperRightDoor",
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
      loader.load('/3d/collada/tuer4.dae', function (result) {
        var dummy = new THREE.Object3D();
       
       
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
    name: "Lower Door",
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
      loader.load('/3d/collada/tuer4.dae', function (result) {
        var dummy = new THREE.Object3D();
       
       
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
      x: 120,
      y: 0,
      z: 480
    },
    getMashes: function() {
      var material = new THREE.MeshLambertMaterial( { color: 0x333333, wireframe: false });
      var segments = Math.round(32 * app.speed);
      if (segments < 6) {
        segments = 6;
      }
            
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
      x: 20,
      y: 0,
      z: 480
    },
    getMashes: function() {
      var material = new THREE.MeshLambertMaterial( { color: 0x333333, wireframe: false });
      var segments = Math.round(32 * app.speed);
      if (segments < 6) {
        segments = 6;
      }
      
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
      loader.load('/3d/collada/kitchen_back.dae', function (result) {
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
      loader.load('/3d/collada/kuechenschrank.dae', function (result) {
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
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/3d/collada/kuechenschrank.dae', function (result) {
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
    type: "cube",
    name: "Microwave",
    category: "Kitchen",
    size: {
      width: 40,
      height: 40,
      depth: 60
    },
    objectOrigin: "bottomleft",
    position: {
      x: 405,
      y: 120,
      z: 18
    },
    getMaterial: function() {
      return new THREE.MeshLambertMaterial( { color: 0xCCCCCC, wireframe: false/*, transparent: false, opacity: 0.2*/ } )
    },
    dynamic: true,
    action: {
      actionName: "microwaveBoard",
      icon: "../img/deviceicons/microwave_icon.png",
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
    } 
  },  
  

  
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
      var self = this;
      var loader = new THREE.ColladaLoader();
      loader.load('/3d/collada/kitchen_sink.dae', function (result) {
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
    name: "Lower Door",
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
      actionName: "lowerLeftDoor",
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
      loader.load('/3d/collada/tuer4.dae', function (result) {
        var dummy = new THREE.Object3D();
       
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
      loader.load('/3d/collada/tuer4.dae', function (result) {
        var dummy = new THREE.Object3D();
       
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
      actionName: "livingJack1",
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
    getMesh: function() {
      var geometry  = new THREE.CubeGeometry( this.size.width, this.size.height, this.size.depth );;
      var material  = new THREE.MeshLambertMaterial();
      var mesh  = new THREE.Mesh( geometry, material );
      return mesh;
    },    
    getLight: function() {
      //this.webglLight = new THREE.PointLight( 0xfffcca, 1, 280 );
      
      var spotLight = new THREE.SpotLight( 0xfffcca,3, 250,  Math.PI / 6);

      spotLight.castShadow = false;
      
      
      this.webglLight = spotLight;
      return this.webglLight;      
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
      x: 300,
      y: 60,
      z: 530
    }, 
    webglLight: null,
    action: {
      actionName: "livingJack1",
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
    getMesh: function() {
      var geometry  = new THREE.CubeGeometry( this.size.width, this.size.height, this.size.depth );;
      var material  = new THREE.MeshLambertMaterial();
      var mesh  = new THREE.Mesh( geometry, material );
      return mesh;
    },    
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 400 );


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
      actionName: "livinglight2",
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
      actionName: "livinglight2",
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
    getMesh: function() {
      var geometry  = new THREE.CubeGeometry( this.size.width, this.size.height, this.size.depth );;
      var material  = new THREE.MeshLambertMaterial();
      var mesh  = new THREE.Mesh( geometry, material );
      return mesh;
    },    
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 210 );


      return this.webglLight;      
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
      actionName: "livinglight2",
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
    getMesh: function() {
      var geometry  = new THREE.CubeGeometry( this.size.width, this.size.height, this.size.depth );;
      var material  = new THREE.MeshLambertMaterial();
      var mesh  = new THREE.Mesh( geometry, material );
      return mesh;
    },    
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 270 );


      return this.webglLight;      
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
    getMesh: function() {
      var geometry  = new THREE.CubeGeometry( this.size.width, this.size.height, this.size.depth );;
      var material  = new THREE.MeshLambertMaterial();
      var mesh  = new THREE.Mesh( geometry, material );
      return mesh;
    },    
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 270 );


      return this.webglLight;      
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
      y: 40,
      z: 280
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
    getMesh: function() {
      var geometry  = new THREE.CubeGeometry( this.size.width, this.size.height, this.size.depth );;
      var material  = new THREE.MeshLambertMaterial();
      var mesh  = new THREE.Mesh( geometry, material );
      return mesh;
    },    
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 100 );


      return this.webglLight;      
    }
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
      y: 40,
      z: 470
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
    getMesh: function() {
      var geometry  = new THREE.CubeGeometry( this.size.width, this.size.height, this.size.depth );;
      var material  = new THREE.MeshLambertMaterial();
      var mesh  = new THREE.Mesh( geometry, material );
      return mesh;
    },    
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xfffcca, 1, 100 );


      return this.webglLight;      
    }
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
    name: "AmbiendLight", 
    webglLight: null,  
    getLight: function() {
      this.webglLight = new THREE.AmbientLight( 0x333333);


      return this.webglLight;      
    }
  } ,
  
  {
    type: "light",
    name: "PointLight", 
    webglLight: null,  
    getLight: function() {
      this.webglLight = new THREE.PointLight( 0xffffff, 1, 2000 );
      this.webglLight.position.y += 1000;


      return this.webglLight;      
    }
  }     
    
   
]
