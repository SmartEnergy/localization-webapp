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
