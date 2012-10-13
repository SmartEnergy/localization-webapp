var Kinect = Backbone.Model.extend({
  initialize: function() { 
    
  },
  
  send: function() {
    var kinectjson = {
      kinects: [{
        id: this.get("id"),
        x: this.get("x"),
        y: this.get("z"),
        z: this.get("y"),
        angle: this.get("angle"), 
      }]
    }
    
    
    $.ajax({
      url:"/kinects/new",
      type:"POST",
      data:JSON.stringify(kinectjson),
      contentType:"application/json; charset=utf-8",
      success: function(result){
        console.log(result); 
      }
    })    
    
        
  }
});

