/**
 * File name: $HeadURL$
 * Revision: $Revison$
 * Last modified: $Date$
 * Last modified by: $Author$
 * Created by: Tobias Hartwich (tha@tzi.de)
 * 
 * Views create and deal with the DOM objects.
 * It's the only file with DOM manipulations 
 */
   

/**
 * 
 */
var SceneCreatorView = Backbone.View.extend({
	events: {
		"click #newSceneBtn":    "newScene",
		"click #loadSceneBtn":   "loadScene",
		"click #createSceneBtn": "createScene"
	},
	initialize: function() {
		_.bindAll(this, "render");

		//this.model.bind('change', this.render);
	},
	render: function() {
		$(this.el).html(ich.scenecreatortmpl());
		return this;
	},

	newScene: function() {
		this.$("#sceneSelectStep1").hide();
		this.$("#sceneSelectStep2").show();
	},
	loadScene: function() {
	},
	createScene: function() {
		this.$("#sceneSelectStep1").hide();
		this.$("#sceneSelectStep2").hide();		  

		var viewportmodel = new Viewport({
			bgWidthPx: $("body")[0].offsetWidth,
			bgHeightPx: $("body")[0].offsetHeight,
			bgPixelInMM: this.$("#sceneWidth").val() / $("body")[0].offsetWidth,
			bgImage: this.$("#sceneBgImg").val()
		});	

		var scenemodel = new Scene({
			sceneName: this.$("#sceneName").val(),
			serverIp: this.$("#serverip").val(),
			port: this.$("#port").val(),
			roomWidthMM: this.$("#sceneWidth").val(),
			roomHeightMM: this.$("#sceneHeight").val(),
			vp: viewportmodel
		});

		sceneview = new SceneView({
			model: scenemodel

		});	

		sceneview.render();		  		 
		$("#content").append(sceneview.el);
		sceneview.reconnect();
		sceneview.navMoveRight();

		// Nav anzeigen
		$("#navigation").show();
		$('#navigation').animate({
			top: '+=50',
			opacity: 0.6
		}, 500, function() {
			// Animation complete.
		});		  
	}	  	  
});


