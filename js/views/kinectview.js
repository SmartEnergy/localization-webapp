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
					offsetBoundingX: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($(self.el).offset().left)),
					offsetBoundingY: Math.round(self.model.get("scenemodel").get("vp").pixelInMM($(self.el).offset().top)),
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

		$(this.el).css("left", parseInt(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("offsetBoundingX"))));
		$(this.el).css("top", parseInt(this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("offsetBoundingY"))));

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
