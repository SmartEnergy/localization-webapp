/**
 * File name: model.js
 * Last modified by: tha
 * Created by: Tobias Hartwich (tha@tzi.de)
 * 
 * Datamodels
 */

var Scene = Backbone.Model.extend({
    initialize: function (spec) {
        if (!spec) {
           throw "InvalidConstructArgs";
        }
        this.set({
          htmlId: 'scene_' + this.cid,
          kinects: new KinectCollection(),
          regions: new RegionCollection(),
          regionsPoly: new RegionCollection(),
          users: new UserCollection(),
          commands: new CommandCollection(),
          availableActions: new Array(),
          connected: "disconnected"
        });  
    },
    validate: function (attrs) {
    }

});

var Viewport = Backbone.Model.extend({
    initialize: function (spec) {
    	
        if (!spec || !spec.bgImage || !spec.bgWidthPx || !spec.bgHeightPx || !spec.bgPixelInMM) {
            throw "InvalidConstructArgs";
        }         

        this.set({
            htmlId: 'viewport_' + this.cid
        });            
    },
    validate: function (attrs) {
    },
	pixelInMM: function(px) {
		return px * this.get("bgPixelInMM");
	},
	mmInPixel: function(mm) {
		return mm / this.get("bgPixelInMM");
	}
});

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

var Region = Backbone.Model.extend({
    initialize: function (spec) {
        if (!spec || !spec.name || !spec.posX || !spec.posY || !spec.width || !spec.height) {
        	throw "InvalidConstructArgs";       
        }
   

        this.set({
            htmlId: 'region_' + this.cid
        });

        if (!spec.actions) {
            this.set({
                actions: new ActionCollection()
            });
        } 
        
    },
    validate: function (attrs) {
    },
    toJSON: function() {
    	var m = {
			name: this.get("name"),
			displayName: this.get("displayName"),
      type: "rectangle",
			posX: this.get("posX")/10,
			posY: this.get("posY")/10,
			width: this.get("width")/10,
			height: this.get("height")/10,
			//actions: this.get("actions"),
			htmlId: this.get("htmlId")
    	}; 
    	return m;
    },
    sendRegion: function() {    
      
      this.get("scenemodel").get("serversocket").emit('newRegion', this.toJSON());
    	//this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'regionRectangle', regions: [this]}));
    },
    sendRegionUpdate: function() {  

		  this.get("scenemodel").get("serversocket").emit('updateRegion', this.toJSON());
    	//this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'regionPolygon', regions: [this]}));
    },
    sendRemove: function() {
      this.get("scenemodel").get("serversocket").emit('removeRegion',  this.get("name"));
      
    	//this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'deleteRegion', key: this.get("name")}));
    }
});

var RegionPolygon = Backbone.Model.extend({
    initialize: function (spec) {
        if (!spec || !spec.name) {
        	throw "InvalidConstructArgs";       
        }

        this.set({
            htmlId: 'regionpoly_' + this.cid,
            points: new Array()
        });

        if (!spec.actions) {
            this.set({
                actions: new ActionCollection()
            });
        } 
                      
    },
    toJSON: function() {
    	var m = {
			  name: this.get("name"),
			  displayName: this.get("displayName"),
        type: "polygon",
			  //actions: this.get("actions"),
			  points: this.get("points"),			
			  htmlId: this.get("htmlId")
    	}; 
    	return m;
    },
    validate: function (attrs) {
    },
    sendRegion: function() {  

		  this.get("scenemodel").get("serversocket").emit('newRegion', this.toJSON());
    	//this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'regionPolygon', regions: [this]}));
    },
    sendRegionUpdate: function() {  

		  this.get("scenemodel").get("serversocket").emit('updateRegion', this.toJSON());
    	//this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'regionPolygon', regions: [this]}));
    },
    sendRemove: function() {
      this.get("scenemodel").get("serversocket").emit('removeRegion',  this.get("name"));
    	//this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'deleteRegion', key: this.get("name")}));
    }    

});

var Kinect = Backbone.Model.extend({
    initialize: function (spec) {
        this.set({
            htmlId: 'kinect_' + this.cid,
            kinectId: this.cid
        });
        
        this.set({
        	widthDeviceMM: 300,
        	heightDeviceMM: 100,
        	widthLightMM: 4871.9,
        	heightLightMM: 4950,
        	offsetImgX: (4871.9+300) / 2,
        	offsetImgY: 0 ,
        	offsetBoundingX: 0,
        	offsetBoundingY: 0,
        	angle: 0
        });       
    },
    validate: function (attrs) {
    },
    sendKinect: function() {  
    	var kinjson = {
      id: this.get("name"),
			x: this.get("offsetImgX"),
			y: this.get("offsetImgY"),
			angle: this.get("angle"),
			xb: this.get("offsetBoundingX"),
			yb: this.get("offsetBoundingY"),
    	};     	

      this.get("scenemodel").get("serversocket").emit('updateKinect',  kinjson);
    	
    	//this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'kinect', kinects: [kinjson]}));
    },
    sendRemove: function() {
    	//this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'deleteKinect', key: this.cid}));
    }    
});


var User = Backbone.Model.extend({
    initialize: function (spec) {
        if (!spec || !spec.userid || !spec.posX || !spec.posY) {
            throw "InvalidConstructArgs";
        }

        this.set({
            htmlId: 'user_' + this.cid
        });
    },
    validate: function (attrs) {
    }
});



var ConditionAction = Backbone.Model.extend({
    initialize: function (spec) {
        if (!spec || !spec.name || !spec.displayName || !spec.category || !spec.icon || !spec.options) {
            throw "InvalidConstructArgs";
        }

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

      sceneview.model.get("serversocket").emit('newCommand',  command);    	

    }, 
    sendRemove: function() {      
      sceneview.model.get("serversocket").emit('removeCommand',  this.get("name")); 
    }
});


var UiDevice = Backbone.Model.extend({
    initialize: function (spec) {
        this.set({
            htmlId: 'uiDevice_' + this.cid
        });
    },
    validate: function (attrs) {
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



var ActionCollection = Backbone.Collection.extend({
    model: Action,

    initialize: function () {
    }
});

var KinectCollection = Backbone.Collection.extend({
    model: Kinect,

    initialize: function () {
    },
    
    getKinectByName: function(id) {
      var erg = null;
    	this.each(function(kinect) {
    		if (id == kinect.get("name")) {
          erg = kinect;
    			return; //innere Funktion beenden
    		}    	
    	});    	
    	return erg;
    }
});

var RegionCollection = Backbone.Collection.extend({
    model: Region,

    initialize: function () {
    },
    
    getRegionByName: function(name) {
      var erg = null;
    	this.each(function(region) {
    		if (name == region.get("name")) {
    			erg = region;
          return; // innere funktion beenden
    		}
    			
    	});
    	
    	return erg;
    }
});
var UserCollection = Backbone.Collection.extend({
    model: User,

    initialize: function () {
    },
    getByName: function(n) {
      var erg = null;
    	this.each(function(ca) {
    		if (n == ca.get("userid")) {
    			erg = ca;
                return; // each verlassen
    		}
    			
    	});
    	
    	return erg;      
    }
});
