var LocalizationView = Backbone.View.extend({
  kinectCollection: null,
  kinectViews: {},
  initialize: function() {
    var self = this;
    
    this.navView = new NavigationElementView({
      name: "Localization Sources",
      size: {
        width: 320,
        height: 400
      }
    });
    
    this.setElement(ich.localizationNavContentTmpl()); 
    $(this.navView.elNavContent).html(this.el);       
    
    kinectCollection = new KinectCollection();
    kinectCollection.on("add", $.proxy(this.onNewKinect, this));
    kinectCollection.on("remove", $.proxy(this.onRemoveKinect, this));
    kinectCollection.fetchKinects();
    
  },
  events: {
    "click #regionsNavButtonHideLocal": "onHideLocal"
  }, 
  onHideLocal: function() {
    alert(1);
  },
  onNewKinect: function(kinect) {
    var knv = new KinectView({
      model: kinect,
      navContent: this.el
    });
    this.kinectViews[kinect.id] = knv;   
  },
  
  onRemoveKinect: function(kinect) {
    if (this.kinectViews[kinect.get("id")]) {
      this.kinectViews[kinect.get("id")].removeKinect();
      delete this.kinectViews[kinect.get("id")];
    }
  }
  
  

});


