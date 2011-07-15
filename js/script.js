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

function showOverlay() {
  $(".uiChillen").show();
  $(".uiChillen").css("left", $("body")[0].offsetWidth);
  $(".uiChillen").animate({
      left: '0'
    }, 500, function() {
  });
}

function closeOverlay() {
$(".uiOverlay").animate(
  {
    left: $("body")[0].offsetWidth
  },
  500,
  function() {
    $(".uiOverlay").hide();  
  }
);

}
// TODO ändern für die richtige app
function getRegionNames() {
  var names = [];
  sceneview.model.get("regions").each(function(value) {
    names.push(value.get("name"));
  });
  sceneview.model.get("regionsPoly").each(function(value) {
    names.push(value.get("name"));
  });
  return names;
}

$(document).ready(function () {    
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


	var w = new SceneController();
 



	//Backbone.history.start();
});



