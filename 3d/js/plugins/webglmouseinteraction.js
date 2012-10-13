function WebglMouseInteraction(webgl, webglElement) {
  this.webgl = webgl;
  this.webglEl = webglElement;
  this.buttonsDown = {
    left: false,
    right: false,
  };
  this.draggableObjects = [];
  this.dragEnabled = false;
  
  this.resizeableObjects = [];
  this.resizeEnabled = false;
  this.resizePossible = false;
  
  this.disableInteraction = false;
  
  
  this.clickableObjects = []
  this.clickableEnabled = false;
}

WebglMouseInteraction.prototype.addClickableObject = function(mesh, mapObject) {
  var self = this;
  mesh.parentObj = mesh;
  mesh.mapObj = mapObject;
  self.clickableObjects.push(mesh);
  THREE.SceneUtils.traverseHierarchy( mesh, function ( child ) {
    child.parentObj = mesh;
    child.mapObj = mapObject;
    self.clickableObjects.push(child);
  } );  
  
}

WebglMouseInteraction.prototype.initClickableObjects = function() {
  
  var self = this;
  
  var projector = new THREE.Projector();
  var intersectedObject = null;
  
  var dragStartMousePosition = null;
  var objectStartPosition = null;
  
  $(this.webglEl).bind("mouseup",function(event) {
    event.preventDefault();
    
    if (self.disableInteraction || self.resizePossible) {
      return;
    }
    
    var mouse = {};
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;    
    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, self.webgl.camera );

    var ray = new THREE.Ray( self.webgl.camera.position, vector.subSelf( self.webgl.camera.position ).normalize() );
    var intersects = ray.intersectObjects( self.clickableObjects );
    if (intersects.length > 0) {

      intersectedObject = intersects[0];
      $(intersectedObject.object.mapObj).trigger("objectClick", [event, intersectedObject]);
    }
  });
  

}


WebglMouseInteraction.prototype.initMouseWheelZoom = function() {
  
  var self = this;
  
  if (this.disableInteraction) {
    return;
  }
  
  $(this.webglEl).bind('mousewheel', function(event, delta) {
    event.preventDefault();
    if (delta < 0) {
      self.webgl.zoomOut();
    }
    else {
      self.webgl.zoomIn();
    }
  });   
}

WebglMouseInteraction.prototype.initLeftButtonMove = function() {
  var self = this;
  
  var mousestart = {
    x: 0,
    y: 0
  };
  
  var startposcamera2;
  $(this.webglEl).bind("mousedown" ,function(event) {
    
    if (self.disableInteraction) {
      return;
    }    
    
  
    
    event.preventDefault();
    if( event.button === 0 ) { 
      
      startposcamera2 = {
        x: self.webgl.camera.position.x,
        y: self.webgl.camera.position.y, 
        z: self.webgl.camera.position.z
      };        
      
      mousestart = {
        x: event.clientX,// - (window.innerWidth / 2),
        y: event.clientY //- (window.innerHeight / 2)     
      }        
          
      self.buttonsDown.left = true;
    }
  });
  
  $(this.webglEl).bind("mouseup" ,function(event) {
    event.preventDefault();
    if (self.disableInteraction) {
      return;
    }    
    
    if( event.button == 0 ) { 
       self.buttonsDown.left = false;
    }
  });
  
  $(this.webglEl).bind("mousemove", function(event) {
      
    if (self.disableInteraction || self.dragEnabled || self.resizeEnabled) { return; }
    
    var mouseX = event.clientX - mousestart.x;
    var mouseY = event.clientY - mousestart.y;       
    if (self.buttonsDown.left) {
      self.webgl.changeCamera({
        x: startposcamera2.x + mouseX,
        z: startposcamera2.z + mouseY
      });
    } 
  });           
}


