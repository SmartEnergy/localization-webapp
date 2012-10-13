var KinectView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		var angle = this.model.get("angle") + 180;
		$(this.el).rotate(angle)
		
		this.moveKinect();
		
		return this;
	},
	firstRender: function() {
		this.el = ich.kinectdevtmpl(this.model.toJSON());

		var self = this;
		$(this.el).draggable({
			drag: function() { 
				self.model.set({
					offsetImgX: Math.round(self.model.get("scenemodel").get("vp").pixelInMM(self.$(".kinImgSrc1").offset().left)),
					offsetImgY: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($("#karte")[0].offsetHeight - self.$(".kinImgSrc1").offset().top)),
				});
			},
			stop: function() {
				self.model.sendKinect();
			}
		});		
		
		this.model.sendKinect();
	},
	resizeKinect: function() {
		this.$(".kinImgSrc2").css("width", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("widthLightMM")));
		this.$(".kinImgSrc1").css("width", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("widthDeviceMM")));
	},
	
	moveKinect: function() {
	  var self = this;
    setTimeout(function() {
      /*$("#dot1").offset({
        left: parseInt(self.model.get("scenemodel").get("vp").mmInPixel(self.model.get("offsetImgX"))),
        top: parseInt($("#karte")[0].offsetHeight  - self.model.get("scenemodel").get("vp").mmInPixel(self.model.get("offsetImgY")))
      });
      
      $("#dot2").offset({
        left: self.$(".kinImgSrc1").offset().left,
        top: self.$(".kinImgSrc1").offset().top
      });*/    
      
      var translateX = self.$(".kinImgSrc1").offset().left - self.model.get("scenemodel").get("vp").mmInPixel(self.model.get("offsetImgX"));
      var translateY = $("#karte")[0].offsetHeight - self.model.get("scenemodel").get("vp").mmInPixel(self.model.get("offsetImgY"));
      translateY = self.$(".kinImgSrc1").offset().top - translateY;

      var oldoffset = $(self.el).offset();     
      $(self.el).offset({
        left: oldoffset.left - translateX,
        top: oldoffset.top - translateY
      });  
      
    }, 20)



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
		this.$(".slider").slider( "value" , this.model.get("angle") );
		return this;
	},
	firstRender: function() {
		$(this.el).html(ich.kinectnavtmpl(this.model.toJSON()));
		var self = this;
		this.$(".slider").slider({
			value:this.model.get("angle"),
			min: 0,
			max: 360,
			step: 5,
			slide: function( event, ui ) {
				self.model.set({
					angle: ui.value,
					offsetImgX: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($("#kinimg1_"+self.model.get("htmlId")).offset().left)),
					offsetImgY: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($("#karte")[0].offsetHeight - $("#kinimg1_"+self.model.get("htmlId")).offset().top))					
				});
				
			},
			stop: function(event, ui) {
				self.model.set({
					angle: ui.value,
					offsetImgX: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($("#kinimg1_"+self.model.get("htmlId")).offset().left)),
					offsetImgY: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($("#karte")[0].offsetHeight  - $("#kinimg1_"+self.model.get("htmlId")).offset().top))					
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
