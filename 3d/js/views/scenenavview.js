var SceneNavigationView = Backbone.View.extend({
  initialize: function() {
    var self = this;
    
    this.navView = new NavigationElementView({
      name: "Scene",
      size: {
        width: 300,
        height: 250
      }
    });   

    this.setElement(ich.sceneNavContentTmpl(this.model.toJSON())); 
    $(this.navView.elNavContent).html(this.el);
    
    this.$("#sceneNavAngle").switchButton({
      onClick: $.proxy(this.onAngleChange, this)
    });
    
    this.$("#sceneNavZoom").switchButton({
      onClick: $.proxy(this.onZoomChange, this)
    });   
    
    this.$("#sceneNavWalls").switchButton({
      onClick: $.proxy(this.onWallChange, this)
    });

    $(window).unload($.proxy(this.saveConfigInCookie, this));
    

    $("body").bind("onCameraChange",$.proxy(this.onCameraChange, this));  
    
    this.onCameraChange(undefined, {
      x: app.sceneview.webgl.camera.position.x,
      y: app.sceneview.webgl.camera.position.y,
      z: app.sceneview.webgl.camera.position.z
    });
    
    if ($.cookie('se_scene_cam') !== null) {
      var cam = JSON.parse($.cookie('se_scene_cam'));
      if (cam.position.y < 100) {
        cam.position.y = 2000;
      }
      app.sceneview.webgl.changeCamera(cam.position);   
      app.sceneview.webgl.camera.lookAt(app.sceneview.webgl.scene.position);
      this.onWallChange(cam.walls);
      this.$("#sceneNavWalls .navConnectedButtonsAButton[title=\""+cam.walls+"\"]").click();
    } 
    
    this.saveConfigInCookie();
  },  
  
  events: {
    "change #navFormCameraXSlider,#navFormCameraYSlider,#navFormCameraZSlider": "cameraChange"
  },
  
  render: function() {
    
  },
  
  onAngleChange: function(value) {
    if (value === "focusorigin") {
      //self.webgl.camera.lookAt(self.webgl.scene.position);
      app.sceneview.webgl.camera.lookAt(app.sceneview.webgl.scene.position);
    }
    else if (value === "top") {
      app.sceneview.webgl.cameraTopView();
    }
    else if(value === "45") {
      app.sceneview.webgl.camera45DegreeView();      
    }
  },
  onCameraChange: function(event, cameraPos) {
    $("#navFormCameraXSlider").val(cameraPos.x);
    $("#navFormCameraYSlider").val(cameraPos.y);
    $("#navFormCameraZSlider").val(cameraPos.z);
  },
  cameraChange: function(e) {
    app.sceneview.webgl.changeCamera({
      x: this.$("#navFormCameraXSlider").val(),
      y: this.$("#navFormCameraYSlider").val(),
      z: this.$("#navFormCameraZSlider").val()
    });
  },
  onZoomChange: function(value) {
    if (value === "zoomin") {
      app.sceneview.webgl.zoomIn();
    }
    else {
      app.sceneview.webgl.zoomOut();
    }
  },
  onWallChange: function(value) {
    if (value === "on") {
      app.sceneview.webgl.showWalls();
    }
    else {
      app.sceneview.webgl.hideWalls();
    }
  },
  saveConfigInCookie: function() {
    var cam = {
      position: {
        x: parseFloat(this.$("#navFormCameraXSlider").val()),
        y: parseFloat(this.$("#navFormCameraYSlider").val()),
        z: parseFloat(this.$("#navFormCameraZSlider").val())
      },
      walls: this.$(".navConnectedButtonsAButtonActive", "#sceneNavWalls").attr("title"),
      performance: this.$('#navFormPerformanceSlider').val()
    };
    
    $.cookie('se_scene_cam', JSON.stringify(cam), { expires: 365 });    
  }
  
  
});