WebglMouseInteraction.prototype.initRightButtonRotate = function() {
  var self = this;
  var startposcamera = {
    x: self.webgl.camera.position.x,
    y: self.webgl.camera.position.y, 
    z: self.webgl.camera.position.z
  };
  
  $(this.webglEl).bind("mousedown" ,function(event) {
    event.preventDefault();
    if (self.disableInteraction) {
      return;
    }      
    if( event.button === 2 ) { 

      self.buttonsDown.right = true;
    }
  });
  
  $(this.webglEl).bind("mouseup" ,function(event) {
    event.preventDefault();
    if (self.disableInteraction) {
      return;
    }      
    if( event.button == 2 ) { 
       self.buttonsDown.right = false;
    }
  }) 
  
  $(this.webglEl).bind("mousemove", function(event) { 
    if (self.disableInteraction || self.dragEnabled || self.resizeEnabled) { return; }
        
    var mouseX = event.clientX - (window.innerWidth / 2);
    var mouseY = event.clientY - (window.innerHeight / 2);       

    if (self.buttonsDown.right) {
      var theta = mouseX/2.5;       
      var theta2 = 60+mouseY/4;
      
      if (theta2 > 0) {
        self.webgl.changeCamera({
          x: 0,
          y: startposcamera.y * Math.cos(theta2 * Math.PI / 360) - startposcamera.z * Math.sin( theta2 * Math.PI / 360 ),
          z: startposcamera.y * Math.sin(theta2 * Math.PI / 360) - startposcamera.z * Math.cos( theta2 * Math.PI / 360 )
        });   
      }
      
      self.webgl.changeCamera({
        x: startposcamera.x * Math.cos(theta * Math.PI / 360) + self.webgl.camera.position.z * Math.sin( theta * Math.PI / 360 ),
        z: startposcamera.x * (-1) * Math.sin(theta * Math.PI / 360) + self.webgl.camera.position.z * Math.cos( theta * Math.PI / 360 )
      });           

      self.webgl.camera.lookAt(self.webgl.scene.position);   
    }

  });
  
  $(this.webglEl).bind("contextmenu", function(e) {
      e.preventDefault();
  });               
}


WebglMouseInteraction.prototype.initDraggableObjects = function() {
  var self = this;
  
  var projector = new THREE.Projector();
  var intersectedObject = null;
  
  var dragStartMousePosition = null;
  var objectStartPosition = null;
  
  $(this.webglEl).bind("mousedown" ,function(event) {
    event.preventDefault();
    
    if (self.disableInteraction || self.resizePossible) {
      return;
    }
    
    var mouse = {};
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;    
    var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
    projector.unprojectVector( vector, self.webgl.camera );

    var ray = new THREE.Ray( self.webgl.camera.position, vector.subSelf( self.webgl.camera.position ).normalize() );

    var intersects = ray.intersectObjects( self.draggableObjects );    
    if (intersects.length > 0) {
      dragStartMousePosition = {
        x: event.clientX,
        y: event.clientY 
      };
      intersectedObject = intersects[0];
      objectStartPosition = {
        x: intersectedObject.object.position.x,
        y: intersectedObject.object.position.y,
        z: intersectedObject.object.position.z
      };
      
      self.dragEnabled = true;
      $(self.webglEl).css('cursor','move');
    }
  });
  
  $(this.webglEl).bind("mouseup" ,function(event) {
    event.preventDefault();
    if (self.disableInteraction) {
      return;
    }      
    
    
    if (intersectedObject) {
      $(intersectedObject.object).trigger("endDrag");
    }   
    
    self.dragEnabled = false;
    intersectedObject = null;
    $(self.webglEl).css('cursor','auto');
   
  });
  
  $(this.webglEl).bind("mousemove", function(event) {  
    event.preventDefault();
    if (self.disableInteraction) {
      return;
    }      
    
    if (intersectedObject !== null) { 
      var mouseX = event.clientX - dragStartMousePosition.x;
      var mouseY = event.clientY - dragStartMousePosition.y;    
         
      if (self.buttonsDown.left) {
        dragStartMousePosition.x = event.clientX;
        dragStartMousePosition.y = event.clientY;
        $(intersectedObject.object).trigger("onDrag", [{
          x: mouseX,
          z: -mouseY
        }]);
      
      }
      else if (self.buttonsDown.right) {
        dragStartMousePosition.x = event.clientX;
        dragStartMousePosition.y = event.clientY;
        $(intersectedObject.object).trigger("onDrag", [{
          y: -mouseY
        }]);
      
      }      
             
    }
    
  });               
}

