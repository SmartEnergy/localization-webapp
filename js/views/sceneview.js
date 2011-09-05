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


        if(isMobile()) {            
            onStartTweaks();
        }   


        sceneview.loadDevices();

        $("#goLoadScene").click(function(e) {
            alert("wird das noch genutzt?!");
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
    "click #navigationOptions":     "navHeadClick",		
		"change .navconfiginput": 	"changeSceneConfig",
		"click .reconnectlink":     "reconnect",
		"click .addKinectLnk":      "addKinect",
    "click .addCommandLnk":     "addCommand",
		"click .addRegionLnk":      "addDefaultRegion",
		"click .addRegionPolyLnk":  "addRegionPolygon",
		//"click .navLeftLnk":      "navMoveLeft",
		//"click .navRightLnk":     "navMoveRight",
		"click .hideKinectLnk":     "hideKinects",
		"click .showKinectLnk":     "showKinects",
	 "change #navroomWidthMM":    "onRoomSizeChange",
		"change #navroomHeightMM":  "onRoomSizeChange",
		"change #showDeviceCheckbox": "showHideDevices"

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
		$(".listCtrl").height($("body")[0].offsetHeight-230);
		$("#navigationContent").height($("body")[0].offsetHeight-20);
		$("#accordion").accordion( "resize" );	
		
		// Update Device Positions
		$(".deviceImg").trigger("windowResize");    		
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
		//$(".navleft").show();
		//$(".navright").hide();	
		
	},
	navMoveLeft: function() {
		$("#navigation").css("left","0px");
		$("#navigation").css("right","auto");
    $("#navigation").css("box-shadow","3px 2px 5px #aaa");

		// Show move right icon
		//$(".navright").show();
		//$(".navleft").hide();
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
		  $("h2", "#navigation").hide();
		  $("#navigation").removeClass("navigation_closed")
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
        $("#navigationOptions").show();
        if (isMobile()) {
          $("#navigationOptions").css("right", "0px");
          $("#navigationOptions").css("z-index", "101");
        }
        else {
          $("#navigationOptions").animate(
            {
              right: '297px'
            }, 
            500, 
            function() {
              $("#navigationOptions").css("z-index", "101");
            }
          );            
        }			
			});
			this.nav_opened = true;        
			

			
			
			if (isMobile()) {
			    $("#navigation").css("width", "100%");	    
			}
		}			
		else {
		  $("#navigationOptions").css("z-index", "0");
						
      $("#navigationOptions").fadeOut( 
        250, 
        function() {
          $("#navigationOptions").css("right", "250px");              
          $("#navigationContent").hide();          
          $("#navigationOptions").hide();
          $('#navigation').animate({
            height: '35'
          }, 500, function() {
            // Animation complete.
              if (isMobile()) {
                  $('#navigation').css("width", "60px");  
                  $('#navigation').css("height", "30px"); 
              } 
              $("#navigation").addClass("navigation_closed")  
              $("h2", "#navigation").show();  
          });           
        }
      );			
			

			this.nav_opened = false;

		
		}	
		
		//$("#navigation").css("width", "100%");	  
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
	  this.model.set({
		  serversocket: io.connect("http://"+this.model.get("serverIp")+":"+this.model.get("port"))
	  });
	var self = this;

	// Register callbacks for changes of the connection status
	this.model.get("serversocket").on('connect', this.onconnected);
	this.model.get("serversocket").on('disconnect', this.ondisconnected);  
	this.model.get("serversocket").on('connect_failed', this.onconnectfail);	  		  

    this.model.get("serversocket").on('newRegion', function (region) { 
      self.onNewRegion(region);
    });
    this.model.get("serversocket").on('newUser', function (user) { 
      self.addUser(user.id, user);
    });
    this.model.get("serversocket").on('newKinect', function (kinect) { 
      self.onNewKinect(kinect);
    });
    this.model.get("serversocket").on('newCommand', function (command) { 
      self.onNewCommand(command);
    });


    this.model.get("serversocket").on('updateRegion', function (region) { 
      self.updateRegion(region);
    });
    this.model.get("serversocket").on('updateUser', function (user) { 
			
      // Wenn user noch nicht drin ist, neuer User
      if (sceneview.model.get("users").getByName(user.id) == null) {
        self.addUser(user.id, user);
      }

    });
    this.model.get("serversocket").on('updateKinect', function (kinect) { 
      self.updateKinect(kinect);
    });
    this.model.get("serversocket").on('updateCommand', function (command) { 

    });


    this.model.get("serversocket").on('removedRegion', function (key) { 
      self.removeRegion(key);
    });
    /*this.model.get("serversocket").on('removedUser', function (key) { 

    });*/
    this.model.get("serversocket").on('removedKinect', function (key) { 

    });
    this.model.get("serversocket").on('removedCommand', function (key) { 
      self.removeCommand(key);
    });

    this.model.get("serversocket").on('pushUi', function (uiname) { 
      self.onPushUI(uiname);
    });
	  	  
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
		//sceneview.model.get("serversocket").send(JSON.stringify({method: "loadActions"}));
    sceneview.model.get("serversocket").emit('getRegions', function(regions) { 
      sceneview.onRegionsLoaded(regions);
    });		

    sceneview.model.get("serversocket").emit('getKinects', function(kinects) { 
      sceneview.onKinectsLoaded(kinects);
    });	

    sceneview.model.get("serversocket").emit('getCommands', function(commands) { 
      sceneview.onCommandsLoaded(commands);
    });	
    //sceneview.model.get("serversocket").send(JSON.stringify({method: "loadRegions"}));		
		
    // TODO raus
    //$("#navigationHead").click();

		// Change favicon
		jQuery.favicon('img/favcon.png');



		
		// Send desktop notfication
		/*$.jwNotify({
			title: 'connection established',
			body: 'connection to server established',
			timeout: 3000
		});*/		
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
		/*$.jwNotify({
			title: 'connection lost',
			body: 'connection to server lost',
			timeout: 3000
		});*/			

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
		/*$.jwNotify({
			title: 'connection failed',
			body: 'failed to connect',
			timeout: 3000
		});*/			

	},
	/**
	 * Adds a new kinect to the scene
	 */
	addKinect: function(event, model) {


		// Create kinect model and view
	  var kinectmodel = new Kinect({
		  scenemodel: this.model
	  });

    if (model != undefined) {
      kinectmodel.set({
        name: model.id,
      	offsetImgX: model.x,
      	offsetImgY: model.y,
      	offsetBoundingX: model.xb,
      	offsetBoundingY: model.yb,
        angle: model.angle                  
      });
    }

    // TODO raus
    /*kinectmodel.set({
      offsetImgX: 3000,
      offsetImgY: 2000
    });*/

		kinectview = new KinectView({
			model: kinectmodel		  				  
		});
		
		// Initial rendering	
		kinectview.firstRender();
		
		// Add to DOM
		$("#kinects").append(kinectview.el);

		// Add view object to model
		kinectmodel.set({
			view: kinectview
		});

		// Create navigation view
		kinNavView = new KinectNavView({
			model: kinectmodel
		});	
		
		// Initial rendering of navigation view
		kinNavView.firstRender();
		
		// Add navigation view to DOM
		$("#kinectListCtrl").append(kinNavView.el);		

		// Resize and Replace the new Kinect according to the window size
		kinectview.resizeKinect();
		kinectview.moveKinect();		  

		// Add kinect model to kinect collection in the scene model 
		this.model.get("kinects").add(kinectmodel);
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
			displayName: "region_rect_" + this.model.get("regions").length,
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
				displayName: "region_poly_" + this.model.get("regionsPoly").length,
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
	        p.sendRegionUpdate();

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
  updateKinect: function(kinectFromServer) {
    console.log(kinectFromServer.id);
    var kinect = sceneview.model.get("kinects").getKinectByName(kinectFromServer.id);
    console.log(kinect);
    if (kinect != null) {
      kinect.set({
      	offsetImgX: kinectFromServer.x,
      	offsetImgY: kinectFromServer.y ,
      	offsetBoundingX: kinectFromServer.xb,
      	offsetBoundingY: kinectFromServer.yb,
      	angle: kinectFromServer.angle
      });
      console.log("Kinect geupdated");
    }
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
					height: regionjson.height,
					displayName: regionjson.displayName
				});	
			}
		}
		else {
			var region = sceneview.model.get("regionsPoly").getRegionByName(regionjson.name);
			
			if (region != null) {
				region.set({
					points: regionjson.points,
					displayName: regionjson.displayName
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
				displayName: region.displayName,
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
				displayName: region.displayName,
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
	onNewKinect: function(kinectFromServer) {
    if (sceneview.model.get("kinects").getKinectByName(kinectFromServer.id) == null) {
      sceneview.addKinect(null, kinectFromServer);
    }

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
	onKinectsLoaded: function(kinects) {
		for (var i = 0; i<kinects.length; i++) {
			var kinect = kinects[i];
			sceneview.onNewKinect(kinect);						
		}
	},
	onNewCommand: function(commandFromServer) {
    var model = new Command({
      name: commandFromServer.name,
      conditions: new ConditionActionCollection(),
      actions: new ConditionActionCollection()
    });
    
    avcondactions = getConditionsAndActions();

    $.each(commandFromServer.conditions, function(index, condition) {

      var c = avcondactions.getByName(condition.name);
      c.set({
        selected: true
      });
      
      $.each(c.get("options"), function(index, option) {
        option.value = condition.values[index];
      });

      model.get("conditions").add(c);

    });

    $.each(commandFromServer.actions, function(index, action) {

      var c = avcondactions.getByName(action.name);
      c.set({
        selected: true
      });
    
      $.each(c.get("options"), function(index, option) {
        option.value = action.values[index];
      });

      model.get("actions").add(c);

    });

    cmdNavView = new CommandNavView({
		  model: model
	  });	
	  cmdNavView.firstRender();     

    $(".action_dialog").remove();

    sceneview.model.get("commands").add(model);

	},
	onCommandsLoaded: function(commands) {
		for (var i = 0; i<commands.length; i++) {
			var command = commands[i];
			sceneview.onNewCommand(command);						
		}
	},
	removeCommand: function(key) {
		var command = sceneview.model.get("commands").getByName(key);

		if (command != null) {
			command.get("navview").delCommand();
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
  },

  onPushUI: function(uiname) {
      if ($("#pushUICheckbox").attr('checked') == "checked") {
          
           if (uiname == "Chillen") {
               var view = new ChillUiView({
                 model: new UiDevice({})
               });    
           }
           else if (uiname == "Living") {
               var view = new LivingUiView({
                 model: new UiDevice({})
               });   
           }
           else if (uiname == "Lights") {
               var view = new LightsUiView({
                 model: new UiDevice({})
               });   
           }
           else if (uiname == "TV") {
               var view = new TvUiView({
                 model: new UiDevice({})
               });   
           }
           else if (uiname == "Kitchen") {
               var view = new KitchenUiView({
                 model: new UiDevice({})
               });   
           }                     
            
            
            
            view.firstRender();
     }      
		
  },
  
  loadDevices: function() {
      var actions = getConditionsAndActions();
      actions.each(function(action) {
         if (action.get("type") == "action" && action.get("roomPosition") != undefined) {
             //var pos = action.get("roomPosition")
             view = new DeviceView({
                 model: action
             }); 
             
             view.firstRender();
         } 
      });
  },
  showHideDevices: function(e) {
    if ($("#showDeviceCheckbox").attr('checked') == "checked") {
      $(".deviceImg").fadeIn();
    }
    else {
      $(".deviceImg").fadeOut();
    }
  }
});


