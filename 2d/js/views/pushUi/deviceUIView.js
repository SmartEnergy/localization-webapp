var DeviceUiView = Backbone.View.extend({
    events: {
    },
    initialize: function() {
        _.bindAll(this, "render");

        
        this.model.set({
          actions: getConditionsAndActions(),
          name: "Devices"
        });     
        this.model.bind('change', this.render);
        
        this.initialFilter();  
    },
    render: function() {
        this.el = ich.uiDevicesTmpl(this.model.toJSON());

        return this;
    },
    firstRender: function() {
        var self = this;
        this.render();
        
        this.model.get("actions").each(function(action) {
          
            var view = new ConditionActionView({
                      model: action
            });    
            
            view.firstRender();  
            $(view.el).addClass("actionEntryUiDevice");
            

            view.$(".actionEntryConfigTxt").css("display", "block");    
                 
            $(view.el).unbind("dblclick");
            $(self.el).append(view.el);          
                      
        });   
        
        $("body").append(this.el);
        $(this.el).show();
        $(this.el).css("left", $("body")[0].offsetWidth);
        $(this.el).animate({
            left: '0'
          }, 500, function() {
        });                
        
        this.$(".returnToMap").click(function() {
          self.closeUi(self);
        });
        
        return this;
    },
    
    initialFilter: function() {
      var self = this;
      var deleteitems = [];
      this.model.get("actions").each(function(item,  nr) {
        if (item.get("type") != "action") {
          deleteitems.push(item);
        }
        
      });
      $.each(deleteitems, function(index, item) {
        self.model.get("actions").remove(item);
      })
    },
    filterByCategory: function(cat) {
      var self = this;
      var deleteitems = [];
      this.model.get("actions").each(function(item) {
        
        if (item.get("subCategory") != cat) {
          deleteitems.push(item);
        }
        
      }); 
      
      $.each(deleteitems, function(index, item) {
        self.model.get("actions").remove(item);
      })      
      
      self.model.set({
        name: "Devices (Filter: "+cat+")"
      });     
    },
    filterContainsName: function(n) {
      var self = this;
      var deleteitems = [];
      this.model.get("actions").each(function(item) {
        
        if (!item.get("name").match(n, 'i') && !item.get("displayName").match(n, 'i')   ) {
          deleteitems.push(item);
        }
        
      }); 
      
      $.each(deleteitems, function(index, item) {
        self.model.get("actions").remove(item);
      })      
      
      self.model.set({
        name: "Devices (Filter: "+n+")"
      });     
    },    
    closeUi: function(self) {
        $(self.el).animate({
            left: $("body")[0].offsetWidth
          }, 500, function() {
            $(self.el).remove(); 
        }); 
               
    }
    
    
});
