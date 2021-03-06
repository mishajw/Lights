
function Lights() {
  
  var $container = $('#main-container');

  var WIDTH = $container.width(),
    HEIGHT = $container.height();

  var CEILING_SIZE = 200;

  var RENDER_RATE = 1000 / 30,
    LOGIC_RATE = 100;
  
  var renderer, camera, scene;

  var logicIncr = 0;

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

    var scope = this;

    function loop() {
      scope.render();
      setTimeout(loop, RENDER_RATE);
    }
    loop();

    setInterval(function() {
      scope.logic();
      logicIncr++;
    }, LOGIC_RATE);
  }

  this.render = function() {
    renderer.render(scene, camera);
  }

  this.logic = function() {
    for (var i = 0; i < lights.length; i++) {
      for (var j = 0; j < lights[i].length; j++) {
        var newIntensity = logicIncr % lights[i].length == j ? 0 : 1;
        changeLight(lights[i][j], 0xFF0000, newIntensity);
      }
    }
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
      pointLight.transparent = true;

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
      new THREE.BoxGeometry(CEILING_SIZE + 20, CEILING_SIZE + 20, 1),
      new THREE.MeshPhongMaterial(
        { color: 0x666666 }));
    ceiling.position.set(0, 0, 0);
    scene.add(ceiling);

    lights = [];

    var incr = CEILING_SIZE / 5;
    for (var x = -CEILING_SIZE / 2; x <= CEILING_SIZE / 2; x += incr) {
      var lightsRow = [];
      for (var y = -CEILING_SIZE / 2; y <= CEILING_SIZE / 2; y += incr) {
        lightsRow.push(makePhysicalLight({ x: x, y: y, z: 3 }, 0xFFFFFF));
      }

      lights.push(lightsRow);
    }
  }

  function changeLight(light, color, intensity) {
    light.light.intensity = intensity;
    light.light.color.set(color * intensity);
    light.bulb.material.color.set(color * intensity);
    light.bulb.material.emissive.set(color * intensity);
  }
}

$(function() {
  var lights = new Lights();
  lights.init();
  lights.render();
});

