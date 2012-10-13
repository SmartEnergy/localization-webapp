var NavigationElementView = Backbone.View.extend({
  initialize: function(a) {
    var self = this;
    $(this.el).html(ich.navElTmpl(a));
    this.elNavContent = ich.navElContentTmpl();
    

    this.size = a.size;


    if (this.size && this.size.width) {
      $(this.elNavContent).width(this.size.width);
    }
    
    if (this.size && this.size.height) {
      $(this.elNavContent).height(this.size.height);
    }
    
    $("#navigation").append(this.el);
    $("#navigationContent").append(this.elNavContent);
    
    $(this.elNavContent).offset({
      left: this.getTranslatedPosition().left,
      top: this.size.height * -1
    });
    
  },  
  
  events: {
    "click .navigationElement": "onNavElementClick"
  },
  
  render: function() {
    
  },
  
  onNavElementClick: function(event) {
    if (this.$(".navigationElement").hasClass("navigationElementActive")) {
      this.$(".navigationElement").removeClass("navigationElementActive");
      $(this.elNavContent).removeClass("navContentActive");
      this.fadeOut();
    }
    else {
      $(".navContentActive").transition({ top: -1 * $(".navContentActive").height() });  
      $(".navigationElement").removeClass("navigationElementActive");
      $(".navContent").removeClass("navContentActive");
      
      this.$(".navigationElement").addClass("navigationElementActive");
      this.fadeIn();
    }
  },
  
  fadeIn: function() {
    var self = this;
    
    var translatedStartPos = this.getTranslatedPosition();
    $(this.elNavContent).show();   
    
    $(this.elNavContent).transition({ top: this.getTranslatedPosition().top }, function() {
      $(self.elNavContent).addClass("navContentActive");      
    });
    
  },
  fadeOut: function() {
    $(this.elNavContent).transition({ top: -1 * this.size.height });
    
  },
  
  getTranslatedPosition: function() {
    return {
      left: this.$(".navigationElement").offset().left,
      top: this.$(".navigationElement").offset().top + this.$(".navigationElement").height()
    };
  }
  
});


