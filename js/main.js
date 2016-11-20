
function Lights() {
  
  var container = document.getElementById('main-container');

  var WIDTH = 400,
    HEIGHT = 300;
  
  var renderer, camera, scene;

  this.init = function() {
    initCore();
    initObjects();
  }

  function initCore() {
    var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;

    camera = new THREE.PerspectiveCamera(
      VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.z = 300;

    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    container.appendChild(renderer.domElement);
  }

  function initObjects() {
    var radius = 50,
      segments = 16,
      rings = 16;

    var sphereMaterial = new THREE.MeshLambertMaterial(
      { color: 0xCC0000 });

    var sphere = new THREE.Mesh(
      new THREE.SphereGeometry(
        radius, segments, rings),
      sphereMaterial);
    scene.add(sphere);

    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;
    scene.add(pointLight);

    renderer.render(scene, camera);
  }
}

$(function() {
  var lights = new Lights();
  lights.init();
});

