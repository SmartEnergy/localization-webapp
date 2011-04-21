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
        if (!spec || !spec.sceneName || !spec.serverIp || !spec.port || !spec.roomWidthMM || !spec.roomHeightMM || !spec.vp) {
            throw "InvalidConstructArgs";
        }
;

        this.set({
            htmlId: 'scene_' + this.cid,
            kinects: new KinectCollection(),
            regions: new RegionCollection(),
            users: new UserCollection()
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
                
        this.sendRegion();       
    },
    validate: function (attrs) {
    },
    toJSON: function() {
    	var m = {
			name: this.get("name"),
			posX: this.get("posX"),
			posY: this.get("posX"),
			width: this.get("width"),
			height: this.get("height"),
			actions: this.get("actions"),
			htmlId: this.get("htmlId")
    	}; 
    	return m;
    },
    sendRegion: function() {    	    
    	this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'region', regions: [this]}));
    },
    sendRemove: function() {
    	this.get("scenemodel").get("serversocket").send(JSON.stringify({method: 'deleteRegion', key: this.get("name")}));
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
        	offsetImgX: 0,
        	offsetImgY: 0,
        	angle: 0
        });       
    },
    validate: function (attrs) {
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



var ActionCollection = Backbone.Collection.extend({
    model: Action,

    initialize: function () {
    }
});

var KinectCollection = Backbone.Collection.extend({
    model: Kinect,

    initialize: function () {
    }
});

var RegionCollection = Backbone.Collection.extend({
    model: Region,

    initialize: function () {
    }
});
var UserCollection = Backbone.Collection.extend({
    model: User,

    initialize: function () {
    }
});
