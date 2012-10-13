var StartDialog = Backbone.View.extend({
  initialize: function() {
    var self = this;
    

    // Ist schon was im Cookie gespeichert?
    if ($.cookie('se_app') !== null) {
      // Dann das nehmen
      var cookieapp = JSON.parse($.cookie('se_app'));
      app.speed = cookieapp.speed;
      app.map = cookieapp.map;
      app.shadow = cookieapp.shadow;
    }     
    else {
      // Sonst Dialog anzeigen
      this.setElement(ich.startDialogTmpl()); 
      $("body").append(this.el);
      this.$("#startDialog").offset({
        left: window.innerWidth/2 - this.$("#startDialog").width()/2,
        top: window.innerHeight/2 - this.$("#startDialog").height()/2
      });
      $(this.el).height(window.innerHeight);
      $(this.el).show();      
    }
      
      

    /**/
   
   
  },  
  
  events: {
  },
  
  render: function() {
    
  }
  
});


