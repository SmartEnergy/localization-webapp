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
    

        
  },
  sendAsNewRegion: function() {
    app.socket.emit('newRegion', this.toServerModel());   
  },
  
  sendRemove: function() {
    app.socket.emit('removeRegion',  this.get("id"));  
  }
});

