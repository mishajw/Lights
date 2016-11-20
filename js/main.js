
function Lights() {
  
  var $container = $('#main-container');

  var WIDTH = $container.width(),
    HEIGHT = $container.height();

  var CEILING_SIZE = 200;
  
  var renderer, camera, scene;

  var lights = [];

  this.init = function() {
    initCore();
    initObjects();

    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    var lastFrameTime = new Date().getTime();

    var scope = this;
    function loop() {
      console.log("Loop");

      var dt = new Date().getTime() - lastFrameTime;
      scope.render(dt);

      setTimeout(loop, 0);
    }

    loop();
  }

  this.render = function(dt) {
    for (var i = 0; i < lights.length; i++) {
      for (var j = 0; j < lights[i].length; j++) {
        scene.remove(lights[i][j].bulb);
        scene.remove(lights[i][j].light);
      }
    }

    initObjects();

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

    $container.append(renderer.domElement);
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

      return {
        bulb: bulb,
        light: pointLight
      };
    }

    var ceiling = new THREE.Mesh(
      new THREE.BoxGeometry(CEILING_SIZE, CEILING_SIZE, 1),
      new THREE.MeshLambertMaterial(
        { color: 0x666666 }));
    ceiling.position.set(0, 0, 0);
    scene.add(ceiling);

    lights = [];

    var incr = CEILING_SIZE / 5;
    for (var x = -CEILING_SIZE / 2; x <= CEILING_SIZE / 2; x += incr) {
      var lightsRow = [];
      for (var y = -CEILING_SIZE / 2; y <= CEILING_SIZE / 2; y += incr) {
        lightsRow.push(makePhysicalLight({ x: x, y: y, z: 1 }, 0xFFFFFF * Math.random()));
      }

      lights.push(lightsRow);
    }
  }
}

$(function() {
  var lights = new Lights();
  lights.init();
  lights.render();
});

