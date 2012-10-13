var PolygonRegionCollection = Backbone.Collection.extend({
  model: RectangleRegion,
  initialize: function() {
    app.socket.on('newRegion', $.proxy(this.onNewRegion, this));
    app.socket.on('updateRegion', $.proxy(this.onChangeRegion, this));    
    app.socket.on('removedRegion', $.proxy(this.onRemoveRegion, this));     
  },
  fetchRegions: function() {
    var self = this;
    $.getJSON('/regions', function(data) {
      $.each(data.regions, function(idx, region) {
        if (region.type === "polygon") {
          self.onNewRegion(region);
        }
        
      });
    });    
  },
  
  onNewRegion: function(regionJson) {
    console.log("on new Region");
    if (regionJson.type === "polygon") {
      
      var region = new PolygonRegion({
        id: regionJson.name,
        displayName: regionJson.displayName,
      });
      
      region.set({
        vertices: region.verticesServerToClient(regionJson.points) 
      })
      
      this.add(region);
    }
  },
  
  onChangeRegion: function(region) {
    if (region.type === "polygon") {        
      var model = this.get(region.name);
      if (model) {
        model.set({
          displayName: region.displayName,
          vertices: region.verticesServerToClient(regionJson.points) 
        })
      }
    }
  },
  onRemoveRegion: function(regionid) {
    var model = this.get(regionid);
    if (model) {
      this.remove(model);
    }
  }
});