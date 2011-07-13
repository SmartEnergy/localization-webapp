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
				self.model.sendRegionUpdate();				
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
				self.model.sendRegionUpdate();
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
    this.model.sendRegionUpdate();
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
    this.model.sendRegionUpdate();
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
