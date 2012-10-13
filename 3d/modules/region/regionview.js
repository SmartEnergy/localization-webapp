var RegionView = Backbone.View.extend({
  rectRegionCollection: null,
  rectRegionViews: {},
  polyRegionCollection: null,
  polyRegionViews: {},
  initialize: function() {
    var self = this;
    
    this.navView = new NavigationElementView({
      name: "Regions",
      size: {
        width: 320,
        height: 400
      }
    });
    
    this.setElement(ich.regionsNavContentTmpl()); 
    $(this.navView.elNavContent).html(this.el);       
    
    this.rectRegionCollection = new RectangleRegionCollection();
    this.rectRegionCollection.on("add", $.proxy(this.onNewRectRegion, this));
    this.rectRegionCollection.on("remove", $.proxy(this.onRemoveRectRegion, this));
    this.rectRegionCollection.fetchRegions();
    
    this.polyRegionCollection = new PolygonRegionCollection();
    this.polyRegionCollection.on("add", $.proxy(this.onNewPolyRegion, this));
    this.polyRegionCollection.on("remove", $.proxy(this.onRemovePolyRegion, this));
    this.polyRegionCollection.fetchRegions();    
  },  
  
  events: {
    "click #regionsNavButtonAddRectRegion": "onAddRectRegionClick",
    "click #regionsNavButtonAddPolyRegion": "onAddPolyRegionClick" ,
    "click #regionsNavButtonHideRegions": "onHideRegionClick"  ,
    "click #regionsNavButtonShowRegions": "onShowRegionClick"   
  },
  
  onHideRegionClick: function() {
    $(window).trigger('hideRegions');
    $("#regionsNavButtonHideRegions").hide();
    $("#regionsNavButtonShowRegions").show();
  },
  
  onShowRegionClick: function() {
    $(window).trigger('showRegions');
    $("#regionsNavButtonHideRegions").show();
    $("#regionsNavButtonShowRegions").hide();    
  },
  
  onNewRectRegion: function(region) {
    console.log("onNewRectRegion");
    var knv = new RectangleRegionView({
      model: region,
      navContent: this.el
    });
    this.rectRegionViews[region.id] = knv;   
  },
  
  onAddRectRegionClick: function(event) {
    var randint = Math.floor(Math.random()*10000);
    var name = "region_" + randint;
    var region = new RectangleRegion({
      id: name,
      displayName: name,
      x: 0,
      y: 0,
      z: 0,
      width: 100,
      depth: 100,
      height: 200
    });
    region.sendAsNewRegion();
    this.onNewRectRegion(region);    
  },
  
  onRemoveRectRegion: function(region) {
    if (this.rectRegionViews[region.get("id")]) {
      this.rectRegionViews[region.get("id")].removeRegion();
      delete this.rectRegionViews[region.get("id")];
    }
  },
  
  onNewPolyRegion: function(polyregion) {
    console.log("onNewPolyRegion");
    var knv = new PolygonRegionView({
      model: polyregion,
      navContent: this.el
    });
    this.polyRegionViews[polyregion.id] = knv;    
  },
  
  onAddPolyRegionClick: function(event) {
    var self = this;
    app.sceneview.webgl.cameraTopView();
    var wpd = new WebglPolygonDrawer(app.sceneview.webgl, '#container', function(polyregion) {
      console.log("polyregion");
      console.log(polyregion);
      
      polyregion.sendAsNewRegion();
      self.onNewPolyRegion(polyregion);       
      
    });

  },
  
  onRemovePolyRegion: function(region) {
    if (this.polyRegionViews[region.get("id")]) {
      this.polyRegionViews[region.get("id")].removeRegion();
      delete this.polyRegionViews[region.get("id")];
    }
  }  
  

});


