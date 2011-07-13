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