var SceneView = Backbone.View.extend({
	nav_opened: false,
	addedtodom: false,

	events: {
		"mouseover #navigation":    "navMouseOver",
		"mouseout #navigation":     "navMouseOut",
		"click #navigationHead":    "navHeadClick",
		"change .navconfiginput": 	"changeSceneConfig",
		"click .reconnectlink": "reconnect",
		"click .addKinectLnk": "addkinect",
		"click .addRegionLnk": "addRegion",
		"click .navleft": "navMoveLeft",
		"click .navright": "navMoveRight",
		"click .addUserLnk": "addUser",
		"click .hideKinectLnk": "hideKinects",
		"click .showKinectLnk": "showKinects"

	},

	initialize: function() {
		_.bindAll(this, "render");
		this.model.bind('change', this.render);

		this.model.get("vp").bind('change', this.render);
	},

	render: function() {
		if (this.addedtodom == false) {
			$(this.el).html(ich.scenetmpl());

			var self = this;
			$(window).resize(function() {
				self.onResizeWindow(self);
			});			

			this.addedtodom = true;						
		}

		this.$("#scenenav").html(ich.sceneconfig(this.model.toJSON()));
		this.$("#navsceneBg").val(this.model.get("vp").get("bgImage"));
		this.$("#karte").html(ich.scenebgtmpl(this.model.get("vp").toJSON()));	

		if (this.model.hasChanged("serverIp") || this.model.hasChanged("port")) {
			this.reconnect();
		}	

		return this;
	},
	onResizeWindow: function(self) {

		this.model.get("vp").set({
			bgWidthPx: $("body")[0].offsetWidth,
			bgHeightPx: $("body")[0].offsetHeight,
			bgPixelInMM: this.model.get("roomWidthMM") / $("body")[0].offsetWidth
		});

		$("#bgkarte").width(this.model.get("vp").get("bgWidthPx"));

		//Kinects durchlaufen
		this.model.get("kinects").each(function(kinmodel){ 
			kinmodel.get("view").resizeKinect();
			kinmodel.get("view").moveKinect();
		});						

		// Regionen durchlaufen
		this.model.get("regions").each(function(regmodel){ 
			regmodel.get("view").resizeRegion();
			regmodel.get("view").moveRegion();
		});					


	},
	navMoveRight: function() {
		$("#navigation").css("left","auto");
		$("#navigation").css("right","0px");


		$(".navleft").show();
		$(".navright").hide();		  
	},
	navMoveLeft: function() {
		$("#navigation").css("left","0px");
		$("#navigation").css("right","auto");

		$(".navright").show();
		$(".navleft").hide();

	},
	navMouseOver: function() {
		$("#navigation").css("opacity", 1);
	},
	navMouseOut: function() {
		$("#navigation").css("opacity", 0.6);
	},
	navHeadClick: function() {
		if (this.nav_opened == false) {
			$('#navigation').animate({
				height: '100%'
			}, 
			500, 
			function() {
				// Animation complete.
				$("#navigationContent").show();
				$( "#accordion" ).accordion();
			});
			this.nav_opened = true;          }
		else {
			$("#navigationContent").hide();
			$('#navigation').animate({
				height: '40'
			}, 500, function() {
				// Animation complete.

			}); 
			this.nav_opened = false;
		}		  
	},
	changeSceneConfig: function() {
		this.model.set({
			sceneName: $("#navsceneName").val(),
			serverIp: $("#navserverIp").val(),
			port: $("#navport").val(),
			roomWidthMM: $("#navroomWidthMM").val(),
			roomHeightMM: $("#navroomHeightMM").val()
		});

		this.model.get("vp").set({
			bgWidthPx: $("body")[0].offsetWidth,
			bgHeightPx: $("body")[0].offsetHeight,
			bgPixelInMM: $("#navroomWidthMM").val() / $("body")[0].offsetWidth,
			bgImage: $("#navsceneBg").val()
		});		  
	},
	reconnect: function() {
		if (this.model.get("serversocket") != null) {
			this.serversocket.disconnect();
		}
		
		this.model.set({
			serversocket: new io.Socket(this.model.get("serverIp"),{'port':this.model.get("port")})
		});

		this.model.get("serversocket").on('connect', this.onconnected);
		this.model.get("serversocket").on('disconnect', this.ondisconnected);  
		this.model.get("serversocket").on('connect_failed', this.onconnectfail);	  		  

		var self = this;
		this.model.get("serversocket").on('message', function(data){
			var msg = JSON.parse(data);
			var event = msg.event;
			switch(event) {
			case 'userIn':
				//onUserIn(msg.user, msg.region);
				break;
			case 'userOut':
				//onUserOut(msg.user, msg.region);
				break;
			case 'newUser':
				//alert(msg.user.position.x);
				self.addUser(msg.key, msg.user);
				break;
			case 'region':
				if(msg.success != true) {
					alert("Da ging was schief!");
				}
				break;

			case 'actionTriggered':
				alert("alterfalter");
				break;	              
			default:
				//alert('Unsupported Event Type..');
				break;
			}
		});

		// establish connection
		this.model.get("serversocket").connect();			  	  
	},
	onconnected: function() {
		jQuery.favicon('img/favcon.png');
		$.jwNotify({
			title: 'connection established',
			body: 'connection to server established',
			timeout: 3000
		});		  
	},
	ondisconnected: function() {
		$.jwNotify({
			title: 'connection lost',
			body: 'connection to server lost',
			timeout: 3000
		});	

		jQuery.favicon('img/favdis.png');		  
	},
	onconnectfail: function() {
		$.jwNotify({
			title: 'connection failed',
			body: 'failed to connect',
			timeout: 3000
		});	

		jQuery.favicon('img/favdis.png');		  
	},
	addkinect: function() {
		var kinectmoodel = new Kinect({
			scenemodel: this.model
		});


		kinectview = new KinectView({
			model: kinectmoodel		  				  
		});	
		kinectview.firstRender();
		$("#kinects").append(kinectview.el);

		kinectmoodel.set({
			view: kinectview
		});

		kinNavView = new KinectNavView({
			model: kinectmoodel
		});	
		kinNavView.firstRender();
		$("#kinectListCtrl").append(kinNavView.el);		

		kinectview.resizeKinect();
		kinectview.moveKinect();		  

		this.model.get("kinects").add(kinectmoodel);
	},
	hideKinects: function() {
		$(".hideKinects").hide();
		$(".showKinects").show();

		$(".kinect").fadeOut(750);
	},
	showKinects: function() {
		$(".hideKinects").show();
		$(".showKinects").hide();

		$(".kinect").fadeIn(750);		  
	},
	addRegion: function() {
		var regionmoodel = new Region({
			name: "Eine Box",
			posX: 10,
			posY: 10,
			width: 1000,
			height: 1000,
			scenemodel: this.model
		});

		regionview = new RegionView({
			model: regionmoodel		  				  
		});	
		regionview.firstRender();
		$("#regions").append(regionview.el);

		regionmoodel.set({
			view: regionview
		});		  

		regNavView = new RegionNavView({
			model: regionmoodel
		});	
		regNavView.firstRender();
		$("#regionsListCtrl").append(regNavView.el);		


		regionview.resizeRegion();
		regionview.moveRegion();		  

		this.model.get("regions").add(regionmoodel);
	},
	addUser: function(key, user) {
		var usermodel = new User({
			userid: key,
			posX: user.position.x,
			posY: user.position.y,
			scenemodel: this.model
		});

		userview = new UserView({
			model: usermodel		  				  
		});	
		userview.firstRender();
		$("#users").append(userview.el);		  		  		  

		usrNavView = new UserNavView({
			model: usermodel
		});	
		usrNavView.firstRender();
		$("#usersListCtrl").append(usrNavView.el);			  

		this.model.get("users").add(usermodel);		  
	}
});


