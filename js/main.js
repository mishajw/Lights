
$(function() {
  var WIDTH = 400,
    HEIGHT = 300,
    VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

  var container = document.getElementById('main-container');

  var renderer = new THREE.WebGLRenderer();
  var camera = new THREE.PerspectiveCamera(
    VIEW_ANGLE, ASPECT, NEAR, FAR);

  var scene = new THREE.Scene();

  scene.add(camera);
  camera.position.z = 300;

  renderer.setSize(WIDTH, HEIGHT);

  container.appendChild(renderer.domElement);
});

