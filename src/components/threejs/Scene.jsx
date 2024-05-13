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
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

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

    // HDRI Loader
    const hdriLoader = new RGBELoader();
    hdriLoader.load("assets/hdr/studio.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environmentIntensity = 1;
      scene.environment = texture;
    });

    // Texture loader
    const loader = new THREE.TextureLoader();

    // Draco loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    // GLTF loader
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // Variable to see if the user is on mobile based on viewport width
    const isMobile = window.innerWidth < 1024;

    var crema;

    // Load 3D model
    gltfLoader.load("assets/models/skincare.glb", function (gltf) {
      gltf.scene.scale.set(10, 10, 10);
      gltf.scene.rotation.set(0, Math.PI * 0.5, 0);
      gltf.scene.position.set(0, -4, 0);
      crema = gltf.scene;

      function setupScrollAnimation() {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".register-form",
            start: "top bottom",
            endTrigger: ".img",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(gltf.scene.position, { x: -7, y: -2, z: 4 }, 0)
          .to(gltf.scene.position, { x: 0, y: -4, z: 6 }, 1)
          .to(gltf.scene.rotation, { x: Math.PI * 0.5 }, 1)
          .to(gltf.scene.position, { x: 5, y: -2, z: 2 }, 2)
          .to(gltf.scene.rotation, { x: Math.PI * 0 }, 2);

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

      function setupScrollAnimationMobile() {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".register-maintext",
            start: "top bottom",
            endTrigger: ".footer",
            end: "top bottom",
            scrub: 1,
            markers: false,
            invalidateOnRefresh: true,
          },
        });

        tl.to(gltf.scene.position, { x: -9, y: -2.5, z: 7 }, 0)
          .to(gltf.scene.rotation, { x: Math.PI * 0.5 }, 0)
          .to(gltf.scene.rotation, { z: Math.PI * 1.5 }, 0)
          .to(gltf.scene.position, { x: 0, y: -4, z: 15 }, 1)
          .to(gltf.scene.rotation, { z: Math.PI * 1 }, 1)
          .to(gltf.scene.rotation, { x: Math.PI * 0.5 }, 1)
          .to(gltf.scene.position, { x: 0, y: -15, z: 5 }, 2)
          .to(gltf.scene.rotation, { z: Math.PI * 0 }, 2)
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

      // Load bar model neon
      gltfLoader.load("assets/models/neon.gltf", function (gltf) {
        // This traverse the model and adds a glow effect to the neon
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.material.emissiveIntensity = 6;
          }
        });

        // This traverse a specific mesh and adds a glow effect to the neon
        gltf.scene.traverse(function (child) {
          if (child.name === "Amarillo") {
            child.material.emissive = new THREE.Color(0xffd900);
            child.material.emissiveIntensity = 8;
          }
        });

        gltf.scene.rotation.z = Math.PI * 0.05;
        gltf.scene.scale.set(2, 2, 2);
        gltf.scene.position.set(2, -14, 2);
        // scene.add(gltf.scene);

        gsap.to(
          gltf.scene.position,
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
              markers: false,
            },
          },
          0
        );
      });
    });

    var textureLoader = new THREE.TextureLoader();

    // This adds images to the mission section
    var missionImageTexture = textureLoader.load(
      "assets/textures/img/beer_1.jpg"
    );
    var missionImage = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 15),
      new THREE.MeshBasicMaterial({ map: missionImageTexture })
    );
    missionImage.position.set(50, 5, 0);
    // scene.add(missionImage);

    gsap.to(missionImage.position, {
      x: 20,
      duration: 5,
      scrollTrigger: {
        trigger: ".mission-header",
        scrub: 1,
        top: "top top",
        end: "bottom 20%",
      },
    });

    // This adds images to the mission section
    var missionImageTexture_2 = textureLoader.load(
      "assets/textures/img/beer_2.jpg"
    );
    var missionImage_2 = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 15),
      new THREE.MeshBasicMaterial({ map: missionImageTexture_2 })
    );
    missionImage_2.position.set(-50, -5, 0);
    // scene.add(missionImage_2);

    gsap.to(missionImage_2.position, {
      x: -22,
      duration: 5,
      scrollTrigger: {
        trigger: ".mission-header",
        scrub: 1,
        top: "top top",
        end: "bottom 20%",
      },
    });

    // This add a background image to the header
    var barBackgroundImage = textureLoader.load("assets/textures/img/bgc.jpg");
    var backgroundHeader = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 30),
      new THREE.MeshBasicMaterial({})
    );
    backgroundHeader.material.map = barBackgroundImage;
    // scene.add(backgroundHeader);

    gsap.to(backgroundHeader.position, {
      y: 30,

      scrollTrigger: {
        trigger: ".register-maintext",
        scrub: 1,
        start: "top bottom",
        end: "top top",
      },
    });

    // This adds a background all the body
    var background = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({ color: 0xfafffa })
    );
    background.position.set(0, 0, -10);
    scene.add(background);

    // Geometry that follows mouse
    var geometry = new THREE.SphereGeometry(0.8, 16, 16);
    var material = new THREE.MeshBasicMaterial({ color: 0x7bb661 });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 10);
    scene.add(sphere);

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
      0.1,
      0.3,
      0.75
    );
    composer.addPass(bloomPass);

    // Film
    var filmPass = new FilmPass(
      0.35, // noise intensity
      0.025, // scanline intensity
      648, // scanline count
      false // grayscale
    );
    filmPass.renderToScreen = true;

    // composer.addPass(filmPass);

    /////////////////////
    // Lights
    /////////////////////
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    /////////////////////
    // Raycaster
    /////////////////////
    const pointer = new THREE.Vector2();

    function onPointerMove(event) {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener("pointermove", onPointerMove);

    // Raycaster that detects mouse position from camera
    // and returns the object that is being hovered
    const raycaster = new THREE.Raycaster();
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

      renderer.setPixelRatio(window.devicePixelRatio, 2);

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
      // Parallax effect
      camera.position.x = pointer.x * 0.5;
      camera.position.y = pointer.y * 0.5;

      // Makes geometry follows mouse
      sphere.position.x = pointer.x * 20;
      sphere.position.y = pointer.y * 17;

      // Raycaster
      raycaster.setFromCamera(pointer, camera);

      if (crema) {
        const hits = raycaster.intersectObjects([crema], true);

        // Mouse leave effect
        if (hits.length > 0) {
          gsap.to(crema.scale, {
            onUpdate: () => {
              crema.rotation.y += 0.0005;
            },
          });
        }
      }

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
