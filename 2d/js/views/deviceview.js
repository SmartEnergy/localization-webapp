var DeviceView = Backbone.View.extend({
    events: {
    },
    initialize: function() {
        //_.bindAll(this, "render");

        this.model.bind('change', this.sendAction);
    },
    render: function() {

        $(this.el).css("left", sceneview.model.get("vp").mmInPixel(this.model.get("roomPosition").x));
        $(this.el).css("top", $("#karte")[0].offsetHeight -34  - sceneview.model.get("vp").mmInPixel(this.model.get("roomPosition").y));        

        return this;
    },
    firstRender: function() {
        var self = this;
        
        this.el = ich.deviceTmpl(this.model.toJSON());
        this.render();
        $("#mapDevices").append(this.el);
        $(this.el).css("left", sceneview.model.get("vp").mmInPixel(this.model.get("roomPosition").x));
        $(this.el).css("top", $("#karte")[0].offsetHeight -34 - sceneview.model.get("vp").mmInPixel(this.model.get("roomPosition").y));
    
    
        
        this.$(".deviceImg").hover(function() {
            self.$(".deviceImg").css("opacity", "1.0");
            self.$(".deviceImg").css("width", "33px");
        }, function() {
            self.$(".deviceImg").css("opacity", "0.4");
            self.$(".deviceImg").css("width", "30px");
        });

        this.$(".deviceImg").click(function() {
          
          self.$(".deviceImg").animate({
            width: '64px'
          }, 
          350, 
          function() {
            // Animation complete.
            var view = new ConditionActionView({
                      model: self.model
                });    
            
            view.firstRender();   
            $(view.el).removeClass("actionEntry");
            $(view.el).addClass("mapActionEntry");
            $(view.el).css("left", sceneview.model.get("vp").mmInPixel(self.model.get("roomPosition").x));
            $(view.el).css("top", $("#karte")[0].offsetHeight -34  -sceneview.model.get("vp").mmInPixel(self.model.get("roomPosition").y));
            $("#mapDevices").append(view.el);   
                     
            self.$(".deviceImg").hide();
            $(view.el).dblclick();
            $(view.el).unbind("dblclick");
            $("img", view.el).click(function() {
              
              self.$(".deviceImg").show();
              $(view.el).hide();
              
              self.$(".deviceImg").css("width", "64px")
              self.$(".deviceImg").css("opacity", "1.0")
              self.$(".deviceImg").animate({
                  width: '30px',
                  opacity: '0.4'
                }, 
                350, 
                function() { }
              );            
              
            });
          });          
          

        });
        
        this.$(".deviceImg").bind("windowResize", function() {
          self.render();
        });


        
        return this;
    },
    sendAction: function() {
      var c = this;
      newc = {
            name: c.get("name"),
            type: c.get("type"),
            category: c.get("category"),
            values: []           
          };
          
          $.each(c.get("options"), function(index, option) {
            newc.values.push(option.value);
          });
      
      sceneview.model.get("serversocket").emit('execAction',  newc); 
    }
});
