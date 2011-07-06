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
 * Dialogs for creating or loading a scene
 */
var SceneCreatorView = Backbone.View.extend({
	events: {
		"click #newSceneBtn":    "newScene",
		"click #createSceneBtn": "createScene",

		
	},
	initialize: function() {
		_.bindAll(this, "render");
	},
	render: function() {
		// icanhaz with template
		$(this.el).html(ich.scenecreatortmpl());
    var self = this;

		return this;
	},
	/**
	 * show dialog for creating a new scene
	 */	
	newScene: function() {
		$("#sceneSelectStep1").hide();
		$("#sceneSelectStep2").show();
	},
	/**
	 * show dialog for loading a scene from the server
	 */	
	loadScene: function() {
		$("#sceneSelectStep1").hide();
		$("#sceneSelectStep3").show();							
	},
	/**
	 * Load scene from the server and create the scene
	 */
	onLoadSceneBtn: function() {				
		$("#sceneSelectStep1").hide();
		$("#sceneSelectStep3").hide();		
		
		$("#serverip").val($("#loadserverip").val());
		$("#port").val($("#loadport").val());
	
		this.createScene();
		
		sceneview.model.get("serversocket").send(JSON.stringify({method: "loadRegions"}));
		
	},
	/**
	 * creates a new scene
	 */
	createScene: function() {
		this.$("#sceneSelectStep1").hide();
		this.$("#sceneSelectStep2").hide();		  

		// Viewport and Scene objs with values of the dialog
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
		
		// Navigation to the right
		sceneview.navMoveRight();
		
		// Adjust size of bg-image, kinects, regions

		sceneview.onResizeWindow();
		
		// Initial connect
		$("#connectDialog").show();
		$("#connDialog").show();					
		sceneview.reconnect();

		// Show navigation
		$("#navigation").show();
		$('#navigation').animate({
			top: '+=50',
			opacity: 0.6
		}, 500, function() {});		  

    $("#goLoadScene").click(function(e) {
		  $("#serverip").val($("#loadserverip").val());
		  $("#port").val($("#loadport").val());
      sceneview.model.set({
        serverIp: $("#loadserverip").val(),
        port: $("#loadport").val()
      });
		  $("#connectDialog").show();
		  $("#reconnectDialog").show();
		  $("#connDialog").hide();    
      $("#sceneSelectStep3").hide();
      sceneview.reconnect();
    });

	}
});

/**
 * View for the whole scene with navigation, canvas and bg
 */
