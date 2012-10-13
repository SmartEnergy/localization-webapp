var PolygonRegion = Backbone.Model.extend({
  initialize: function() { 
    
  },
  
  toServerModel: function() {
    
    // Vertices für Server aufbereiten
    var vertices = this.verticesClientToServer(this.get("vertices"));
    
    var regionjson = {
      name: this.get("id"),
      displayName: this.get("displayName"),
      points: vertices,
      type: "polygon"
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
  },
  
  verticesServerToClient: function(serverver) {
    var clientver = [];
    for (var i in serverver) {
      var v = serverver[i];
      var clientv = {
        x: v.x,
        y: 0,
        z: v.y
      };
      clientver.push(clientv); 
    }
    return clientver;    
  },

  verticesClientToServer: function(clientver) {
    var serverver = [];
    for (var i in clientver) {
      var v = clientver[i];
      var serverv = {
        x: v.x,
        y: v.z
      };
      serverver.push(serverv); 
    }
    return serverver;
  },  
});

