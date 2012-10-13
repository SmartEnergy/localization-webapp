function WebglPolygonDrawer(webgl, webglElement, callback) {
  this.webgl = webgl;
  this.webglEl = webglElement;
  this.callback = callback;
  
  this.vertices = [];
  this.faces = [];
  
  this.drawingActive = true;
  
  $(this.webglEl).bind("dblclick", $.proxy(this.ondoubleclick, this));
  $(this.webglEl).bind("click", $.proxy(this.onclick, this));
  $(this.webglEl).bind("mousemove", $.proxy(this.onmove, this));
  this.mesh = null;
  
  $(this.webglEl).css('cursor',"crosshair");
  
  app.mouse.disableInteraction = true;
}

WebglPolygonDrawer.prototype.onclick = function(event) {
  event.preventDefault();
  if (!this.drawingActive) {
    return;
  }  
  
  var mousePos3D = this._mousePosition3D(event);
  if (mousePos3D !== null) {
    var p = new THREE.Vector2( mousePos3D.x,  mousePos3D.z );
    this.vertices.push(p);
    this.draw();    
  }  
}

WebglPolygonDrawer.prototype.onmove = function(event) {
  event.preventDefault();
  if (!this.drawingActive) {
    return;
  }
  
  var mousePos3D = this._mousePosition3D(event);
  if (mousePos3D !== null) {
    var p = new THREE.Vector2( mousePos3D.x,  mousePos3D.z );
    this.vertices.pop();
    this.vertices.push(p);
    this.draw();    
  }
  
}

WebglPolygonDrawer.prototype.ondoubleclick = function(event) {
  event.preventDefault();
  this.drawingActive = false;
  this.vertices.pop();
  this.vertices.pop();
  
  this.draw();
  
  $(this.webglEl).unbind("dblclick", $.proxy(this.ondoubleclick, this));
  $(this.webglEl).unbind("click", $.proxy(this.onclick, this));
  $(this.webglEl).unbind("mousemove", $.proxy(this.onmove, this));  
  
  app.mouse.disableInteraction = false;
  $(this.webglEl).css('cursor',"auto");
  
  if (this.vertices.length < 3) {
    alert("zu wenig vertices. Abbruch");    return;
  }  
  
  if (this.mesh !== null) {
    app.sceneview.webgl.scene.remove(this.mesh);
  }  
  
  // model erstellen
  var randint = Math.floor(Math.random()*10000);
  var name = "region_" + randint;
  
  var translatedVertices = [];
  for (var i in this.vertices) {
    var v = {
      x: this.vertices[i].x - app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").x,
      y: 0,
      z: app.sceneview.webgl.backboneSceneModel.get("sceneOrigin").z - this.vertices[i].y,
    }
    translatedVertices.push(v);
    console.log("v")
    console.log(v)
  }
    
  var m = new PolygonRegion({
    id: name,
    displayName: name,
    vertices: translatedVertices,
  });
  if (this.callback) {
    
    var translatedModel
    
    this.callback(m);
  }
}

WebglPolygonDrawer.prototype.draw = function() {
  if (this.mesh !== null) {
    app.sceneview.webgl.scene.remove(this.mesh);
  }
  
  if (this.vertices.length < 3) {
    console.log("zu wenig vertices");
    return;
  }
  
  var californiaShape = new THREE.Shape( this.vertices );
  var california3d = new THREE.ExtrudeGeometry( californiaShape, { amount: 200 } );
  
    for (var i in california3d.vertices) {
      i = parseInt(i);
      var p = california3d.vertices[i];
      var ztmp = p.z + 20;
      p.z = p.y;
      p.y = ztmp;
    }  
    
    var m  = new THREE.MeshLambertMaterial( { color: 0x000000 } );
    this.mesh  = new THREE.Mesh( california3d, m );         
    app.sceneview.webgl.scene.add(this.mesh);    
}

WebglPolygonDrawer.prototype._mousePosition3D = function(event) {
  var mouse = {};
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;    
  var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
  var projector = new THREE.Projector();
  projector.unprojectVector( vector, app.sceneview.webgl.camera );
  var ray = new THREE.Ray( app.sceneview.webgl.camera.position, vector.subSelf( app.sceneview.webgl.camera.position ).normalize() );
  var intersects = ray.intersectObjects( [app.sceneview.webgl.objects.ground.meshes[0]] );    
  if (intersects.length > 0) {  
    var point = intersects[0].point;
    return point
  }  
  return null;
}