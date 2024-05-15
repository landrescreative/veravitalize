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
import { render } from "@testing-library/react";

export default function Scene() {
  const mountRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    inmediateRender: false,
  });

  useEffect(() => {
    const currentMount = mountRef.current;

    // HDRI Loader
    const hdriLoader = new RGBELoader();
    hdriLoader.load("assets/hdr/studio.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    // Scene
    const scene = new THREE.Scene();
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    // renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMappingExposure = 1;
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Camera group
    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);

    // Camera and properties
    const camera = new THREE.PerspectiveCamera(
      50,
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

    // Texture loader
    const loader = new THREE.TextureLoader();

    // Draco loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    // GLTF loader
    const gltfLoader = new GLTFLoader();
    dracoLoader.setDecoderConfig({ type: "js" });
    gltfLoader.setDRACOLoader(dracoLoader);

    // Variable to see if the user is on mobile based on viewport width
    const isMobile = window.innerWidth < 1024;

    var crema;

    // Load 3D model
    gltfLoader.load("assets/models/cream2.glb", function (gltf) {
      gltf.scene.scale.set(5, 5, 5);
      gltf.scene.rotation.set(Math.PI * 0.05, Math.PI * 1.25, 0);
      gltf.scene.position.set(0, -4, 0);
      gltf.scene.traverse(function (child) {
        if (child.name === "bottle") {
          child.material.transparent = true;
          child.material.transmission = 1;
          child.material.opacity = 0.8;
          child.material.roughness = 0.2;
          child.material.chromaticAberration = 0;
          child.material.ior = 1;
          child.material.metalness = 0.4;
        }

        if (child.name === "tape") {
          gsap.to(child.position, {
            y: 1.5,
            x: 0,
            z: 0,
            ease: "easeIn",
            duration: 5,
            scrollTrigger: {
              trigger: ".services-header",
              scrub: 1,
              start: "top bottom",
              end: "top top",
              endTrigger: ".img-services",
              markers: false,
            },
          });
        }
      });

      crema = gltf.scene;

      function setupScrollAnimation() {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".register-form",
            start: "top bottom",
            endTrigger: ".img-services",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(gltf.scene.position, { x: -6, y: -2, z: -1 }, 0)
          .to(gltf.scene.position, { x: 0, y: -3, z: 6 }, 1)
          .to(gltf.scene.rotation, { x: Math.PI * 0.5 }, 1)
          .to(gltf.scene.position, { x: 5, y: -2, z: 2 }, 2)
          .to(gltf.scene.rotation, { x: Math.PI * 0.2 }, 2);

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

        tl.to(gltf.scene.position, { x: 0, y: 2, z: -4 }, 0)
          .to(gltf.scene.rotation, { x: Math.PI * 0.2 }, 0)
          .to(gltf.scene.position, { x: 0, y: -2, z: 0 }, 1)
          .to(gltf.scene.rotation, { x: Math.PI * 0.5 }, 1)
          .to(gltf.scene.position, { x: 0, y: -4, z: 5 }, 2)
          .to(gltf.scene.rotation, { z: Math.PI * 0.1 }, 2)
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

      if (isMobile) {
        setupScrollAnimationMobile();
      } else {
        setupScrollAnimation();
      }

      scene.add(gltf.scene);

      // Load bar model neon
      gltfLoader.load("assets/models/gel.glb", function (gltf) {
        gltf.scene.rotation.z = Math.PI * -0.05;
        gltf.scene.rotation.y = Math.PI * 1;
        gltf.scene.scale.set(2, 2, 2);
        gltf.scene.position.set(-30, -7, 0);

        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.material.opacity = 0.9;
            child.material.roughness = 0.8;
            child.material.metalness = 0.8;
          }
        });
        scene.add(gltf.scene);

        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".register-maintext",
            endTrigger: ".mission-h1",
            start: "top bottom",
            end: "top top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl2
          .to(gltf.scene.position, { x: -12, y: -7, z: 0 }, 0)
          .to(gltf.scene.position, { x: -24, y: -7, z: 0 }, 1);
      });
    });

    var textureLoader = new THREE.TextureLoader();

    // This adds images to the mission section
    var missionImageTexture = textureLoader.load("assets/textures/img/2.jpg");
    var missionImage = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 15),
      new THREE.MeshBasicMaterial({ map: missionImageTexture })
    );
    missionImage.position.set(30, 5, 0);
    scene.add(missionImage);

    gsap.to(missionImage.position, {
      x: 18,
      duration: 5,
      scrollTrigger: {
        trigger: ".mission-header",
        scrub: 1,
        top: "top top",
        end: "bottom 20%",
      },
    });

    // This adds images to the mission section
    var missionImageTexture_2 = textureLoader.load("assets/textures/img/1.jpg");
    var missionImage_2 = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 15),
      new THREE.MeshBasicMaterial({ map: missionImageTexture_2 })
    );
    missionImage_2.position.set(-30, -5, 0);
    scene.add(missionImage_2);

    gsap.to(missionImage_2.position, {
      x: -18,
      duration: 5,
      scrollTrigger: {
        trigger: ".mission-header",
        scrub: 1,
        top: "top top",
        end: "bottom 20%",
      },
    });

    // This add a background image to the header
    var barBackgroundImage = textureLoader.load("assets/textures/img/t.jpg");
    var backgroundHeader = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 25),
      new THREE.MeshBasicMaterial({ envMapIntensity: 0 })
    );
    backgroundHeader.position.set(0, 0, -5);
    backgroundHeader.material.map = barBackgroundImage;
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

    // This adds a background all the body
    var background = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({ color: 0xfafffa })
    );
    background.position.set(0, 0, -10);
    scene.add(background);

    /////////////////////////
    // SCENARIO
    /////////////////////////

    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild(stats.dom);

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
      0.05,
      1,
      0
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
    // scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0);
    pointLight.position.set(0, 10, 2);
    scene.add(pointLight);

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
      // Raycaster
      raycaster.setFromCamera(pointer, camera);

      if (crema) {
        const hits = raycaster.intersectObjects([crema], true);

        // Mouse hover

        if (hits.length > 0) {
          gsap.to(crema.scale, {
            onUpdate: () => {
              crema.rotation.y += 0.0005;
            },
          });
        }

        // Mouse leave effect
        if (hits.length > 0) {
          gsap.to(crema.scale, {
            x: 5.5,
            y: 5.5,
            z: 5.5,
            duration: 1,
            onComplete: () => {
              gsap.to(crema.scale, {
                x: 5,
                y: 5,
                z: 5,
                duration: 1,
              });
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
