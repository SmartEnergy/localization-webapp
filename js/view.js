/**
 * File name: $HeadURL$
 * Revision: $Revison$
 * Last modified: $Date$
 * Last modified by: $Author$
 * Created by: Tobias Hartwich (tha@tzi.de)
 * $Id$
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
		sceneview.onResizeWindow();

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
		"click .addKinectLnk": "addKinect",
		"click .addRegionLnk": "addRegion",
		"click .addRegionPolyLnk": "addRegionPolygon",
		"click .navleft": "navMoveLeft",
		"click .navright": "navMoveRight",
		"click .hideKinectLnk": "hideKinects",
		"click .showKinectLnk": "showKinects",
		"change #navroomWidthMM": "onRoomSizeChange",
		"change #navroomHeightMM": "onRoomSizeChange"

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
	onResizeWindow: function() {
		
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
			
		
		// Canvas verändern
		m = {
			w: 	$("#b")[0].offsetWidth,
			h:	$("#b")[0].offsetHeight
		};
		$("#canvascont").html(ich.canvastmpl(m));
		
	    var canvas = document.getElementById("canvas");
	    var ctx  = canvas.getContext("2d");
	    
	    this.model.get("vp").set({
	    	canvas: canvas,
	    	ctx: ctx
	    });
	    this.drawPolygons();
		

	},
	onRoomSizeChange: function() {
		var w = $("#navroomWidthMM").val();
		var h = $("#navroomHeightMM").val();
		
		this.model.set({
			roomWidthMM: w,
			roomHeightMM: h
		});
		
		this.model.get("vp").set({
			bgPixelInMM: w / $("body")[0].offsetWidth
		});
		
		this.onResizeWindow();
		
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
		
		if (this.model.get("serversocket") != null && 
			this.model.get("serversocket") != undefined) {
			this.model.get("serversocket").disconnect();
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
	addKinect: function() {
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

		this.model.get("regions").add(regionmoodel);
		
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

		
	},
	addRegionPolygon: function() {
		var regionmodel = new RegionPolygon({
			name: "Ein Poly",
			scenemodel: this.model
		});

		this.model.get("regionsPoly").add(regionmodel);		
		
		regNavView = new RegionPolyNavView({
			model: regionmodel
		});	
		
		regionmodel.set({
			view: regNavView
		});
		
		regNavView.firstRender();
		$("#regionsListCtrl").append(regNavView.el);		
		
		this.model.get("vp").get("canvas").addEventListener("mousemove", this.onPolygonMove, false);
		this.model.get("vp").get("canvas").addEventListener("click", this.onPolygonClick, false);
		this.model.get("vp").get("canvas").addEventListener("dblclick", this.onPolygonDblClick, false);
	},
	onPolygonClick: function(e) {
		var poly = sceneview.model.get("regionsPoly").last();
		var points = poly.get("points");
		
        a = {
            x:e.pageX,
            y:e.pageY,
            xMM: Math.round(sceneview.model.get("vp").pixelInMM(e.pageX)),
            yMM: Math.round(sceneview.model.get("vp").pixelInMM(e.pageY))
        };
        points.push(a);
        
        sceneview.drawPolygons();
        poly.get("view").render();
	},
	onPolygonMove: function(e) {
		var poly = sceneview.model.get("regionsPoly").last();
		var points = poly.get("points");		
		
        a = {
            x:e.pageX,
            y:e.pageY,
            xMM: Math.round(sceneview.model.get("vp").pixelInMM(e.pageX)),
            yMM: Math.round(sceneview.model.get("vp").pixelInMM(e.pageY))           
        };
        points.pop();
        points.push(a);	
        sceneview.drawPolygons();
        poly.get("view").render();
	},	
	onPolygonDblClick: function(e) {
		var poly = sceneview.model.get("regionsPoly").last();
		var points = poly.get("points");	
		
		points.pop();
		points.pop();
		points.push(points[0]);
		sceneview.drawPolygons();
		poly.get("view").render();
        
        sceneview.model.get("vp").get("canvas").removeEventListener("mousemove", sceneview.onPolygonMove, false);
        sceneview.model.get("vp").get("canvas").removeEventListener("click", sceneview.onPolygonClick, false);
        sceneview.model.get("vp").get("canvas").removeEventListener("dblclick", sceneview.onPolygonDblClick, false);
	},
	drawPolygons: function() {
		
		var ctx = sceneview.model.get("vp").get("ctx");
        ctx.clearRect ( 0 , 0 , $("#canvascont").width() , $("#canvascont").height() );
              
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";  		
		
		sceneview.model.get("regionsPoly").each(function(poly) {
			var points = poly.get("points");
			
			if (points.length > 0) {
				ctx.fillStyle = "rgba("+colorsrgb[points[0].x%10]+",0.3)"; 
			}
			else {
				ctx.fillStyle = "rgba(0,0,0,0.5)";  
			}
			
	        ctx.beginPath();          
	        for (var i = 0; i<points.length; i++) {
	            if (i==0) {
	               ctx.moveTo(points[i].x,points[i].y); 
	            }
	            else {
	                ctx.lineTo(points[i].x,points[i].y);
	            }
	        }
	        ctx.stroke();  

	        ctx.fill(); 			
		});
	},
	addUser: function(key, user) {
		var usermodel = new User({
			userid: key,
			posX: user.position.x,
			posY: user.position.y,
			scenemodel: this.model
		});

		this.model.get("users").add(usermodel);	
		
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
		
		regioncoll = this.model.get("scenemodel").get("regions");
		$(this.el).css("background-color", "rgba("+colorsrgb[regioncoll.indexOf(this.model)%10]+", .20)");
		$(this.el).css("border-color", "rgb("+colorsrgb[regioncoll.indexOf(this.model)%10]+")");
		
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
			},
			containment: 'window'
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
		
		
		regioncoll = this.model.get("scenemodel").get("regions");
		this.$(".lcRegionColor").css("background-color", "rgba("+colorsrgb[regioncoll.indexOf(this.model)%10]+", .20)");
		this.$(".lcRegionColor").css("border-color", "rgb("+colorsrgb[regioncoll.indexOf(this.model)%10]+")");
		
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

var RegionPolyNavView = Backbone.View.extend({
	events: {

	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() { 
		var points = this.model.get("points");
		var pointstr = "";
		
		for (var i = 0; i<points.length;  i++) {
			if (i == points.length-1) {
				pointstr += "("+points[i].xMM+","+points[i].yMM+")";
			}
			else {
				pointstr += "("+points[i].xMM+","+points[i].yMM+"), ";
			}
		}
		
		this.$(".vert").html(pointstr);

		return this;
	},
	firstRender: function() {
		$(this.el).html(ich.regionpolynavtmpl(this.model.toJSON()));
		
		
		//regioncoll = this.model.get("scenemodel").get("regions");
		//this.$(".lcRegionColor").css("background-color", "rgba("+colorsrgb[regioncoll.indexOf(this.model)%10]+", .20)");
		//this.$(".lcRegionColor").css("border-color", "rgb("+colorsrgb[regioncoll.indexOf(this.model)%10]+")");
		
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