import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useRef, useEffect } from "react";
import React from "react";
import Stats from "stats.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Animations

// Loaders
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// Post Processing
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";

export default function Scene() {
  const mountRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.shadowMap.enable = false;
    renderer.setClearColor(0xf2f2f2, 0);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 0.4;
    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Camera group
    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);

    // Camera and properties
    const camera = new THREE.PerspectiveCamera(
      70,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      100
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(0, 0, 20);
    cameraGroup.add(camera);

    /////////////////////////
    /// LOADERS AND 3D MODELS
    /////////////////////////

    // 3D Model Loader
    const gltfLoader = new GLTFLoader();

    // HDRI Loader
    const hdriLoader = new RGBELoader();
    hdriLoader.load("assets/hdr/studio.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    // Texture loader
    const loader = new THREE.TextureLoader();

    // Load 3D model
    gltfLoader.load("assets/models/beer_can.glb", function (gltf) {
      gltf.scene.rotation.z = Math.PI / -14;
      gltf.scene.scale.set(7, 7, 7);
      gltf.scene.position.set(0, -4, 0);

      gsap.to(gltf.scene.rotation, {
        duration: 15,
        y: Math.PI * 1,
        repeat: -1,
        yoyo: true,
        ease: "linear",
      });

      let tl = gsap.timeline();

      tl.to(
        gltf.scene.position,
        {
          y: -4.5,
          x: -6,
          z: 10,
          ease: "easeIn",
          duration: 5,
          scrollTrigger: {
            trigger: ".register-form",
            scrub: 1,
            start: "top bottom",
            end: "top top",
            markers: true,
          },
        },
        0
      );

      scene.add(gltf.scene);

      // Circle
      var circleGeometry = new THREE.CircleGeometry(6.5, 32);
      var circleMaterial = new THREE.MeshStandardMaterial({
        color: 0xfeaa29,
      });
      var circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.position.set(0, -6, 0);
      scene.add(circle);

      tl.to(
        circle.position,
        {
          y: 50,
          x: 0,
          z: 0,
          ease: "easeIn",
          duration: 5,
          scrollTrigger: {
            trigger: ".register-maintext",
            scrub: 1,
            start: "top bottom",
            end: "top top",
            markers: true,
          },
        },
        0
      );
    });
    /////////////////////////
    // SCENARIO
    /////////////////////////

    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    /////////////////////////
    ///// POST PROCESSING
    /////////////////////////
    const renderScene = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.setPixelRatio(window.devicePixelRatio);

    // Adding our shaders
    composer.addPass(renderScene);

    /////////////////////////
    // PARTICLES
    /////////////////////////

    var axisHelper = new THREE.AxesHelper(5);
    scene.add(axisHelper);

    /////////////////////
    // Lights
    /////////////////////
    var pointLight = new THREE.DirectionalLight(0xfcba03, 10);
    pointLight.position.set(-10, 0, 20);
    pointLight.castShadow = true;
    scene.add(pointLight);

    var pointLight2 = new THREE.DirectionalLight(0x0022ff0, 10);
    pointLight2.position.set(10, 0, 20);
    pointLight2.castShadow = true;
    scene.add(pointLight2);
    /////////////////////
    // Raycaster
    /////////////////////
    const pointer = new THREE.Vector2();

    function onPointerMove(event) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      var vector = new THREE.Vector3(pointer.x, pointer.y, 1);
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = -camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    }

    window.addEventListener("pointermove", onPointerMove);

    /////////////////////////
    ///////// Scroll
    /////////////////////////

    /////////////////////////
    // Resize
    /////////////////////////
    const resize = () => {
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    // Clock
    const clock = new THREE.Clock();
    var previousTime = 0;

    // var controls = new OrbitControls(camera, renderer.domElement);

    /////////////////////////
    // Animate scene
    /////////////////////////
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaFilm = clock.getDelta();
      const delta = elapsedTime - previousTime;
      previousTime = elapsedTime;
      // Test

      stats.begin();

      // monitored code goes here

      stats.end();

      setTimeout(function () {
        requestAnimationFrame(animate);
      }, 1000 / 75);
      composer.render(delta);
    };

    animate();

    // Clean scene
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="3DContainer d-flex"
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2,
      }}
    ></div>
  );
}
