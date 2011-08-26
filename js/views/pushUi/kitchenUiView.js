var KitchenUiView = Backbone.View.extend({
    events: {
    },
    initialize: function() {
        _.bindAll(this, "render");

        //this.model.bind('change', this.render);
    },
    render: function() {
        

        return this;
    },
    firstRender: function() {
        this.el = ich.uiKitchenTmpl();
        $("body").append(this.el);
        $(this.el).show();
        $(this.el).css("left", $("body")[0].offsetWidth);
        $(this.el).animate({
            left: '0'
          }, 500, function() {
        });        
        
        return this;
    }
});
