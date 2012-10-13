var UserView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		_.bindAll(this, "render");

		this.model.bind('change', this.render);
	},
	render: function() {
		
		this.$(".user").css("top", $("#karte")[0].offsetHeight - this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY")));
		this.$(".user").css("left", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posX")));		

		$("#bubble_"+this.model.get("htmlId")).css("left", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posX"))-55);
		$("#bubble_"+this.model.get("htmlId")).css("top", $("#karte")[0].offsetHeight - this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY"))-65);
						
		
		return this;
	},
	firstRender: function() {
		$(this.el).html(ich.userdevtmpl(this.model.toJSON()));	

		$("#bubbles").append(ich.userbubbletmpl(this.model.toJSON()));
		
		$("#bubble_"+this.model.get("htmlId")).css("left", this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posX"))-55);
		$("#bubble_"+this.model.get("htmlId")).css("top", $("#karte")[0].offsetHeight - this.model.get("scenemodel").get("vp").mmInPixel(this.model.get("posY"))-65);
		
		this.$(".user").css("background-color", colors[this.model.get("userid")%10]);

		var self = this;
    sceneview.model.get("serversocket").on('updateUser', function (user) {
			self.updateUser(user.id, user);
		}); 
    sceneview.model.get("serversocket").on('removedUser', function (key) {
			self.remove(key);
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
			posX: user.position.x*10,
			posY: user.position.y*10
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


