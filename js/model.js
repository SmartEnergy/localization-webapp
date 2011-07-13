/**
 * File name: $HeadURL$
 * Revision: $Revison$
 * Last modified: $Date$
 * Last modified by: $Author$
 * Created by: Tobias Hartwich (tha@tzi.de)
 * 
 * Datamodels
 */

var Scene = Backbone.Model.extend({
    initialize: function (spec) {
        if (!spec || !spec.serverIp || !spec.port) {
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
      type: "rectangle",
			posX: this.get("posX"),
			posY: this.get("posY"),
			width: this.get("width"),
			height: this.get("height"),
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
      sceneview.model.get("serversocket").emit('newCommand',  command);    	

    	//this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'kinect', kinects: [kinjson]}));
    }, 
    sendRemove: function() {      
      sceneview.model.get("serversocket").emit('removeCommand',  this.get("name")); 
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
    }
});

function getConditionsAndActions() {
    var conditionModels = new ConditionActionCollection();

		conditionModels.add(  
      new ConditionAction({
        name: "enterRegion",
        type: "condition",
        displayName: "User entered a region",
        category: "Regions",
        icon: "img/actionicons/userenter_icon.png",
        options: [ 
                   {
                      name: "region",
                      type: "checkbox",                            
                      getValuesFrom: "regionNames",
                      value: ""  
                   }
                 ]     
    }));

    conditionModels.add( 

		  new ConditionAction({
        name: "leaveRegion",
        type: "condition",
        displayName: "User leaved a region",
        category: "Regions",
        icon: "img/actionicons/userout_icon.png",
        options: [ 
                   {
                      name: "region",
                      type: "checkbox",                            
                      getValuesFrom: "regionNames",
                      value: ""   
                   }
                 ]        
    }));

    conditionModels.add( 

		  new ConditionAction({
        name: "userinRegion",
        type: "condition",
        displayName: "User moved in a region",
        category: "Regions",
        icon: "img/actionicons/userin_icon.png",
        options: [ 
                   {
                      name: "region",
                      type: "checkbox",                            
                      getValuesFrom: "regionNames",
                      value: ""   
                   }
                 ]        
    }));

    conditionModels.add( 

		  new ConditionAction({
        name: "userIdent",
        type: "condition",
        displayName: "User Identification",
        category: "Other",
        icon: "img/actionicons/user_identification.png",
        options: [ 
                   {
                      name: "Name",
                      type: "checkbox",                            
                      values: ["Andree", "Tobi", "Jelle"],
                      value: "Andree"   
                   }
                 ]      
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "userDirection",
        type: "condition",
        displayName: "Users viewing direction",
        category: "Other",
        icon: "img/actionicons/user_direction_icon.png",
        options: [ 
                   {
                      name: "From",
                      type: "slider",
                      values: [0,360,5],
                      value: 0
                   },
                   {
                      name: "To",
                      type: "slider",
                      values: [0,360,5],
                      value: 0 
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "clock",
        type: "condition",
        displayName: "Time switch",
        category: "Other",
        icon: "img/actionicons/clock_icon.png",
        options: [ 
                   {
                      name: "From",
                      type: "checkbox",                            
                      values: ["0:00", "1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "0:00"],
                      value: "0:00"   
                   },
                   {
                      name: "To",
                      type: "checkbox",                            
                      values: ["0:00", "1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "0:00"]  ,
                      value: "0:00" 
                   }
                 ]      
    }));


    conditionModels.add( 
		  new ConditionAction({
        name: "clickGesture",
        type: "condition",
        displayName: "User made a click gesture",
        category: "Gestures",
        icon: "img/actionicons/gesture_click_icon.png",
        options: [ 
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "waveGesture",
        type: "condition",
        displayName: "User made a wave gesture",
        category: "Gestures",
        icon: "img/actionicons/gesture_wave_icon.png",
        options: [ 
                 ]        
    }));

      //Actions

    conditionModels.add( 
		  new ConditionAction({
        name: "livingSpotlight",
        type: "action",
        displayName: "Spotlight",
        category: "Baall",
        subCategory: "Living",
        icon: "img/actionicons/spotlight_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"] ,
                      value: "On"  
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "livingLamp1",
        type: "action",
        displayName: "Lamp",
        category: "Baall",
        subCategory: "Living",
        icon: "img/actionicons/lamp1_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "livingJack1",
        type: "action",
        displayName: "Jack",
        category: "Baall",
        subCategory: "Living",
        icon: "img/actionicons/jack_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "livingDoor1",
        type: "action",
        displayName: "Door left",
        category: "Baall",
        subCategory: "Living",
        icon: "img/actionicons/door_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "livingDoor2",
        type: "action",
        displayName: "Door right",
        category: "Baall",
        subCategory: "Living",
        icon: "img/actionicons/door_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "kitchenLight1",
        type: "action",
        displayName: "Light",
        category: "Baall",
        subCategory: "Kitchen",
        icon: "img/actionicons/lamp2_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "kitchenLight2",
        type: "action",
        displayName: "Light",
        category: "Baall",
        subCategory: "Kitchen",
        icon: "img/actionicons/lamp3_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "kitchenMicrowave",
        type: "action",
        displayName: "Microwave",
        category: "Baall",
        subCategory: "Kitchen",
        icon: "img/actionicons/microwave_icon.png",
        options: [ 
                   {
                      name: "Position",
                      type: "slider",
                      values: [0,100,10],
                      value: 0 
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "kitchenNette",
        type: "action",
        displayName: "Kitchenette",
        category: "Baall",
        subCategory: "Kitchen",
        icon: "img/actionicons/kitchenette_icon.png",
        options: [ 
                   {
                      name: "Position",
                      type: "slider",
                      values: [0,100,10],
                      value: 0 
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "kitchenCups",
        type: "action",
        displayName: "Cups",
        category: "Baall",
        subCategory: "Kitchen",
        icon: "img/actionicons/cups_icon.png",
        options: [ 
                   {
                      name: "Position",
                      type: "slider",
                      values: [0,100,10],
                      value: 0 
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "kitchenJack1",
        type: "action",
        displayName: "Jack",
        category: "Baall",
        subCategory: "Kitchen",
        icon: "img/actionicons/jack_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bathLight1",
        type: "action",
        displayName: "Light",
        category: "Baall",
        subCategory: "Bath",
        icon: "img/actionicons/lamp4_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bathBasin",
        type: "action",
        displayName: "Basin",
        category: "Baall",
        subCategory: "Bath",
        icon: "img/actionicons/basin_icon.png",
        options: [ 
                   {
                      name: "Position",
                      type: "slider",
                      values: [0,100,1],
                      value: 0
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bathDoor",
        type: "action",
        displayName: "Door",
        category: "Baall",
        subCategory: "Bath",
        icon: "img/actionicons/bigdoor_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bedroomBed",
        type: "action",
        displayName: "Bed",
        category: "Baall",
        subCategory: "Bed",
        icon: "img/actionicons/bett_icon.png",
        options: [ 
                   {
                      name: "Head",
                      type: "slider",
                      values: [0,10,1],
                      value: 0 
                   },
                   {
                      name: "Foot",
                      type: "slider",
                      values: [0,10,1],
                      value: 0 
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bedroomDoor1",
        type: "action",
        displayName: "Door left",
        category: "Baall",
        subCategory: "Bed",
        icon: "img/actionicons/door_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bedroomDoor2",
        type: "action",
        displayName: "Door right",
        category: "Baall",
        subCategory: "Bed",
        icon: "img/actionicons/door_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bedroomLamp1",
        type: "action",
        displayName: "Lamp",
        category: "Baall",
        subCategory: "Bed",
        icon: "img/actionicons/lamp1_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"] ,
                      value: "On"  
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bedroomLamp2",
        type: "action",
        displayName: "Lamp",
        category: "Baall",
        subCategory: "Bed",
        icon: "img/actionicons/lamp1_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"] ,
                      value: "On"  
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bedroomLamp3",
        type: "action",
        displayName: "Lamp",
        category: "Baall",
        subCategory: "Bed",
        icon: "img/actionicons/lamp3_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"],
                      value: "On"   
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "bedroomLamp4",
        type: "action",
        displayName: "Lamp",
        category: "Baall",
        subCategory: "Bed",
        icon: "img/actionicons/spotlight_icon.png",
        options: [ 
                   {
                      name: "On/Off",
                      type: "checkbox",                            
                      values: ["On", "Off"] ,
                      value: "On"  
                   }
                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "digitalScene1",
        type: "action",
        displayName: "Scene 1",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene1.png",
        options: [ 

                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "digitalScene2",
        type: "action",
        displayName: "Scene 2",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene2.png",
        options: [ 

                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "digitalScene3",
        type: "action",
        displayName: "Scene 3",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene3.png",
        options: [ 

                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "digitalScene4",
        type: "action",
        displayName: "Scene 4",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene4.png",
        options: [ 

                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "digitalScene5",
        type: "action",
        displayName: "Scene 5",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene5.png",
        options: [ 

                 ]        
    }));

    conditionModels.add( 
		  new ConditionAction({
        name: "pushUi",
        type: "action",
        displayName: "Push UI to clients",
        category: "Other",
        icon: "img/actionicons/phone_icon.png",
        options: [ 
                   {
                      name: "Interface",
                      type: "checkbox",                            
                      values: ["Wohnzimmer", "Multimedia", "Lights"],
                      value: "Wohnzimmer"   
                   }
                 ]        
    }));
 
    return conditionModels;   
}

