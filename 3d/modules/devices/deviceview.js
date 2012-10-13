var DeviceView = Backbone.View.extend({

  initialize: function() {
    var self = this;
    this.deviceViews = {};
    this.navView = new NavigationElementView({
      name: "Devices",
      size: {
        width: 320,
        height: 400
      }
    });
    
    this.setElement(ich.devicesNavContentTmpl()); 
    $(this.navView.elNavContent).html(this.el);       
    
    for (var i in mapObjects) {
      var obj = mapObjects[i];
      if (obj.action) {
        var dnv = new DeviceNavView({
          mapObject: obj,
          navContent: this.el
        })
        self.deviceViews[obj.action.actionId] = dnv;
      }
    }
    
    app.socket.on("updateDevice", function(id, value) {
      self.updateDevice(id, value);
    });
    
    
    $.getJSON('/actions', function(data) {
      for (var i in data) {
        var dev = data[i];
        self.updateDevice(dev.id, dev.value)
      }
    });    
    
      
  },  
  
  updateDevice: function(id, value) {
    var self = this;
    
    for (var i in mapObjects) {
      var obj = mapObjects[i];
      if (obj.action && obj.action.actionId === id) {
        var oldvalue = obj.action.options[0].value;
        obj.action.options[0].value = value;
        obj.action.options[0].onChange(obj, oldvalue, value);
        
        self.deviceViews[id].changeViewOption(0, value);
        
      }
            
    }
    
    console.log("id")
    console.log(id)
    console.log("value")
    console.log(value)    
  },
  
  events: {
 
  },

});

