var GestureDialogView = Backbone.View.extend({
    events: {
    },
    initialize: function() {
        //_.bindAll(this, "render");


    },
    render: function() {


        return this;
    },
    firstRender: function(configEl) {
        var self = this;
        
        this.el = ich.gestureDialogTmpl();
        

        var conds = getConditionsAndActions();
        gestures = []
        conds.each(function(cond) {
          if (cond.get("category") == "Gestures" && cond.get("name") != "Combi") {
            gestures.push(cond);
          }
        });
        
        $.each(gestures, function(index, gesture) {
          gestureEl = ich.gestureDialogGestureTmpl(gesture.toJSON());
          $(gestureEl).click(function(e) {
            var cloned = $(this).clone();
            self.$(".gestureDialogRowSelectedValues").append(cloned);
            
            $(cloned).click(function() {
              $(this).remove();
            });            
            
          });
          self.$(".gestureDialogRowAvailableValues").prepend(gestureEl);
        });
        
        $(this.el).dialog({
            width: "600px",
            resizable: false, 
            draggable: false,
            close: function(event, ui) {
              $(this.el).remove();
            }
        });
        
        this.$(".gestureDialogRowButtonBtn").click(function() {
          var gestureStr = "";
          var vs = $(".gestureDialogGesture",self.$(".gestureDialogRowSelectedValues"));
          vs.each(function(idx, value) {
            gestureStr += $(".gestureDialogGestureTitel", value).text();
            if (idx != vs.length-1) {
              gestureStr += ", "
            }
          });
          self.model.get("options")[0].value = gestureStr;
          $(configEl).find(".gestureCombiValues").html(gestureStr);
          $(self.el).dialog("close");
        });  
        
        
        var oldValues = this.model.get("options")[0].value;
        if (oldValues != "") {
          var valuesSplitted = oldValues.split(", ");
          for (i in valuesSplitted) {
            var value = valuesSplitted[i];
            self.$(".gestureDialogGesture"+value).click(); 
          }
        }
              
                
        
        return this;
    }
});
