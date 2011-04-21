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
$(document).ready(function () {    
	scenecreatorview = new SceneCreatorView();
	scenecreatorview.render();
	$("body").append(scenecreatorview.el);
	
	var w = new SceneController();
	Backbone.history.start();
});