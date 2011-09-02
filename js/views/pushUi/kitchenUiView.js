var KitchenUiView = Backbone.View.extend({
    events: {
    },
    initialize: function() {
        _.bindAll(this, "render");

        //this.model.bind('change', this.render);
    },
    render: function() {
        this.el = ich.uiKitchenTmpl();

        return this;
    },
    firstRender: function() {
        var self = this;
        this.render();        
        $("body").append(this.el);
        $(this.el).show();
        $(this.el).css("left", $("body")[0].offsetWidth);
        $(this.el).animate({
            left: '0'
          }, 500, function() {
        });        
        
        $(".uiKitchenDevices").click(function() {
          self.showKitchenDev(self);
        })
        
        this.$(".returnToMap").click(function() {
          self.closeUi(self);
        });        
                
        
        return this;
    },
    showKitchenDev: function(self) {


      var view = new DeviceUiView({
        model: new UiDevice({})
      });
            
      view.filterByCategory("Kitchen")
      view.firstRender();
      
      return this;
    },
    closeUi: function(self) {
        $(self.el).animate({
            left: $("body")[0].offsetWidth
          }, 500, function() {
            $(self.el).remove();  
        }); 
               
    } 
});
