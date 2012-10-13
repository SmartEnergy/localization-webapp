var User = Backbone.Model.extend({
  initialize: function() { 
    
  },
  getJointByType: function(type) {
    var joints = this.get("joints");
    for (var i in joints) {
      var joint = joints[i];
      if (joint.type == type) {
        return joint;
      }
    }
    return null;
  },
  getJointsSortedById: function() {
    var joints = this.get("joints");
    var jointsOrdered = new Array(25);
    for (var i in joints) {
      var joint = joints[i];
      jointsOrdered[joint.type] = joint;
    }    
    return jointsOrdered;
  }

});