var KinectView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		$(this.el).css("-webkit-transform", "rotateZ("+this.model.get("angle")+"deg)");
		
		return this;
	},
	firstRender: function() {
		this.el = ich.kinectdevtmpl(this.model.toJSON());

		var self = this;
		$(this.el).draggable({
			drag: function() { 
				self.model.set({
					offsetImgX: Math.round(self.model.get("scenemodel").get("vp").pixelInMM(self.$(".kinImgSrc1").offset().left)),
					offsetImgY: Math.round(self.model.get("scenemodel").get("vp").pixelInMM(self.$(".kinImgSrc1").offset().top))
				});
			}
		});			  
	},
	resizeKinect: function() {
		this.$(".kinImgSrc2").css("width", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("widthLightMM")));
		this.$(".kinImgSrc1").css("width", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("widthDeviceMM")));
	},
	moveKinect: function() {
		this.$("kinImgSrc1").css("top", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("offsetImgY")));
		this.$("kinImgSrc1").css("left", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("offsetImgX")));
	}




});

var KinectNavView = Backbone.View.extend({
	events: {
		"change .angleslider": "moveSlider",
		"click .kinectRemoveLnk": "remove"
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		this.$(".offx").html(this.model.get("offsetImgX"));
		this.$(".offy").html(this.model.get("offsetImgY"));
		this.$(".ang").html(this.model.get("angle"));
		return this;
	},
	firstRender: function() {
		$(this.el).html(ich.kinectnavtmpl(this.model.toJSON()));
		return this;
	},
	moveSlider: function() {
		ang = this.$(".angleslider").val();
		this.model.set({
			angle: ang
		});
	},
	remove: function() {
		this.model.get("scenemodel").get("kinects").remove(this.model);
		$("#"+this.model.get("htmlId")).remove();
		$(this.el).remove();
	}
});


