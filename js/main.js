
function Lights() {
  
  var container = document.getElementById('main-container');

  var WIDTH = 400,
    HEIGHT = 300;

  var CEILING_SIZE = 200;
  
  var renderer, camera, scene;

  this.init = function() {
    initCore();
    initObjects();
  }

  this.render = function() {
    renderer.render(scene, camera);
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
    
    function makePhysicalLight(position, color) {
      var radius = 1, 
        segments = 16,
        rings = 16;

      var bulb = new THREE.Mesh(
        new THREE.SphereGeometry(
          radius, segments, rings),
        new THREE.MeshStandardMaterial({
          emissive: color,
          emissiveIntensity: 1,
          color: 0x000000}));

      var pointLight = new THREE.PointLight(color);

      bulb.position.set(position.x, position.y, position.z);
      pointLight.position.set(position.x, position.y, position.z);

      scene.add(bulb);
      scene.add(pointLight);
    }

    var ceiling = new THREE.Mesh(
      new THREE.BoxGeometry(CEILING_SIZE, CEILING_SIZE, 1),
      new THREE.MeshLambertMaterial(
        { color: 0x666666 }));
    ceiling.position.set(0, 0, 0);
    scene.add(ceiling);

    var incr = CEILING_SIZE / 5;
    for (var x = -CEILING_SIZE / 2; x <= CEILING_SIZE / 2; x += incr) {
      for (var y = -CEILING_SIZE / 2; y <= CEILING_SIZE / 2; y += incr) {
        makePhysicalLight({ x: x, y: y, z: 1 }, 0xFFFFFF * Math.random());
      }
    }
  }
}

$(function() {
  var lights = new Lights();
  lights.init();
  lights.render();
});

