var RectangleRegionCollection = Backbone.Collection.extend({
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
        if (region.type === "rectangle") {        
          self.onNewRegion(region);
        }
      });
    });    
  },
  
  onNewRegion: function(regionJson) {
    if (regionJson.type === "rectangle") {    
      var region = new RectangleRegion({
        id: regionJson.name,
        displayName: regionJson.displayName,
        x: regionJson.posX,
        y: 0,
        z: regionJson.posY,
        width: regionJson.width,
        depth: regionJson.height,
        height: 200
      });
      this.add(region);
    }
  },
  
  onChangeRegion: function(region) {
    if (region.type === "rectangle") {    
      var model = this.get(region.name);
      if (model) {
        model.set({
          displayName: region.displayName,
          x: region.posX,
          z: region.posY,
          width: region.width,
          depth: region.height,
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