var SceneView = Backbone.View.extend({
	nav_opened: false,
	addedtodom: false,

	// Events for navigation actions
	events: {
		"mouseover #navigation":    "navMouseOver",
		"mouseout #navigation":     "navMouseOut",
		"click #navigationHead":    "navHeadClick",
		"change .navconfiginput": 	"changeSceneConfig",
		"click .reconnectlink": "reconnect",
		"click .addKinectLnk": "addKinect",
    "click .addCommandLnk": "addCommand",
		"click .addRegionLnk": "addDefaultRegion",
		"click .addRegionPolyLnk": "addRegionPolygon",
		"click .navLeftLnk": "navMoveLeft",
		"click .navRightLnk": "navMoveRight",
		"click .hideKinectLnk": "hideKinects",
		"click .showKinectLnk": "showKinects",
		"change #navroomWidthMM": "onRoomSizeChange",
		"change #navroomHeightMM": "onRoomSizeChange"

	},
	initialize: function() {
		_.bindAll(this, "render");
		
		// Call render if model changes
		this.model.bind('change', this.render);
		this.model.get("vp").bind('change', this.render);
	},
	render: function() {
		// On initial rendering
		if (this.addedtodom == false) {
			// icanhaz with template
			$(this.el).html(ich.scenetmpl());

			// Register callback for window resizes
			var self = this;

			$(window).resize(function(event) {
        if (inAction === false) {
  				self.onResizeWindow();
        }
			});			

			this.addedtodom = true;						
		}
		
		// Update navigation and bg
		this.$("#scenenav").html(ich.sceneconfig(this.model.toJSON()));
		this.$("#navsceneBg").val(this.model.get("vp").get("bgImage"));
		this.$("#karte").html(ich.scenebgtmpl(this.model.get("vp").toJSON()));	

		// reconnect if ip or port has changed
		if (this.model.hasChanged("serverIp") || this.model.hasChanged("port")) {
			this.reconnect();
		}	

		return this;
	},
	/**
	 * Callback for window resizes
	 */
	onResizeWindow: function() {
		// Update viewport
		this.model.get("vp").set({
			bgWidthPx: $("body")[0].offsetWidth,
			bgHeightPx: $("body")[0].offsetHeight,
			bgPixelInMM: this.model.get("roomWidthMM") / $("body")[0].offsetWidth
		});

		// Adjust background
		$("#bgkarte").width(this.model.get("vp").get("bgWidthPx"));

		// Adjust Kinects
		this.model.get("kinects").each(function(kinmodel){ 
			kinmodel.get("view").resizeKinect();
			kinmodel.get("view").moveKinect();
		});						

		// Adjust rect regions
		this.model.get("regions").each(function(regmodel){ 
			regmodel.get("view").resizeRegion();
			regmodel.get("view").moveRegion();

		});		
			
		
		// Update canvas and poly regions
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
	    this.model.get("vp").get("canvas").addEventListener("mousedown", this.onCanvasClick, false);
	    
		// Update navigation height
		$(".listCtrl").height($("body")[0].offsetHeight-285);
		$("#navigationContent").height($("body")[0].offsetHeight-75);
		$("#accordion").accordion( "resize" );	    		
	},
	/**
	 * Callback for changing room size
	 */
	onRoomSizeChange: function() {
		var w = $("#navroomWidthMM").val();
		var h = $("#navroomHeightMM").val();
		
		this.model.set({
			roomWidthMM: w,
			roomHeightMM: h
		});
		
		// calc Pixel/Millimeter ratio 
		this.model.get("vp").set({
			bgPixelInMM: w / $("body")[0].offsetWidth
		});
		
		// Adjust Regions etc.

		this.onResizeWindow();
		
	},
	navMoveRight: function() {
		$("#navigation").css("left","auto");
		$("#navigation").css("right","0px");
     $("#navigation").css("box-shadow","-3px 2px 5px #aaa");
		
		// Show move left icon
		$(".navleft").show();
		$(".navright").hide();		  
	},
	navMoveLeft: function() {
		$("#navigation").css("left","0px");
		$("#navigation").css("right","auto");
    $("#navigation").css("box-shadow","3px 2px 5px #aaa");

		// Show move right icon
		$(".navright").show();
		$(".navleft").hide();
	},
	navMouseOver: function() {
		$("#navigation").css("opacity", 1);
	},
	navMouseOut: function() {
		$("#navigation").css("opacity", 0.6);
	},
	/**
	 * Toggle Navigation (close if opened, open if closed)
	 */
	navHeadClick: function() {
		if (this.nav_opened == false) {
			$('#navigation').animate({
				height: '100%'
			}, 
			500, 
			function() {
				// Animation complete.
				$("#navigationContent").show();
				$( "#accordion" ).accordion({
					fillSpace: true
				});
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
	/**
	 * Reloads the scene-config from the navigation text inputs
	 */
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
	/**
	 * Dissconnets (if connected) and reconnect to the server
	 */
	reconnect: function() {

		// Disconnect if connected
		if (this.model.get("serversocket") != null && 
			this.model.get("serversocket") != undefined) {
			this.model.get("serversocket").disconnect();
		}
		

		// Create new socket
    try {
		  this.model.set({
			  serversocket: new io.Socket(this.model.get("serverIp"),{'port':this.model.get("port")})
		  });
    }
    catch (e) {
      alert("Server ist nicht erreichbar!");
    }
		  
			
		// Register callbacks for changes of the connection status
		this.model.get("serversocket").on('connect', this.onconnected);
		this.model.get("serversocket").on('disconnect', this.ondisconnected);  
		this.model.get("serversocket").on('connect_failed', this.onconnectfail);	  		  

		// Register callback for incoming server messages
		var self = this;
		this.model.get("serversocket").on('message', function(data){
			var msg = JSON.parse(data);
			var event = msg.event;
			switch(event) {
			case 'newUser':
				//alert(msg.user.position.x);
				self.addUser(msg.key, msg.user);
				break;
			case 'newKinect':
				self.onNewKinect(msg.region);
				break; 				
			case 'newRegion':
				self.onNewRegion(msg.region);
				break; 
			case 'updateRegion':				
				self.updateRegion(msg.region);
				break; 
			case 'removedRegion':
				self.removeRegion(msg.key);
				break; 				
            case 'loadActions':
                self.onActionsLoaded(msg.actions);
                break;
            case 'loadRegions':
                self.onRegionsLoaded(msg.regions);
                break;                        
		
			default:
				//alert('Unsupported Event Type: ' + event);
				break;
			}
		});

		// Establish connection
		this.model.get("serversocket").connect();			  	  
	},
	/**
	 * Callback for connection status "connected"
	 */
	onconnected: function() {
		sceneview.model.set({
			connected: "connected"
		});		
		
		// Hide all error message dialogs
		$("#connectDialog").hide();
		$("#reconnectDialog").hide();
		$("#connDialog").hide();			
		
		// Load actions and regions from server (callback will handle server response)
		sceneview.model.get("serversocket").send(JSON.stringify({method: "loadActions"}));
		sceneview.model.get("serversocket").send(JSON.stringify({method: "loadRegions"}));		
		
		// Change favicon
		jQuery.favicon('img/favcon.png');
		
		// Send desktop notfication
		$.jwNotify({
			title: 'connection established',
			body: 'connection to server established',
			timeout: 3000
		});		
	},
	/**
	 * Callback for connection status "disconnected"
	 */	
	ondisconnected: function() {
		sceneview.model.set({
			connected: "disconnected"
		});		

		// Change favicon
		jQuery.favicon('img/favdis.png');
		
		// Show error message dialog
		$("#connectDialog").show();
		$("#reconnectDialog").show();
		$("#connDialog").hide();
		
		// Try to reconnect
		sceneview.reconnect();
		
		// Show desktop notification
		$.jwNotify({
			title: 'connection lost',
			body: 'connection to server lost',
			timeout: 3000
		});			

	},
	/**
	 * Callback for connection status "connectionfail"
	 */		
	onconnectfail: function() {
		sceneview.model.set({
			connected: "disconnected"
		});		
		
		// Change favicon
		jQuery.favicon('img/favdis.png');		
		
		// Show error message dialog
		$("#connectDialog").show();
		$("#reconnectDialog").show();
		$("#connDialog").hide();
		
		// Try to reocnnect
		sceneview.reconnect();
		
		// Show desktop notification
		$.jwNotify({
			title: 'connection failed',
			body: 'failed to connect',
			timeout: 3000
		});			

	},
	/**
	 * Adds a new kinect to the scene
	 */
	addKinect: function() {
		
		// Create kinect model and view
		var kinectmoodel = new Kinect({
			scenemodel: this.model
		});
		kinectview = new KinectView({
			model: kinectmoodel		  				  
		});
		
		// Initial rendering	
		kinectview.firstRender();
		
		// Add to DOM
		$("#kinects").append(kinectview.el);

		// Add view object to model
		kinectmoodel.set({
			view: kinectview
		});

		// Create navigation view
		kinNavView = new KinectNavView({
			model: kinectmoodel
		});	
		
		// Initial rendering of navigation view
		kinNavView.firstRender();
		
		// Add navigation view to DOM
		$("#kinectListCtrl").append(kinNavView.el);		

		// Resize and Replace the new Kinect according to the window size
		kinectview.resizeKinect();
		kinectview.moveKinect();		  

		// Add kinect model to kinect collection in the scene model 
		this.model.get("kinects").add(kinectmoodel);
	},
	/**
	 * Hides all kinects
	 */
	hideKinects: function() {
		$(".hideKinects").hide();
		$(".showKinects").show();

		$(".kinect").fadeOut(750);
	},
	/**
	 * Shows all kinects
	 */
	showKinects: function() {
		$(".hideKinects").show();
		$(".showKinects").hide();

		$(".kinect").fadeIn(750);		  
	},
	/**
	 * Adds a rectangle region with standard properties
	 */
	addDefaultRegion: function() {
		var regionmoodel = new Region({
			name: "region_rect_" + this.model.get("regions").length,
			posX: 10,
			posY: 10,
			width: 1000,
			height: 1000,
			scenemodel: this.model
		});
		
		this.addRegion(regionmoodel, true);
	},
	/**
	 * Creates views for given rectangle region model
	 */
	addRegion: function(regionmoodel, send) {
		
		// Add region model to region collection in the scene model
		this.model.get("regions").add(regionmoodel);
		
		// Create region view and navigation view and render it
		regionview = new RegionView({
			model: regionmoodel		  				  
		});	
		regNavView = new RegionNavView({
			model: regionmoodel
		});	
		
		regNavView.firstRender();
		regionview.firstRender();
		
		$("#regionsListCtrl").append(regNavView.el);	
		$("#regions").append(regionview.el);			
		
		// Add views to region model
		regionmoodel.set({
			view: regionview,
			navview: regNavView
		});			
		
		// Initial resize und move
		regionview.resizeRegion();
		regionview.moveRegion();
		
		// If flag send is set, the region will be send to the server
		if(send) {
			regionmoodel.sendRegion();
		}
		
	},
	/**
	 * Callback for clicking on the canvas. 
	 * Redraws the Canvas and enables dragging if user has clicked on a polygon
	 */
	onCanvasClick: function(e) {
        a = {
                x:e.pageX,
                y:e.pageY
        };		
		sceneview.drawPolygons(a);
	},	
	/**
	 * 
	 */
	addRegionPolygon: function(evt, model) {
		if (model == undefined) {
			var regionmodel = new RegionPolygon({
				name: "region_poly_" + this.model.get("regionsPoly").length,
				scenemodel: this.model
			});
		}
		else {
			var regionmodel = model;
		}

		this.model.get("regionsPoly").add(regionmodel);		
		
		regNavView = new RegionPolyNavView({
			model: regionmodel
		});	
		
		regionmodel.set({
			view: regNavView,
			navview: regNavView
		});
		
		regNavView.firstRender();
		$("#regionsListCtrl").append(regNavView.el);
		
		if (model == undefined) {
			
			$("#canvascont").css("z-index", "1000");
			
			this.model.get("vp").get("canvas").removeEventListener("mousedown", this.onCanvasClick, false);
			this.model.get("vp").get("canvas").addEventListener("mousemove", this.onPolygonMove, false);
			this.model.get("vp").get("canvas").addEventListener("click", this.onPolygonClick, false);
			this.model.get("vp").get("canvas").addEventListener("dblclick", this.onPolygonDblClick, false);
			window.addEventListener("keydown", this.onPolygonKeyPress, false);
			
			$("#b").css('cursor','crosshair');
			$("#notification").show();
		}
	},
	/**
	 * 
	 */
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
        poly.get("view").drawIcon();
	},
	/**
	 * 
	 */
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
	/**
	 * 
	 */	
	onPolygonDblClick: function(e) {
		
		var poly = sceneview.model.get("regionsPoly").last();
		var points = poly.get("points");	
		
		points.pop();
		points.pop();
		points.push(points[0]);
		sceneview.drawPolygons();
		poly.get("view").render();
		
		$("#b").css('cursor','auto');
		$("#canvascont").css("z-index", "8");
		$("#notification").fadeOut(750);
	
		poly.sendRegion();
		poly.get("view").drawIcon();
        
        sceneview.model.get("vp").get("canvas").removeEventListener("mousemove", sceneview.onPolygonMove, false);
        sceneview.model.get("vp").get("canvas").removeEventListener("click", sceneview.onPolygonClick, false);
        sceneview.model.get("vp").get("canvas").removeEventListener("dblclick", sceneview.onPolygonDblClick, false);
        
        sceneview.model.get("vp").get("canvas").addEventListener("mousedown", sceneview.onCanvasClick, false);
	},
	/**
	 * 
	 */
	onPolygonKeyPress: function(e) {
		if (e.keyCode == 27) { 
			sceneview.onPolygonDblClick(e);
			var poly = sceneview.model.get("regionsPoly").last();
			poly.get("view").remove();
		}   // esc
	},
	/**
	 * 
	 */
	drawPolygons: function(pxlCallback) {

		var ctx = sceneview.model.get("vp").get("ctx");
        ctx.clearRect ( 0 , 0 , $("#canvascont").width() , $("#canvascont").height() );
              
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";  		
        ctx.lineWidth = 2.0;
		
		sceneview.model.get("regionsPoly").each(function(poly) {
			var points = poly.get("points");
			if (points.length > 0) {
				ctx.fillStyle = "rgba("+colorsrgb[sceneview.model.get("regionsPoly").indexOf(poly)%10]+",0.2)";
				ctx.strokeStyle = "rgb("+colorsrgb[sceneview.model.get("regionsPoly").indexOf(poly)%10]+")"; 

			}
			else {
				ctx.fillStyle = "rgba(0,0,0,0.2)";  
				ctx.strokeStyle = "rgb(0,0,0)"; 				
			}
			
	        ctx.beginPath();          
	        for (var i = 0; i<points.length; i++) {
	        	var xnew = Math.round(sceneview.model.get("vp").mmInPixel(points[i].xMM));
	        	var ynew = Math.round(sceneview.model.get("vp").mmInPixel(points[i].yMM));
	            if (i==0) {
	               ctx.moveTo(xnew,ynew); 
	            }
	            else {
	                ctx.lineTo(xnew,ynew);
	            }
	        }
	        
	        //ctx.closePath();

	        ctx.stroke();  

	        ctx.fill();

	        if (pxlCallback != undefined) {
	        	if (ctx.isPointInPath(pxlCallback.x, pxlCallback.y)) {
	        		sceneview.startPolygonDrag(poly, pxlCallback);
	        	}
	        }	        
	        
		});
	},
	/**
	 * 
	 */
	startPolygonDrag: function (poly, clickPos) {
		var p = poly;
		var c = clickPos;
		
		var onMouseMoveFunc = { handleEvent: function(e) {
	        a = {
	                x:e.pageX,
	                y:e.pageY        
	        };
	        var offsetx = a.x - c.x;
	        var offsety = a.y - c.y;
	        
	        
	        var points = poly.get("points");
	        points.pop();
	        for (var i = 0; i<points.length; i++) {
	        	points[i].x = points[i].x+offsetx;
	        	points[i].y = points[i].y+offsety;
	        	points[i].xMM = Math.round(sceneview.model.get("vp").pixelInMM(points[i].x+offsetx)),
	        	points[i].yMM = Math.round(sceneview.model.get("vp").pixelInMM(points[i].y+offsety))
	        }
	        points.push(points[0]);
	        

	       
	        p.get("view").render();
	        
	        sceneview.drawPolygons();
	        c = a;	        
	        
		}};
		
		var onMouseReleaseFunc = {handleEvent: function(e) {
	        sceneview.model.get("vp").get("canvas").removeEventListener("mousemove", onMouseMoveFunc.handleEvent, false);
	        sceneview.model.get("vp").get("canvas").removeEventListener("mouseup", onMouseReleaseFunc.handleEvent,false);
	        
	        p.get("view").render();
	        p.sendRegion();

		}};
		
		sceneview.model.get("vp").get("canvas").addEventListener("mousemove", onMouseMoveFunc.handleEvent, false);
		
		sceneview.model.get("vp").get("canvas").addEventListener("mouseup", onMouseReleaseFunc.handleEvent, false);		
	},
	/**
	 * 
	 */
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
	},
	/**
	 * 
	 */	
	updateRegion: function(regionjson) {
		if (regionjson.points == undefined) {
			var region = sceneview.model.get("regions").getRegionByName(regionjson.name);
			
			if (region != null) {
				region.set({
					posX: regionjson.posX,
					posY: regionjson.posY,
					width: regionjson.width,
					height: regionjson.height
				});	
			}
		}
		else {
			var region = sceneview.model.get("regionsPoly").getRegionByName(regionjson.name);
			
			if (region != null) {
				region.set({
					points: regionjson.points
				});	
			}			
		}
		
		/*var ac = new ActionCollection();
		for (i in regionjson.actions) {
			var a = new Action({
				regionmodel: region,
				scenemodel: sceneview.model,				
				event: regionjson.actions[i].event,
				action: regionjson.actions[i].action
			});
			
			ac.add(a);
		}		
		
		region.set({
			actions: ac
		});*/
	
	},
	/**
	 * 
	 */	
	removeRegion: function(key) {
		var region = sceneview.model.get("regions").getRegionByName(key);
		if (region == null) {
			region = sceneview.model.get("regionsPoly").getRegionByName(key);
		}		

		if (region != null) {
			region.get("navview").remove();
		}

	},
	/**
	 * 
	 */
	onNewRegion: function(region) {
		var r = sceneview.model.get("regions").getRegionByName(region.name);
		var r2 = sceneview.model.get("regionsPoly").getRegionByName(region.name);
		if (r != null || r2 != null) {
			return;
		}			
		//alert(JSON.stringify(region));
		
		if (region.points == undefined) {
			var regionmoodel = new Region({
				name: region.name,
				posX: region.posX,
				posY: region.posY,
				width: region.width,
				height: region.height,
				scenemodel: sceneview.model
			});
			
			/*for (i in region.actions) {
				var a = new Action({
					event: region.actions[i].event,
					action: region.actions[i].action					
				}); 
				regionmoodel.get("actions").add(a);
			}*/	

			
			sceneview.addRegion(regionmoodel, false);
		}
		else {
			var regionmoodel = new RegionPolygon({
				name: region.name,
				scenemodel: sceneview.model
				
			});		
			regionmoodel.set({
				points: region.points
			});
			/*for (i in region.actions) {
				var a = new Action({
					event: region.actions[i].event,
					action: region.actions[i].action					
				}); 
				regionmoodel.get("actions").add(a);
			}	*/			
			sceneview.addRegionPolygon(null, regionmoodel);
		}		
	},
	onNewKinect: function(kinectjson) {
		
	},
	/**
	 * 
	 */
	onRegionsLoaded: function(regions) {
		for (var i = 0; i<regions.length; i++) {
			var region = regions[i];
			sceneview.onNewRegion(region);						
		}
	},
	/**
	 * 
	 */
	onActionsLoaded: function(actions) {
		sceneview.model.set({
			availableActions: actions
		});
	},	
  addCommand: function(e) {
    $(".action_dialog").remove();
    var model = new Command({});

    var view = new CommandView({
	    model: model
    });	    
    
    view.firstRender();
    model.set({
      view: view
    });   

    sceneview.model.get("commands").add(model);       
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
		$(this.el).css("-moz-transform", "rotate("+this.model.get("angle")+"deg)");
		coords = { 
			top: Math.round(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("offsetBoundingY"))), 
			left: Math.round(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("offsetBoundingX")))
		};

		$(this.el).offset(coords);
		

		
	
		return this;
	},
	firstRender: function() {
		this.el = ich.kinectdevtmpl(this.model.toJSON());

		var self = this;
		$(this.el).draggable({
			drag: function() { 
				self.model.set({
					offsetImgX: Math.round(self.model.get("scenemodel").get("vp").pixelInMM(self.$(".kinImgSrc1").offset().left)),
					offsetImgY: Math.round(self.model.get("scenemodel").get("vp").pixelInMM(self.$(".kinImgSrc1").offset().top)),
					offsetImg2X: Math.round(self.model.get("scenemodel").get("vp").pixelInMM(self.$(".kinImgSrc2").offset().left)),
					offsetImg2Y: Math.round(self.model.get("scenemodel").get("vp").pixelInMM(self.$(".kinImgSrc2").offset().top)),
				});
			},
			stop: function() {
				self.model.sendKinect();
			}
		});		
		$(this.el).css("position", "absolute");

		
		this.model.sendKinect();
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
		"keyup .ang": "onAngleChange",
		"click .kinectRemoveLnk": "remove"
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		this.$(".offx").html(this.model.get("offsetImgX"));
		this.$(".offy").html(this.model.get("offsetImgY"));
		this.$(".ang").val(this.model.get("angle"));
		return this;
	},
	firstRender: function() {
		$(this.el).html(ich.kinectnavtmpl(this.model.toJSON()));
		
		var self = this;
		this.$(".slider").slider({
			value:0,
			min: 0,
			max: 360,
			step: 5,
			slide: function( event, ui ) {
				self.model.set({
					angle: ui.value,
					offsetImgX: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($("#kinimg1_"+self.model.get("htmlId")).offset().left)),
					offsetImgY: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($("#kinimg1_"+self.model.get("htmlId")).offset().top))					
				});
				
			},
			stop: function(event, ui) {
				self.model.set({
					angle: ui.value,
					offsetImgX: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($("#kinimg1_"+self.model.get("htmlId")).offset().left)),
					offsetImgY: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($("#kinimg1_"+self.model.get("htmlId")).offset().top))					
				});				
				self.model.sendKinect();
			}
			
		});	
		
		this.model.get("scenemodel").get("serversocket").on('message', function(data){
			var msg = JSON.parse(data);
			var event = msg.event;
			switch(event) {
			case 'updateKinect':				
				self.onUpdateKinect(self, msg.kinect);
				break; 
			case 'removedKinect':
				self.onRemoveKinect(self, msg.key);
				break; 
			default:
				break;
			}
		});			

		return this;
	},
	onUpdateKinect: function(self, kinjson) {
		self.model.set({
			angle: kinjson.angle,
			offsetImgX: kinjson.x,
			offsetImgY: kinjson.y,
			offsetBoundingX: kinjson.xb,
			offsetBoundingY: kinjson.yb
		});
	},
	onRemoveKinect: function(self, key) {
		alert(this);
	},	
	onAngleChange: function() {
		var value = parseInt(this.$(".ang").val());
		if (isNaN(value) || value < 0) {
			value = 0;
		}
		if (value > 360) {
			value = 360;
		}
		this.model.set({
			angle: value
		});		
		this.$(".slider").slider( "option", "value", value );
		this.model.sendKinect();
		
	},
	remove: function() {
		this.model.sendRemove();
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
		this.moveRegion();
		this.resizeRegion();
			
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
        inAction = true;
        //$("#test").append($(self.el).width()+ "<br />");
				self.model.set({
					width: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($(self.el).width())),
					height: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($(self.el).height()))
				});

			},
			stop: function() {
        inAction = false;
				self.model.sendRegion();
			}		  
		});		
		
		$(this.el).css("position", "absolute");
	},
	resizeRegion: function() {  

		$(this.el).css("width", Math.round(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("width")))+ "px");
		$(this.el).css("height", Math.round(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("height"))) + "px");
	},
	moveRegion: function() {
		$(this.el).css("top", Math.round(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY"))) + "px");
		$(this.el).css("left", Math.round(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posX"))) + "px");
	}
});

var RegionNavView = Backbone.View.extend({
	events: {
		"click .boxRemoveLnk": "remove",
    "change .lcInput": "onChangeName"
		//"click .regionAddAction": "addAction"
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() { 
		this.$(".lcInfos").html($(ich.regionnavtmpl(this.model.toJSON())).find(".lcInfos").html());

		//this.$(".regionActions").html("");	
		var self = this;
		/*this.model.get("actions").each(function(a) {
			self.addAction(null, a);
		});*/		
		
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
	loadActionsFromModel: function() {
		this.$(".regionActions").html("");
		this.model.get("actions").each(function(action) {
			
		});
	},
  onChangeName: function(e) {
    this.model.set({
      name: this.$(".lcInput").val()
    });
    this.model.sendRegion();
  }
	/*addAction: function(evt, m) {
		var actionmodel = null;
		if ( m == undefined) {
			actionmodel = new Action({
				regionmodel: this.model,
				scenemodel: this.model.get("scenemodel")
			});
		}
		else {
			actionmodel = m;
			actionmodel.set({
				regionmodel: this.model,
				scenemodel: this.model.get("scenemodel")
			});
		}


		actionview = new ActionView({
			model: actionmodel		  				  
		});	
		actionview.firstRender();
		this.$(".regionActions").append(actionview.el);		  		   
		
		if (m == undefined) {
			this.model.get("actions").add(actionmodel);		
		}
		//alert(JSON.stringify(this.model.get("actions")));
	}*/
});

var RegionPolyNavView = Backbone.View.extend({
	events: {
		"click .boxPolyRemoveLnk": "remove",
		//"click .regionAddAction": "addAction",
		"click .vertpointnav": "editVertices",
		"change .inputpolynavpoint": "onChangeVerticle",
		"click .cancelEditVert": "render",
    "change .lcInput": "onChangeName"
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
				pointstr += "(<span class=\"vertpointnav\">"+points[i].xMM+","+points[i].yMM+"</span>)";
			}
			else {
				pointstr += "(<span class=\"vertpointnav\">"+points[i].xMM+","+points[i].yMM+"</span>), ";
			}
		}
		
		this.$(".vert").html(pointstr);
		
		//this.$(".regionActions").html("");	
		var self = this;
		/*this.model.get("actions").each(function(a) {
			self.addAction(null, a);
		});*/			
		
		sceneview.drawPolygons();

		return this;
	},
  onChangeName: function(e) {
    this.model.set({
      name: this.$(".lcInput").val()
    });
    this.model.sendRegion();
  },
	editVertices: function() {
		var points = this.model.get("points");
		
		this.$(".vert").html("");
		for (var i = 0; i<points.length;  i++) {
			pointinput = ich.polygonvectinputstmpl(points[i]);
			this.$(".vert").append(pointinput);
			if (i == points.length-1) {
				this.$(".vert").append(' <a href="#cancelEditVert" class="cancelEditVert">cancel</a>');
				
			}
			else {
				this.$(".vert").append(", ");
			}
		}
		
	},
	onChangeVerticle: function() {
		var points = new Array();
		var self = this;
		this.$(".inputpolynavpointX").each(function(idx, el){
			point = {
				xMM: $(this).val(),
				yMM: $(self.$(".inputpolynavpointY")[idx]).val(),
				x: Math.round(self.model.get("scenemodel").get("vp").mmInPixel($(this).val())),
				y: Math.round(self.model.get("scenemodel").get("vp").mmInPixel($(self.$(".inputpolynavpointY")[idx]).val()))
			};
			points.push(point);
			

		});
		
		points.pop();
		points.push(points[0]);
		this.model.set({
			points: points
		});
		this.drawIcon();
	},
	firstRender: function() {
		$(this.el).html(ich.regionpolynavtmpl(this.model.toJSON()));
		this.render();
		this.drawIcon();
	
		return this;
	},
	drawIcon: function() {
        var x1 = 100000;
        var x2 = -1;
        var y1 = 100000;
        var y2 = -1
        
        var p2 = this.model.get("points");
        for (var i = 0; i<p2.length; i++) {
            if (p2[i].x < x1) {
                x1 = p2[i].x;
            }
            if (p2[i].x > x2) {
                x2 = p2[i].x;
            }
            if (p2[i].y < y1) {
                y1 = p2[i].y;
            }
            if (p2[i].y > y2) {
                y2 = p2[i].y;
            }                                   
        }
        
        var width = x2-x1;
        var height = y2-y1;
        
        var maxwidth = 50;
        var maxheight = 50;
        
        var widthscal = maxwidth / width;
        var heightscal = maxheight / height;
        
        var canvas = this.$(".polyiconcanvas")[0];
        var ctx = canvas.getContext("2d");
        
        ctx.clearRect ( 0 , 0 , 50 , 50 );
              
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";  		
        ctx.lineWidth = 1.0;        
        
        var points = p2;
		if (points.length > 0) {
			ctx.fillStyle = "rgba("+colorsrgb[sceneview.model.get("regionsPoly").indexOf(this.model)%10]+",0.2)";
			ctx.strokeStyle = "rgb("+colorsrgb[sceneview.model.get("regionsPoly").indexOf(this.model)%10]+")"; 

		}
		else {
			ctx.fillStyle = "rgba(0,0,0,0.2)";  
			ctx.strokeStyle = "rgb(0,0,0)"; 				
		}
        ctx.beginPath();
  
        for (var i = 0; i<points.length; i++) {
            var xnew = Math.round((points[i].x -x1) * widthscal);    
            
            var ynew = Math.round((points[i].y-y1) * heightscal);     
            if (i==0) {
               ctx.moveTo(xnew,ynew); 
            }
            else {
                ctx.lineTo(xnew,ynew);
            }
        }
        
        ctx.stroke();  

        ctx.fill();        
	},
	remove: function() {
		
		this.model.get("scenemodel").get("regionsPoly").remove(this.model);	
		$(this.el).remove();
		
		sceneview.drawPolygons();
		this.model.sendRemove();
		
	}/*,
	addAction: function(evt, m) {
		var actionmodel = null;
		if ( m == undefined) {
			actionmodel = new Action({
				regionmodel: this.model,
				scenemodel: this.model.get("scenemodel")
			});
		}
		else {
			actionmodel = m;
			actionmodel.set({
				regionmodel: this.model,
				scenemodel: this.model.get("scenemodel")
			});
		}


		actionview = new ActionView({
			model: actionmodel		  				  
		});	
		actionview.firstRender();
		this.$(".regionActions").append(actionview.el);		  		   
		
		if (m == undefined) {
			this.model.get("actions").add(actionmodel);		
		}
		//alert(JSON.stringify(this.model.get("actions")));
	}*/
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
		
		for (var i=0; i<this.model.get("scenemodel").get("availableActions").length; i++) {
			var a = this.model.get("scenemodel").get("availableActions")[i];
			
			this.$(".regionActionAction").append(ich.actionoptionstmpl(a));
		}
		this.$(".regionActionEvent").val(this.model.get("event"));
		this.$(".regionActionAction").val(this.model.get("action"));

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
		
		this.$(".user").css("top", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY")));
		this.$(".user").css("left", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posX")));		

		$("#bubble_"+this.model.get("htmlId")).css("left", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posX"))-55);
		$("#bubble_"+this.model.get("htmlId")).css("top", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY"))-65);
						
		
		return this;
	},
	firstRender: function() {
		$(this.el).html(ich.userdevtmpl(this.model.toJSON()));	

		$("#bubbles").append(ich.userbubbletmpl(this.model.toJSON()));
		
		$("#bubble_"+this.model.get("htmlId")).css("left", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posX"))-55);
		$("#bubble_"+this.model.get("htmlId")).css("top", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY"))-65);
		
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
				break;
			case 'userOut':
				self.userOutRegion(msg.user, msg.region);
				break;	
			case 'triggeredAction':
				//alert(JSON.stringify(msg));
				self.actionTriggered(msg.user, msg.action);
				break;
			default:
				break;
			}
		});		  

		return this;
	},	
	showBubble: function(txt) {
		$("#bubble_"+this.model.get("htmlId")).html(txt);
		$("#bubble_"+this.model.get("htmlId")).show();
		$("#bubble_"+this.model.get("htmlId")).fadeOut(2000, function() {});  		
	},
	actionTriggered: function(user, action) {
		if (user.id != this.model.get("userid")) {
			return;
		}
		
		this.showBubble("I triggered a action!");
	},
	updateUser: function(key, user) {
		if (user.id != this.model.get("userid")) {
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
		this.showBubble("I entered a region!");

	},
	userOutRegion: function(user, region) {
		if (user.id != this.model.get("userid")) {
			return;
		}		
		this.showBubble("I leaved a region!");

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
		this.$(".lcUserColor").css("background-color", colors[this.model.get("userid")%10]);
		return this;
	},
	firstRender: function() {
		this.render();
		this.$(".lcUserColor").css("background-color", colors[this.model.get("userid")%10]);

		return this;
	}
});

var CommandNavView = Backbone.View.extend({
	events: {
    "click .editCommandLnk": "editCommand",
    "click .delCommandLnk": "delCommand",
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		$(this.el).html(ich.commandnavtmpl(this.model.toJSON()));

    var condString = "";
    this.model.get("conditions").each(function(value) {
      condString += value.get("name") + ", ";
    });

    var actString = "";
    this.model.get("actions").each(function(value) {
      actString += value.get("name") + ", ";
    });

    this.$(".comNavCond").html(condString);
    this.$(".actNavCond").html(actString);

		return this;
	},
	firstRender: function() {
		this.render();		
    $("#commandListCtrl").append(this.el);
		return this;
	},
  editCommand: function() {

    this.delCommand();

    var view = new CommandView({
	    model: this.model
    });	    
    
    view.firstRender();
    this.model.set({
      view: view
    });   

    sceneview.model.get("commands").add(this.model);      


  },
  delCommand: function() {
    sceneview.model.get("commands").remove(this.model);
    $(this.el).remove();
  }

});

var ConditionActionView = Backbone.View.extend({
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
    var self = this;

    this.el = ich.conditionTmpl(this.model.toJSON());

    $.each(this.model.get("options"), function(index, option) { 
      var configEl =  ich.conditionConfigRowTmpl(option);
      

      if (option.type == "checkbox") {
        var checkbox = '<select class="actionEntryNameValue">';          

        // Get Data
        if (option.getValuesFrom == "regionNames") {
          var names = getRegionNames();
          $.each(names, function(index, name) {
            var nameEl = "<option>"+name+"</option>";
            checkbox += nameEl;
            
          });
        } 
        else {
          $.each(option.values, function(index, value) {
            var nameEl = "<option>"+value+"</option>";
            checkbox += nameEl;
          });
        }
        checkbox += "</select>"
        $(configEl).find(".actionEntryFormValue").eq(0).append(checkbox); 
      }
      else if (option.type = "slider") {
        $(configEl).find(".actionEntryFormRow").addClass("sliderRow");
        var slider = '<div class="slider2"></div><span class="slider_value">0</span>';
        $(configEl).find(".actionEntryFormValue").eq(0).append(slider); 
        $(configEl).find(".slider2").slider({
	        value:0,
	        min: option.values[0],
	        max: option.values[1],
	        step: option.values[2],
	        slide: function( event, ui ) {
            $(this).next().text(ui.value);
            $(".user_direction_img2").css("-webkit-transform", "rotate("+ui.value+"deg)");
		        $(".user_direction_img2").css("-moz-transform", "rotate("+ui.value+"deg)");
	        },
	        stop: function(event, ui) {

	        }
		
        });

      }

      self.$(".actionEntryConfigTxt").append(configEl);

      
    });

    var insertEl = null;  
    if (this.model.get("type") == "condition") {
      insertEl = "#avtabs";
    }
    else {
      insertEl = "#tabs";
    }
    $(insertEl).find("li").each(function(index, value) { 
      if (self.model.get("category") == $(value).children().first().text()) {
        id = $(value).children().first().attr("href");

        // Wenns eine action ist und es eine subcategory gibt, dann dahinter einfügen
        if (self.model.get("type") == "action" && self.model.get("subCategory") != undefined ) {
          $(".actionSubCategory"+self.model.get("subCategory"), $(".sliderCtrlContentContainer", id)).after(self.el);
        }
        else {      
          $(".sliderCtrlContentContainer", id).prepend(self.el);
        }
      }
    });

    // TODO wieder raus
    //$(".sliderCtrlContentContainer").prepend(self.el);

    $(this.el).bind('selectAction', function() {
      self.model.set({
        selected: true        
      });
    });
    $(this.el).bind('deselectAction', function() {
      self.model.set({
        selected: false        
      });
    });

    this.dblclickEvent();

    this.dragEvent();

    return this;
	},
  dblclickEvent: function() {
    var self = this;
    $(this.el).dblclick(      
      function () {
        $(".actionEntry").each(function(index, value) {
          if ($(value).width() > 64) {
            $(value).animate({
                width: '64'
              }, 150, function() {
            });
          }
        })
        $(".actionEntry").height(64);

        if ($(self.el).width() == 64) {
          $(self.el).animate({
            width: '250'
          }, 150, function() {
            self.$(".actionEntryConfigTxt").show();
          });
        }
        else {
          self.$(".actionEntryConfigTxt").hide();
          $(self.el).animate({
            width: '64'
          }, 150, function() {           
          });
        }
      }
    );
    $(this.el).mousewheel(function() {
      $(self.el).trigger("dblclick");
    });

  },
  dragEvent: function() {
    var self = this;
    var insertEl = null;  
    var type = null;
    var tabcontent = null;
    if (this.model.get("type") == "condition") {
      insertEl = "avtabs";
      type = "conditions";
      tabcontent = ".tabcontent";
    }
    else {
      insertEl = "tabs";
      type = "actions"
      tabcontent = ".actions_tabcontent";
    }
    $(this.el).draggable({ 
      revert: true, 
      drag: function(event, ui) {
        $(this).css("position", "absolute");
        if ($(self.el).parent().parent().parent().parent().attr("id") == insertEl) {
          $(".selected_"+type).addClass("selected_"+type+"_hover");
        }
        else {

          $(tabcontent).css("background-color", "#efefef");
        }
      },
      stop: function(event, ui) {
        $(this).css("position", "inherit");
        $(".selected_"+type).removeClass("selected_"+type+"_hover");
        $(tabcontent).css("background-color", "#fff");
      }
    });
  }
});

var CommandView = Backbone.View.extend({
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
    var self = this;

    this.el = ich.commandDialogTmpl(this.model.toJSON());
    $("#b").append(this.el);

	  this.$( ".selected_conditions" ).droppable({
      accept: ".actionEntry",
		  drop: function( event, ui ) {
			    $(".selected_conditions").append(ui.draggable[0]);
          ui.draggable.css("top", "0px");
          ui.draggable.css("left", "0px");
          ui.draggable.css("position", "inherit");
          ui.draggable.trigger("selectAction");
		  }
	  });  

	  this.$( ".selected_actions" ).droppable({
      accept: ".actionEntry",
		  drop: function( event, ui ) {
			    $(".selected_actions").append(ui.draggable[0]);
          ui.draggable.css("top", "0px");
          ui.draggable.css("left", "0px");
          ui.draggable.css("position", "inherit");
          ui.draggable.trigger("selectAction");
		  }
	  }); 

	  this.$(".sliderCtrlContentContainer", $( ".tabcontent, .actions_tabcontent" )).droppable({
      accept: ".actionEntry",
		  drop: function( event, ui ) {
			    $(this).prepend(ui.draggable[0]);
          ui.draggable.css("top", "0px");
          ui.draggable.css("left", "0px");
          ui.draggable.css("position", "inherit");
          ui.draggable.trigger("deselectAction");
		  }
	  }); 
    

    var conditionModels = this.getConditionsAndActions();

    cac = new ConditionActionCollection();
    $.each(conditionModels, function(index, model) {

		  var view = new ConditionActionView({
			  model: model
		  });	    

      view.firstRender();

      model.set({
        view: view
      }); 

      cac.add(model);
      
    });


    $( "#avtabs" ).tabs();
    $( "#tabs" ).tabs();

    $(".sliderCtrl").each(function(index, slideCtrl) {
      var actionCount = $(".actionEntry",slideCtrl).length;
      if (actionCount > 3) {
        $(".horizontalSlider", $(slideCtrl).next()).slider({
          min: 0,
          max: 75*actionCount+150,
          slide: function(event, ui) { 
            $(".sliderCtrlContentContainer", $(this).parent().parent()).css("margin-left", -1*ui.value + "px");
          }  
        });
      }
    });

    this.$(".addCommandBtn").click(function(e) {
      var conditionCollection = new ConditionActionCollection();
      var actionCollection = new ConditionActionCollection();
      
      cac.each(function( value) {
        if (value.get("selected") === true) {
          if (value.get("type") == "condition") {
            conditionCollection.add(value);
          }
          else {
            actionCollection.add(value);
          }
        } 
      });
      if (conditionCollection.length == 0) {
        alert("Select at least one condition");
        return;
      }
      else if (actionCollection.length == 0) {
        alert("Select at least one action");
        return;
      }
      else if (self.$(".commandNameInput").val() == "") {
        alert("Enter a command name");
        return;
      }

      self.model.set({
        name: self.$(".commandNameInput").val(),
        conditions: conditionCollection,
        actions: actionCollection
      });
      cmdNavView = new CommandNavView({
			  model: self.model
		  });	
		  cmdNavView.firstRender();

      $(".action_dialog").remove();
    });

    $(this.el).hover(function() {
      $("#navigation").css("opacity", 1);
    }, 
    function() {
      $("#navigation").css("opacity", 0.6);
    });

    var dialogPosition = null;
    if ($("#navigation").css("right") == "0px") {
      // nav is right
      dialogPosition = [$("body")[0].offsetWidth-$("#navigation").width()-500-7,0];
    }
    else {
      // nav is left
      dialogPosition = [0+$("#navigation").width(),0];
    }
    $(this.el).dialog({
      height: $("body")[0].offsetHeight,
      width: "500px",
      position: dialogPosition,
      resizable: false,
      draggable: false,
      close: function(event, ui) {
        $(".action_dialog").remove();
      }
    });

    // Wenn schon Bedingungen oder Aktionen da sind, diese laden
    if (this.model.get("conditions") != undefined) {
      this.model.get("conditions").each(function(value) {
        $(".selected_conditions").prepend($(".actionCondi"+value.get("name")));
        $(".actionCondi"+value.get("name")).trigger("selectAction");
      });
    }

    if (this.model.get("actions") != undefined) {
      this.model.get("actions").each(function(value) {
        $(".selected_actions").prepend($(".actionCondi"+value.get("name")));
        $(".actionCondi"+value.get("name")).trigger("selectAction");
      });
    }
    

    
    return this;
	},

  getConditionsAndActions: function() {
    var conditionModels = [

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
                      getValuesFrom: "regionNames"  
                   }
                 ]        
      }),

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
                      getValuesFrom: "regionNames"  
                   }
                 ]        
      }),

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
                      getValuesFrom: "regionNames"  
                   }
                 ]        
      }),

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
                      values: ["Andree", "Tobi", "Jelle"]  
                   }
                 ]      
      }),
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
                      values: [0,360,5]
                   },
                   {
                      name: "To",
                      type: "slider",
                      values: [0,360,5]
                   }
                 ]        
      }),
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
                      values: ["0:00", "1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "0:00"]  
                   },
                   {
                      name: "To",
                      type: "checkbox",                            
                      values: ["0:00", "1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "0:00"]  
                   }
                 ]      
      }),



		  new ConditionAction({
        name: "clickGesture",
        type: "condition",
        displayName: "User made a click gesture",
        category: "Gestures",
        icon: "img/actionicons/gesture_click_icon.png",
        options: [ 
                 ]        
      }),

		  new ConditionAction({
        name: "waveGesture",
        type: "condition",
        displayName: "User made a wave gesture",
        category: "Gestures",
        icon: "img/actionicons/gesture_wave_icon.png",
        options: [ 
                 ]        
      }),

      //Actions


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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),

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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),
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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),
		  new ConditionAction({
        name: "livingDoor1",
        type: "action",
        displayName: "Door left",
        category: "Baall",
        subCategory: "Living",
        icon: "img/actionicons/door_icon.png",
        options: [ 
                   {
                      name: "Status",
                      type: "checkbox",                            
                      values: ["Open", "Close"]  
                   }
                 ]        
      }),

		  new ConditionAction({
        name: "livingDoor2",
        type: "action",
        displayName: "Door right",
        category: "Baall",
        subCategory: "Living",
        icon: "img/actionicons/door_icon.png",
        options: [ 
                   {
                      name: "Status",
                      type: "checkbox",                            
                      values: ["Open", "Close"]  
                   }
                 ]        
      }),

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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),

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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),
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
                      values: [0,100,10]
                   }
                 ]        
      }),

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
                      values: [0,100,10]
                   }
                 ]        
      }),
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
                      values: [0,100,10]
                   }
                 ]        
      }),

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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),

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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),


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
                      values: [0,100,1]
                   }
                 ]        
      }),

		  new ConditionAction({
        name: "bathDoor",
        type: "action",
        displayName: "Door",
        category: "Baall",
        subCategory: "Bath",
        icon: "img/actionicons/bigdoor_icon.png",
        options: [ 
                   {
                      name: "Status",
                      type: "checkbox",                            
                      values: ["Open", "Close"]  
                   }
                 ]        
      }),

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
                      values: [0,10,1]
                   },
                   {
                      name: "Foot",
                      type: "slider",
                      values: [0,10,1]
                   }
                 ]        
      }),

		  new ConditionAction({
        name: "bedroomDoor1",
        type: "action",
        displayName: "Door left",
        category: "Baall",
        subCategory: "Bed",
        icon: "img/actionicons/door_icon.png",
        options: [ 
                   {
                      name: "Status",
                      type: "checkbox",                            
                      values: ["Open", "Close"]  
                   }
                 ]        
      }),

		  new ConditionAction({
        name: "bedroomDoor2",
        type: "action",
        displayName: "Door right",
        category: "Baall",
        subCategory: "Bed",
        icon: "img/actionicons/door_icon.png",
        options: [ 
                   {
                      name: "Status",
                      type: "checkbox",                            
                      values: ["Open", "Close"]  
                   }
                 ]        
      }),
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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),

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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),

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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),

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
                      values: ["On", "Off"]  
                   }
                 ]        
      }),

		  new ConditionAction({
        name: "digitalScene1",
        type: "action",
        displayName: "Scene 1",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene1.png",
        options: [ 

                 ]        
      }),

		  new ConditionAction({
        name: "digitalScene2",
        type: "action",
        displayName: "Scene 2",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene2.png",
        options: [ 

                 ]        
      }),

		  new ConditionAction({
        name: "digitalScene3",
        type: "action",
        displayName: "Scene 3",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene3.png",
        options: [ 

                 ]        
      }),

		  new ConditionAction({
        name: "digitalScene4",
        type: "action",
        displayName: "Scene 4",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene4.png",
        options: [ 

                 ]        
      }),

		  new ConditionAction({
        name: "digitalScene5",
        type: "action",
        displayName: "Scene 5",
        category: "DigitalSTROM",
        icon: "img/actionicons/digitalstrom_scene5.png",
        options: [ 

                 ]        
      }),

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
                      values: ["Wohnzimmer", "Multimedia", "Lights"]  
                   }
                 ]        
      }),

	
    ]; 
    return conditionModels;   
  }
});
