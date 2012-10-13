var RectangleRegion = Backbone.Model.extend({
  initialize: function() { 
    
  },
  
  toServerModel: function() {
    var regionjson = {
      name: this.get("id"),
      displayName: this.get("displayName"),
      posX: this.get("x"),
      posY: this.get("z"),
      width: this.get("width"),
      height: this.get("depth"),
      type: "rectangle"
    };
    
    return regionjson;   
  },
  
  send: function() {
    app.socket.emit('updateRegion', this.toServerModel());    
    
    // TODO wieder rein, wenn Regionen auch per POST gesendet werden können
   /*$.ajax({
      url:"/regions/new",
      type:"POST",
      data:JSON.stringify(regionjson),
      contentType:"application/json; charset=utf-8",
      success: function(result){
        console.log(result); 
      }
    })*/ 
        
  },
  sendAsNewRegion: function() {
    app.socket.emit('newRegion', this.toServerModel());   
  },
  
  sendRemove: function() {
    app.socket.emit('removeRegion',  this.get("id"));  
  }
});

