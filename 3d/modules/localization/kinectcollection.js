var KinectCollection = Backbone.Collection.extend({
  model: Kinect,
  initialize: function() {
    app.socket.on('newKinect', $.proxy(this.onNewKinect, this));
    app.socket.on('updateKinect', $.proxy(this.onChangeKinect, this));    
    app.socket.on('removedKinect', $.proxy(this.onRemoveKinect, this));     
  },
  fetchKinects: function() {
    var self = this;
    $.getJSON('/kinects', function(data) {
      $.each(data.kinects, function(idx, kinect) {
        self.onNewKinect(kinect);
      });
    });    
  },
  
  onNewKinect: function(kinectJson) {
    var kinect = new Kinect({
      id: kinectJson.id,
      x: kinectJson.x,
      y: 200,
      z: kinectJson.y,
      angle: kinectJson.angle
    });
    this.add(kinect);
  },
  
  onChangeKinect: function(kinect) {
    var model = this.get(kinect.id);
    if (model) {
      model.set({
        x: kinect.x,
        z: kinect.y,
        angle: kinect.angle
      })
    }
  },
  onRemoveKinect: function(kinectid) {
    var model = this.get(kinectid);
    if (model) {
      this.remove(model);
    }
  }
});