var regionColors = [0xff0000, 0x00ff00, 0x0000ff, 0xcf339d, 0x9233cf, 0x333acf, 0x33b0cf, 0x33cf92, 0x3acf33, 0xcfc633, 0xcf8433 ];

var PolygonRegionView = Backbone.View.extend({
  webglObject: null,
  initialize: function(options) {
    var self = this;

    this.drawPolygon();

    this.setElement(ich.polyRegionNavTmpl(this.model.toJSON())); 
    this.navContent = options.navContent;
    $("#regionsNavContentRegions", this.navContent).append(this.el);
    
    this.model.bind("change", $.proxy(this.render, this))
    
    $(window).bind('hideRegions', $.proxy(this.onHideRegions, this));
    $(window).bind('showRegions', $.proxy(this.onShowRegions, this));    
    
  },  
  
  events: {
    "blur .navRegionName": "onNameChange",
    "keypress .navRegionName": "onNameKeyPress",
    "click .navRegionRemoveBtn": "onRemoveBtnClick"
  },
  
  render: function() {
    
  },

  onShowRegions: function() {
    this.webglObject.visible = true;
  },
  
  onHideRegions: function() {
    this.webglObject.visible = false;
  },  

  drawPolygon: function() {
    var ver = []
    for (var i in this.model.get("vertices")) {
      var x = this.model.get("vertices")[i].x + app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").x;
      var y = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").z - this.model.get("vertices")[i].z;
      var v = new THREE.Vector2( x,  y );
      ver.push(v);
    }
    
    var californiaShape = new THREE.Shape( ver );
    var california3d = new THREE.ExtrudeGeometry( californiaShape, { amount: 200 } );
    
    for (var i in california3d.vertices) {
      i = parseInt(i);
      var p = california3d.vertices[i];
      var ztmp = p.z + 20;
      p.z = p.y;
      p.y = ztmp;
    }  
    
    var m  = new THREE.MeshBasicMaterial( { color: regionColors[Math.floor(Math.random()*regionColors.length)], wireframe: false, transparent: true, opacity: 0.3 } );
    this.webglObject  = new THREE.Mesh( california3d, m );         
    app.sceneview.webgl.scene.add(this.webglObject);     
  },
 
  onNameChange: function(event) {
    this.model.set({
      displayName: this.$(".navRegionName").val()
    });
    this.model.send(); 
  },
  
  onNameKeyPress: function(event) {
    if(event.keyCode == 13){
      this.onNameChange(null);
    }    
  },
  
  onRemoveBtnClick: function() {
    this.model.sendRemove()
    this.removeRegion();
  },
  
  removeRegion: function() {

    app.sceneview.webgl.scene.remove(this.webglObject);
    this.remove();
    
  }
});