var Action = Backbone.Model.extend({
    initialize: function (spec) {
        this.set({
            htmlId: 'action_' + this.cid
        });
    },
    validate: function (attrs) {
    },
    toJSON: function() {
      var m = {
        event: this.get("event"),
        action: this.get("action"),
        htmlId: this.get("htmlId")
      }; 
      return m;
    }
});
var ConditionAction = Backbone.Model.extend({
    initialize: function (spec) {
        this.set({
          selected: false
        });
    },
    validate: function (attrs) {
    }        
});
var Command = Backbone.Model.extend({
    initialize: function (spec) {
        if (!spec) {
            throw "InvalidConstructArgs";
        }
    },
    validate: function (attrs) {
    },
    sendCommand: function() {  
      var command = {
        name: this.get("name"),
        conditions: [],
        actions: []
      } 

      this.get("conditions").each(function(c) {
          newc = {
            name: c.get("name"),
            type: c.get("type"),
            category: c.get("category"),
            values: []           
          };
          
          $.each(c.get("options"), function(index, option) {
            newc.values.push(option.value);
          });
          
          command.conditions.push(newc);

      }); 

      this.get("actions").each(function(c) {
          newc = {
            name: c.get("name"),
            type: c.get("type"),
            category: c.get("category"),
            values: []           
          };
          
          $.each(c.get("options"), function(index, option) {
            newc.values.push(option.value);
          });
          
          command.actions.push(newc)  
      
      });     

      console.log("Command");
      console.log(command);
      app.socket.emit('newCommand',  command);     


    }, 
    sendRemove: function() {      
      app.socket.emit('removeCommand',  this.get("name")); 
    }
});



var ConditionActionCollection = Backbone.Collection.extend({
    model: ConditionAction,

    initialize: function () {
    },
    isInCollection: function(n) {
      var erg = false;
      this.each(function(ca) {
        if (n == ca.get("name")) {
          erg = true;
          return; // innere funktion beenden
        }
          
      });
      
      return erg;      
    },
    getByName: function(n) {
      var erg = null;
      this.each(function(ca) {
        if (n == ca.get("name")) {
          erg = ca;
          return; // innere funktion beenden
        }
          
      });
      
      return erg;      
    }
});

var CommandCollection = Backbone.Collection.extend({
    model: Command,

    initialize: function () {
      app.socket.on('newCommand', $.proxy(this.onNewCommand, this));
      //app.socket.on('updateRegion', $.proxy(this.onChangeRegion, this));    
      app.socket.on('removedCommand', $.proxy(this.onRemoveCommand, this));          
      
    },
    getByName: function(n) {
      var erg = null;
      this.each(function(ca) {
        if (n == ca.get("name")) {
          erg = ca;
          return; // innere funktion beenden
        }
          
      });
      
      return erg;      
    },
  fetchCommands: function() {
    var self = this;
    $.getJSON('/commands', function(data) {
      $.each(data.commands, function(idx, command) {
        self.onNewCommand(command);
      });
    });    
  },
  
  onNewCommand: function(commandJson) {
    console.log("on new Command");
    console.log(commandJson);
    var command = new Command({
      id: commandJson.name,
      name: commandJson.name,
      conditions: commandJson.conditions,
      actions: commandJson.actions
    });
    this.add(command);
  },
  
  onRemoveCommand: function(regionid) {
    var model = this.get(regionid);
    if (model) {
      this.remove(model);
    }
  }
});



var ActionCollection = Backbone.Collection.extend({
    model: Action,

    initialize: function () {
    }
});