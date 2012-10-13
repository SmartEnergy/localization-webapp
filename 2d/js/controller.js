/**
 * File name: $HeadURL$
 * Revision: $Revison$
 * Last modified: $Date$
 * Last modified by: $Author$
 * Created by: Tobias Hartwich (tha@tzi.de)
 * 
 * Controlls the navigation. Not used yet.
 */

var SceneController = Backbone.Controller.extend({

  routes: {
    "newCommand":           "newCommand", 
    "mobile":               "mobile",
    "ui/:query":            "ui",   

  },

  help: function() {
    
  },
  ui: function(query) {
  
    $("#debug_overlay_select").val(query)
    showOverlay();
  },
  newCommand: function(query) {
    sceneview.addCommand();
  },
  mobile: function() {
    mobileVersion = true;
  }

});


