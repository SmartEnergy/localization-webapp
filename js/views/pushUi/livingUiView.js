var LivingUiView = Backbone.View.extend({
    events: {
    },
    initialize: function() {
        _.bindAll(this, "render");

        this.model.bind('change', this.render);
    },
    render: function() {
        this.el = ich.uiLivingTmpl();

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
        
        
        $(".uiLivingDevices").click(function() {
          self.showLivingDev(self);
        })
        
        this.$(".returnToMap").click(function() {
          self.closeUi(self);
        });        
        
        return this;
    },
    showLivingDev: function(self) {


      var view = new DeviceUiView({
        model: new UiDevice({})
      });
            
      view.filterByCategory("Living")
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