var RegionView = Backbone.View.extend({
	events: {

	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		return this;
	},
	firstRender: function() {
		this.el = ich.regiondevtmpl(this.model.toJSON());

		var self = this;
		$(this.el).draggable({
			drag: function() { 
				self.model.set({
					posX: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($(self.el).offset().left)),
					posY: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($(self.el).offset().top))
				});
			},
			stop: function() {
				self.model.sendRegion();
			}
		});	

		$(this.el).resizable({
			resize: function() { 
				self.model.set({
					width: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($(self.el).width())),
					height: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($(self.el).height()))
				});
			},
			stop: function() {
				self.model.sendRegion();
			}		  
		});		  
	},
	resizeRegion: function() {
		$(this.el).css("width", Math.round(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("width"))));
		$(this.el).css("height", Math.round(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("height"))));
	},
	moveRegion: function() {
		$(this.el).css("top", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY")));
		$(this.el).css("left", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posX")));
	}
});

var RegionNavView = Backbone.View.extend({
	events: {
		"click .boxRemoveLnk": "remove",
		"click .regionAddAction": "addAction"
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() { 
		this.$(".lcInfos").html($(ich.regionnavtmpl(this.model.toJSON())).find(".lcInfos").html());

		return this;
	},
	firstRender: function() {
		$(this.el).html(ich.regionnavtmpl(this.model.toJSON()));
		return this;
	},
	remove: function() {
		this.model.sendRemove();
		this.model.get("scenemodel").get("regions").remove(this.model);
		$("#"+this.model.get("htmlId")).remove();
		$(this.el).remove();
	},
	addAction: function() {
		var actionmodel = new Action({
			regionmodel: this.model
		});

		actionview = new ActionView({
			model: actionmodel		  				  
		});	
		actionview.firstRender();
		this.$(".regionActions").append(actionview.el);		  		   

		this.model.get("actions").add(actionmodel);		  
	}
});

var ActionView = Backbone.View.extend({
	events: {
		"change .regionActionEvent": "onChangeAction",
		"change .regionActionAction": "onChangeAction",
		"click .trashicon": "remove"
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		return this;
	},
	firstRender: function() {
		$(this.el).html(ich.actiontmpl(this.model.toJSON()));	

		return this;
	},
	onChangeAction: function() {
		this.model.set({
			event: this.$(".regionActionEvent").val(),
			action: this.$(".regionActionAction").val()
		});
		this.model.get("regionmodel").sendRegion();
	},
	remove: function() {
		this.model.get("regionmodel").get("actions").remove(this.model);
		$(this.el).remove();
		this.model.get("regionmodel").sendRegion();
	}
});

var UserView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		//alert(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY")));
		this.$(".user").css("top", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY")));
		this.$(".user").css("left", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posX")));		

		return this;
	},
	firstRender: function() {
		$(this.el).html(ich.userdevtmpl(this.model.toJSON()));	

		this.$(".user").css("background-color", colors[this.model.get("userid")%10]);

		var self = this;
		this.model.get("scenemodel").get("serversocket").on('message', function(data){
			var msg = JSON.parse(data);
			var event = msg.event;
			switch(event) {
			case 'updateUser':
				self.updateUser(msg.key, msg.user);
				break;
			case 'removedUser':
				self.remove(msg.key);
				break;
			case 'userIn':
				self.userInRegion(msg.user, msg.region);
				//onUserIn(msg.user, msg.region);
				break;
			case 'userOut':
				//onUserOut(msg.user, msg.region);
				break;		              

			default:

				break;
			}
		});		  

		return this;
	},	  
	updateUser: function(key, user) {
		if (key != this.model.get("userid")) {
			return;
		}
		this.model.set({
			posX: user.position.x,
			posY: user.position.y
		});
	},
	remove: function(key) {
		if (key != this.model.get("userid")) {
			return;
		}		

		this.model.get("scenemodel").get("users").remove(this.model);
		$("#nav"+this.model.get("htmlId")).remove();
		$(this.el).fadeOut("slow");
	},
	userInRegion: function(user, region) {
		if (user.id != this.model.get("userid")) {
			return;
		}		

		// TODO: 
		alert("user in region");
	}
});

var UserNavView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		$(this.el).html(ich.usernavtmpl(this.model.toJSON()));
		return this;
	},
	firstRender: function() {
		this.render();
		this.$(".lcUserColor").css("background-color", colors[this.model.get("userid")%10]);

		return this;
	}
});