WebglMouseInteraction.prototype.initResizeableObjects = function() {
  var self = this;
  var oldcursor = $(self.webglEl).css('cursor');
  var resizeStartMousePosition = null;
  var resizeWebglObject = null;
  var scaleOnResizeStart = null;
  
  $(this.webglEl).bind("mousemove", function(event) {
    event.preventDefault();
    
    if (self.disableInteraction) {
      return;
    }      
    
    if (self.resizeEnabled) {
      var mouseX = event.clientX - resizeStartMousePosition.x;
      var mouseY = event.clientY - resizeStartMousePosition.y;      
      var scaleX = scaleOnResizeStart.x+ mouseX/200;
      var scaleZ = scaleOnResizeStart.z- mouseY/200
      var scaleY = 1;
      if (scaleX < 0.05) {
        scaleX = 0.05;
      }
      if (scaleZ < 0.05) {
        scaleZ = 0.05;
      }      
      
      resizeWebglObject.object.geometry.computeBoundingBox();
      var size = {
        width: -resizeWebglObject.object.geometry.boundingBox.min.x +resizeWebglObject.object.geometry.boundingBox.max.x,
        height: -resizeWebglObject.object.geometry.boundingBox.min.y +resizeWebglObject.object.geometry.boundingBox.max.y,
        depth: -resizeWebglObject.object.geometry.boundingBox.min.z +resizeWebglObject.object.geometry.boundingBox.max.z 
      };   
      size.width = Math.round(size.width * scaleX);
      size.height = Math.round(size.height * scaleY);
      size.depth = Math.round(size.depth * scaleZ);         
      
      $(resizeWebglObject.object).trigger("onResize", [size]);      
      
    }
    else {
      var projector = new THREE.Projector();
      var mouse = {};
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;    
      var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
      projector.unprojectVector( vector, self.webgl.camera );
  
      var ray = new THREE.Ray( self.webgl.camera.position, vector.subSelf( self.webgl.camera.position ).normalize() );
  
      var intersects = ray.intersectObjects( self.resizeableObjects );  
      if (intersects.length > 0) {
        intersects[0].object.geometry.computeBoundingBox();
        var size = {
          width: -intersects[0].object.geometry.boundingBox.min.x +intersects[0].object.geometry.boundingBox.max.x,
          height: -intersects[0].object.geometry.boundingBox.min.y +intersects[0].object.geometry.boundingBox.max.y,
          depth: -intersects[0].object.geometry.boundingBox.min.z +intersects[0].object.geometry.boundingBox.max.z 
        };
        size.width *= intersects[0].object.scale.x;
        size.height *= intersects[0].object.scale.y;
        size.depth *= intersects[0].object.scale.z;
        
        var coordX = intersects[0].point.x - intersects[0].object.position.x;
        var coordZ = intersects[0].point.z - intersects[0].object.position.z;
        if (coordX - size.width/2 >= -15 && coordX - size.width/2 <= 0 &&
          size.depth/2 + coordZ >=0 && size.depth/2 + coordZ <= 15) {
  
          if ($(self.webglEl).css('cursor') !== 'ne-resize') {
            oldcursor = $(self.webglEl).css('cursor');
          }
          $(self.webglEl).css('cursor','ne-resize');
          
          self.resizePossible = true;
          resizeWebglObject = intersects[0];
          
        }
        else {
          $(self.webglEl).css('cursor',"auto");          self.resizePossible = false;
        }
      }  
      else {
         $(self.webglEl).css('cursor',"auto");
         self.resizePossible = false;
      } 
    } 
  }); 
  
  $(this.webglEl).bind("mousedown" ,function(event) {
    event.preventDefault();
    if (self.disableInteraction) {
      return;
    }      
    
    if (self.resizePossible) {
      
      resizeStartMousePosition = {
        x: event.clientX,
        y: event.clientY 
      };  
      
      scaleOnResizeStart = {
        x: resizeWebglObject.object.scale.x,
        y: resizeWebglObject.object.scale.y,
        z: resizeWebglObject.object.scale.z,
      }
      
      self.resizeEnabled = true;    
    }
    
  });
  
  $(this.webglEl).bind("mouseup" ,function(event) {
    event.preventDefault();
    if (self.disableInteraction) {
      return;
    }      
    
    if (self.resizeEnabled) {
      self.resizeEnabled = false;
      self.resizePossible = false;
      $(resizeWebglObject.object).trigger("onResizeEnd");   
    }
  });  
   
}