/**
 * File name: $HeadURL$
 * Revision: $Revison$
 * Last modified: $Date$
 * Last modified by: $Author$
 * Created by: Tobias Hartwich (tha@tzi.de)
 * 
 * Entrypoint of the javascript application.
 */

var sceneview;
var colors = ["#eda3b1", "#b8cede", "#b8a5de", "#a5dea5", "#749c74", "#74749c", "#22749c", "#9c2243", "#7c5669", "#3f5e5e"];
var colorsrgb = ["184,165,222", "184,206,222", "165,222,165", "116,156,116","237,163,177", "116,116,156", "34,116,156", "156,33,67", "124,86,105", "63,94,94"];
var inAction = false;
var mobileVersion = false;
var hasConnected = false;

function showOverlay(link) {
  sceneview.onPushUI($("#debug_overlay_select").val());
}
function closeOverlay() {
    $(".uiOverlay").animate(
      {
        left: $("body")[0].offsetWidth
      },
      500,
      function() {
        $(".uiOverlay").remove();  
      }
    );

}

function getRegionNames() {
  var names = [];
  sceneview.model.get("regions").each(function(value) {
    n = []
    n.push(value.get("name"));
    n.push(value.get("displayName"));
    
    names.push(n);
  });
  sceneview.model.get("regionsPoly").each(function(value) {
    n = []
    n.push(value.get("name"));
    n.push(value.get("displayName"));
    
    names.push(n);
  });
  return names;
}

$(document).ready(function () {    
  
  var w = new SceneController();
  Backbone.history.start();
  
	scenecreatorview = new SceneCreatorView();
	scenecreatorview.render();
	$("body").append(scenecreatorview.el);
	scenecreatorview.createScene();
	
  $(".changeServer").click(function(e) {
		$("#connectDialog").show();
		$("#reconnectDialog").hide();
		$("#connDialog").hide();    
    $("#sceneSelectStep3").show();
  });


  /*var test = new GestureDialogView({
    
  });
  
  test.firstRender();*/



 
    if (isMobile()) {
        $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'css/mobile.css?') );
    }  



});



