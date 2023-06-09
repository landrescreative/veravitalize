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

export default function Scene() {
  const mountRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    inmediateRender: false,
  });

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    renderer.setClearColor(0x1f1e23, 1);
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

    // Variable to see if the user is on mobile based on viewport width
    const isMobile = window.innerWidth < 1024;

    // Load 3D model
    gltfLoader.load("assets/models/beer_can.glb", function (gltf) {
      gltf.scene.scale.set(7, 7, 7);
      gltf.scene.position.set(0, -4, 0);

      function setupScrollAnimation() {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".register-form",
            start: "top bottom",
            endTrigger: ".img",
            end: "bottom bottom",
            scrub: 1,
            markers: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(gltf.scene.position, { x: -5, y: -5, z: 10 }, 0)
          .to(gltf.scene.position, { x: 0, y: -3, z: 8 }, 1)
          .to(gltf.scene.rotation, { x: Math.PI * 0.5 }, 1)
          .to(gltf.scene.position, { x: 4, y: -5, z: 10 }, 2)
          .to(gltf.scene.rotation, { x: Math.PI * 0 }, 2);

        gsap.to(gltf.scene.rotation, {
          duration: 15,
          y: Math.PI * 1,
          repeat: -1,
          yoyo: true,
          ease: "linear",
          start: "top top",
          end: "+=100",
        });
      }

      function setupScrollAnimationMobile() {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".register-form",
            start: "top bottom",
            endTrigger: ".img",
            end: "bottom bottom",
            scrub: 1,
            markers: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(gltf.scene.position, { x: -3.5, y: -2.5, z: 5 }, 0)
          .to(gltf.scene.rotation, { x: Math.PI * 0.5 }, 0)
          .to(gltf.scene.rotation, { z: Math.PI * 1.5 }, 0)
          .to(gltf.scene.position, { x: 0, y: -4, z: 5 }, 1)
          .to(gltf.scene.rotation, { z: 0 }, 1)
          .to(gltf.scene.rotation, { x: Math.PI * 0.5 }, 1)
          .to(gltf.scene.position, { x: 0, y: -5, z: 5 }, 2)
          .to(gltf.scene.rotation, { x: Math.PI * 0 }, 2)
          .to(gltf.scene.rotation, { y: Math.PI * 0.35 }, 2);

        // gsap.to(gltf.scene.rotation, {
        //   duration: 15,
        //   y: Math.PI * 1,
        //   repeat: -1,
        //   yoyo: true,
        //   ease: "linear",
        //   start: "top top",
        //   end: "+=100",
        // });
      }

      if (isMobile) {
        setupScrollAnimationMobile();
      } else {
        setupScrollAnimation();
      }

      scene.add(gltf.scene);

      // Circle
      var circleGeometry = new THREE.CircleGeometry(6.5, 32);
      var circleMaterial = new THREE.MeshStandardMaterial({
        color: 0xfeaa29,
        emissive: 0xfeaa29,
        emissiveIntensity: 18.8,
      });
      var circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.position.set(0, -6, 0);
      scene.add(circle);

      gsap.to(
        circle.position,
        {
          y: 30,
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

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load("assets/textures/img/bar.png");
    console.log(texture);

    var backgroundHeader = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 30),
      new THREE.MeshBasicMaterial({})
    );
    backgroundHeader.material.map = texture;
    scene.add(backgroundHeader);

    gsap.to(backgroundHeader.position, {
      y: 30,

      scrollTrigger: {
        trigger: ".register-maintext",
        scrub: 1,
        start: "top bottom",
        end: "top top",
      },
    });

    var background = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({ color: 0x444147 })
    );
    background.position.set(0, 0, -10);
    scene.add(background);

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

    // Bloom
    var bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.6,
      0.3,
      0.75
    );
    composer.addPass(bloomPass);

    // Film Pass
    var filmPass = new FilmPass(0.7, 0.025, 128, false);
    composer.addPass(filmPass);

    // composer.addPass(filmPass);

    /////////////////////
    // Lights
    /////////////////////
    var pointLight = new THREE.DirectionalLight(0xfcba03, 15);
    pointLight.position.set(-10, 0, 20);
    pointLight.castShadow = true;
    scene.add(pointLight);

    var pointLight2 = new THREE.DirectionalLight(0x0022ff0, 15);
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

      composer.setSize(currentMount.clientWidth, currentMount.clientHeight);
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
        zIndex: -2,
      }}
    ></div>
  );
}
