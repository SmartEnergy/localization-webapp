var KinectView = Backbone.View.extend({
  webglObjectRay: null,
  webglObjectDevice: null,
  initialize: function(options) {
    var self = this;

    this.drawKinect();
    
    this.setElement(ich.kinectDeviceNavTmpl(this.model.toJSON())); 
    this.navContent = options.navContent;
    $(this.navContent).append(this.el);
    
    this.model.bind("change", $.proxy(this.render, this))
  },  
  
  events: {
    "change .kinectNavAngleSlider": "onAngleChange",
    "mouseup .kinectNavAngleSlider": "onAngleChangeComplete"
  },
  
  render: function() {
    if (this.webglobject !== null) {

      this.webglObjectRay.rotation.set(
        240 * 2 *Math.PI/360,
        0,
        this.model.get("angle") * 2 *Math.PI/360
      )
      
      this.webglObjectDevice.rotation.set(
        240 * 2 *Math.PI/360,
        0,
        this.model.get("angle") * 2 *Math.PI/360
      )      

      this.webglObjectRay.position.x = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").x + this.model.get("x");
      this.webglObjectRay.position.y = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").y + this.model.get("y");
      this.webglObjectRay.position.z = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").z - this.model.get("z");
    
      this.webglObjectDevice.position.x = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").x + this.model.get("x");
      this.webglObjectDevice.position.y = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").y + this.model.get("y");
      this.webglObjectDevice.position.z = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").z - this.model.get("z");
      
      this.$(".navKinectPosition span").eq(0).text(this.model.get("x"));
      this.$(".navKinectPosition span").eq(1).text(this.model.get("y"));
      this.$(".navKinectPosition span").eq(2).text(this.model.get("z"));
    }
    
    this.$(".kinectNavAngleSlider").val(this.model.get("angle"));
    this.$(".kinectNavAngleSpan").text(this.model.get("angle"));
  },
  
  drawKinect: function() {
    var dummy = new THREE.Object3D();
    app.sceneview.webgl.scene.add( dummy );
    var segments = parseInt(32 * app.speed);
    if (segments < 6) {
      segments = 6;
    }

    var geometry  = new THREE.CylinderGeometry( 270, 0, 465, segments,segments );;
    var material  = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, transparent: false, opacity: 0.3 } );
    var mesh  = new THREE.Mesh( geometry, material );
    mesh.position.x = 0;
    mesh.position.y = 240;
    mesh.position.z = 0;
    dummy.add( mesh );
    
    this.webglObjectRay = dummy;
    
    var geometry  = new THREE.CubeGeometry( 40, 7, 7 );;
    var m  = new THREE.MeshLambertMaterial( { color: 0x000000 } );
    var device  = new THREE.Mesh( geometry, m ); 
    this.webglObjectDevice = device;   
    app.sceneview.webgl.scene.add( this.webglObjectDevice );  
    this.render();
    
    app.mouse.draggableObjects.push(device);
    
    $(this.webglObjectDevice).bind("onDrag", $.proxy(this.onDragMove, this));
    $(this.webglObjectDevice).bind("endDrag", $.proxy(this.onDragEnd, this));        
  },
  
  onDragMove: function(events, pos) {
    if (pos.x) {
      this.model.set("x", this.model.get("x") + pos.x);
    }
    if (pos.y) {
      this.model.set("y",this.model.get("y") + pos.y);
    }
    if (pos.z) {
      this.model.set("z", this.model.get("z") + pos.z);
    }                
  },
  
  onDragEnd: function(event) {
    this.model.send();  
  },
  
  onAngleChange: function() {
    this.model.set({
      angle: this.$(".kinectNavAngleSlider").val()
    })
  },
  
  onAngleChangeComplete: function() {
    this.model.send();
  },
  
  removeKinect: function() {
    app.sceneview.webgl.scene.remove(this.webglobject);
    this.remove();
    //TODO aus liste draggable objects rausnehmen
  }
});