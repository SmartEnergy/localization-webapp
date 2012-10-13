var Choice2D3DDialog = Backbone.View.extend({
  initialize: function() {
    var self = this;
    


    this.setElement(ich.choice2d3dDialogTmpl()); 
    $("body").append(this.el);
    this.$(".dialog").offset({
      left: window.innerWidth/2 - this.$(".dialog").width()/2,
      top: window.innerHeight/2 - this.$(".dialog").height()/2
    });
    $(this.el).height(window.innerHeight);
    $(this.el).show();
  },  
  
  events: {
    "click #choice2d3dLnk2D": "on2DSelect",
    "click #choice2d3dLnk3D": "on3DSelect"
  },
  
  render: function() {
    
  },
  on2DSelect: function(e) {

  },
  on3DSelect: function(e) {
    e.preventDefault();
    app.speed = 0.1;
    app.map = "low";
    app.shadow = false;
    
    this.remove();
    startScene();
  }
  
});


