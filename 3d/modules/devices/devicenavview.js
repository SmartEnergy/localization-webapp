
var DeviceNavView = Backbone.View.extend({
  webglObject: null,
  mapObject: null,
  initialize: function(options) {
    var self = this;
    
    this.mapObject = options.mapObject;
    this.setElement(ich.deviceNavTmpl(this.mapObject)); 
    this.el2 = ich.deviceNavTmpl(this.mapObject);
    this.navContent = options.navContent;
    $(".cat" +this.mapObject.category,this.navContent).append(this.el);
    for (var i in this.mapObject.action.options) {

      var option = this.mapObject.action.options[i];
      var e = null;
      var e2 = null;
      if (option.type === "switch") {
        e = this.addSwitchOption(option);
        e2 = this.addSwitchOption(option);
      }
      else if(option.type === "slider") {
        e = this.addSliderOption(option);
        e2 = this.addSliderOption(option);
      }
      
      if (e !== null) {
        this.$(".deviceNavOptions").append(e);
        $(".deviceNavOptions", this.el2).append(e2);
      }
    }
    
    $(this.el2).addClass("mapDevice");
    $("#mapDevices").append(this.el2);
    
    $(this.mapObject).bind("objectClick", $.proxy(this.onMapObjectClick, this));
    
    $(".deviceNavIcon", this.el2).click($.proxy(this.hideMapDevice, this));
    
  },  
  onMapObjectClick: function(a, event, intersectedObject) {
    var self = this;
    $(this.el2).css("top", event.clientY);
    $(this.el2).css("left", event.clientX);
    
    if ($(this.el2).not(':visible')) {
      $(this.el2).show();
      
      var hideTimeOut;
      $(this.el2).bind("hideObj", function() {
        if (hideTimeOut) {
          clearTimeout(hideTimeOut);
        }
      });
      hideTimeOut = setTimeout(function() {
        $(self.el2).fadeOut(500, function() {
          self.hideMapDevice();
        });
      },3500);
    }
  },
  
  showMapDevice: function() {
    
  },
  hideMapDevice: function() {
    $(this.el2).hide();
    $(this.el2).trigger("hideObj");
  },
  
  events: {

  },
  
  
  
  render: function() {
    
  
  },
  addSwitchOption: function(option) {
    var self = this;
    var el = ich.deviceNavOptionSwitchTmpl(option);
    for (var k in option.values) {
      var v = ich.deviceNavOptionSwitchElementTmpl({
        value: option.values[k]
      });
      
      if (option.values[k] === option.value) {
        $(v).addClass("navConnectedButtonsAButtonActive");
      }
      $(".switchButtons", el).append(v)
    }
    
    $(".navConnectedButtons", el).switchButton({
      onClick: function(value) {
        var oldvalue = option.value;
        option.value = value;
        option.onChange(self.mapObject, oldvalue, value);
        self.hideMapDevice();
        self.execAction();  
      }
    }); 
      
    
    return el;
  },
  addSliderOption: function(option) {
    var self = this;
    var el = ich.deviceNavOptionSliderTmpl({name: option.name, min: option.values[0], max: option.values[1], value: option.value });
    $(el).change(function() {
      var oldvalue = option.value;
      option.value = parseInt($(".deviceNavOptionRangeSlider", this).val());
      
      option.onChange(self.mapObject, oldvalue, option.value);  
      self.execAction();    
    });

    return el;
  },
  execAction: function() {
  	var vals = [];
  	for (var i=0; i<this.mapObject.action.options.length; i++) {
  		vals.push(this.mapObject.action.options[i].value);
  	}
  	
  	var dev = {
  		name: this.mapObject.action.actionName, 
  		id: this.mapObject.action.actionId,
  		category: this.mapObject.action.category,
  		values: vals
  	}
  	
  	app.socket.emit("execAction", dev);
  },
  
  changeViewOption: function(idx, value) {
      var option = this.mapObject.action.options[idx];
      if (option.type === "switch") {  
         
         this.$(".navConnectedButtonsAButton").removeClass("navConnectedButtonsAButtonActive");
         this.$(".navConnectedButtonsAButton").each(function(idx, btn) {
           if ($(this).text() === value) {
             $(this).addClass("navConnectedButtonsAButtonActive");
           }
         });
         
         
         $(".navConnectedButtonsAButton", this.el2).removeClass("navConnectedButtonsAButtonActive");
         $(".navConnectedButtonsAButton", this.el2).each(function(idx, btn) {
           if ($(this).text() === value) {
             $(this).addClass("navConnectedButtonsAButtonActive");
           }
         });         
         
      }  
      else {
        value = parseInt(value);
        if (value) {
          this.$(".deviceNavOptionRangeSlider").val(value);
          $(".deviceNavOptionRangeSlider", this.el2).val(value);
        }
      }
  }
    
});