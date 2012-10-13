
var regionColors = [0xff0000, 0x00ff00, 0x0000ff, 0xcf339d, 0x9233cf, 0x333acf, 0x33b0cf, 0x33cf92, 0x3acf33, 0xcfc633, 0xcf8433 ];
var regionColorsStr = ["ff0000", "00ff00", "0000ff", "cf339d", "9233cf", "333acf", "33b0cf", "33cf92", "3acf33", "cfc633", "cf8433" ];
var regionColorsrgba = ["rgba(255,0,0,0.1)","rgba(0,255,0,0.1)", "rgba(0,0,255,0.1)", "rgba(207,51,157,0.1)", "rgba(146,51,207,0.1)" , "rgba(51,58,207,0.1)", "rgba(51,176,207,0.1)", "rgba(51,207,146,0.1)", "rgba(58,207,51,0.1)", "rgba(207,198,51,0.1)",  "rgba(207,132,51,0.1)" ];

var RectangleRegionView = Backbone.View.extend({
  webglObject: null,
  initialize: function(options) {
    var self = this;

    
    
    this.setElement(ich.rectRegionNavTmpl(this.model.toJSON())); 
    this.navContent = options.navContent;
    $("#regionsNavContentRegions", this.navContent).append(this.el);
    
    this.model.bind("change", $.proxy(this.render, this))
    
    $(window).bind('hideRegions', $.proxy(this.onHideRegions, this));
    $(window).bind('showRegions', $.proxy(this.onShowRegions, this));
    this.drawRegion();
  },  
  
  events: {
    "blur .navRegionName": "onNameChange",
    "keypress .navRegionName": "onNameKeyPress",
    "click .navRegionRemoveBtn": "onRemoveBtnClick"
  },
  
  render: function() {
    
    this.webglObject.geometry.computeBoundingBox();
    var visibleSize = {
      width: -this.webglObject.geometry.boundingBox.min.x +this.webglObject.geometry.boundingBox.max.x,
      height: -this.webglObject.geometry.boundingBox.min.y +this.webglObject.geometry.boundingBox.max.y,
      depth: -this.webglObject.geometry.boundingBox.min.z +this.webglObject.geometry.boundingBox.max.z 
    };  
    
    var targetSize = {
      width: this.model.get("width"),
      height: this.model.get("height"),
      depth: this.model.get("depth"), 
    };  
    
    this.webglObject.scale.x = targetSize.width / visibleSize.width;
    this.webglObject.scale.y = targetSize.height / visibleSize.height;
    this.webglObject.scale.z = targetSize.depth / visibleSize.depth;
    
    
    this.webglObject.position.x = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").x + this.model.get("x") + this.model.get("width")/2;
    this.webglObject.position.y = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").y + this.model.get("y") + this.model.get("height")/2;
    this.webglObject.position.z = app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").z - this.model.get("z") - this.model.get("depth")/2;
    
    this.$(".navRegionPos span").eq(0).text(this.model.get("x"));
    this.$(".navRegionPos span").eq(1).text(this.model.get("z"));
    
    this.$(".navRegionSize span").eq(0).text(this.model.get("width"));
    this.$(".navRegionSize span").eq(1).text(this.model.get("depth"));    
  },

  onShowRegions: function() {
    this.webglObject.visible = true;
  },
  
  onHideRegions: function() {
    this.webglObject.visible = false;
  },  

  drawRegion: function() {
    var coloridx = Math.floor(Math.random()*regionColors.length);
    var geometry  = new THREE.CubeGeometry( this.model.get("width"), this.model.get("height"), this.model.get("depth") );
    var material  = new THREE.MeshBasicMaterial( { color: regionColors[coloridx], wireframe: false, transparent: true, opacity: 0.3 } );
    this.webglObject  = new THREE.Mesh( geometry, material ); 
    
    this.render();
    
    app.sceneview.webgl.scene.add( this.webglObject );   
    app.mouse.draggableObjects.push(this.webglObject);
    app.mouse.resizeableObjects.push(this.webglObject);
    
    $(this.webglObject).bind("onDrag", $.proxy(this.onDragMove, this));
    $(this.webglObject).bind("endDrag", $.proxy(this.onDragEnd, this));   
    
    $(this.webglObject).bind("onResize", $.proxy(this.onResize, this));
    $(this.webglObject).bind("onResizeEnd", $.proxy(this.onResizeEnd, this));
    
    this.$(".regionRectIcon").css("border", "1px solid #"+regionColorsStr[coloridx]);
    this.$(".regionRectIcon").css("background-color", regionColorsrgba[coloridx]);    
    
  },

  onDragMove: function(events, pos) {
    if (pos.x) {
      this.model.set("x", this.model.get("x") + pos.x);
    }
    if (pos.z) {
      this.model.set("z", this.model.get("z") + pos.z);
    }                
  },
  
  onDragEnd: function(event) {
    this.model.send();  
  },

  onResize: function(events, size) {
    this.model.set({
      width: size.width,
      height: size.height,
      depth: size.depth
    });
  },
  
  onResizeEnd: function(event) {
    this.model.send();  
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
    
    var idx1 = app.mouse.draggableObjects.indexOf(this.webglObject);
    var idx2 = app.mouse.resizeableObjects.indexOf(this.webglObject);
    
    app.mouse.draggableObjects.splice(idx1, 1);
    app.mouse.resizeableObjects.splice(idx2, 1);
    
    app.sceneview.webgl.scene.remove(this.webglObject);
    this.remove();
    
  }
});