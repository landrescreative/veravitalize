import * as THREE from "three";
import { useRef, useEffect } from "react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Loaders
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// Post Processing
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

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
      // antialias: true,
    });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMappingExposure = 1;
    renderer.setPixelRatio(1);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Camera and properties
    const camera = new THREE.PerspectiveCamera(
      50,
      currentMount.clientWidth / currentMount.clientHeight,
      0.01,
      100
    );
    camera.lookAt(0, 0, 0);
    camera.position.set(0, 0, 20);
    scene.add(camera);

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
    gltfLoader.setDRACOLoader(dracoLoader);

    var crema;

    // Load 3D model
    gltfLoader.load("assets/models/cream.glb", function (gltf) {
      gltf.scene.scale.set(5, 5, 5);
      gltf.scene.rotation.set(Math.PI * 0.05, Math.PI * 1.25, 0);
      gltf.scene.position.set(0, -4);
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

        tl.to(
          gltf.scene.position,
          {
            x: () => {
              return window.innerWidth > 360 ? -6 : 0;
            },
            y: -2,
            z: () => {
              return window.innerWidth > 360 ? -2 : -6;
            },
          },
          0
        )
          .to(gltf.scene.rotation, { x: Math.PI * 0.2 }, 0)
          .to(
            gltf.scene.position,
            {
              x: 0,
              y: -3,
              z: () => {
                return window.innerWidth > 360 ? 6 : 0;
              },
            },
            1
          )
          .to(gltf.scene.rotation, { x: Math.PI * 0.5 }, 1)
          .to(
            gltf.scene.position,
            {
              x: () => {
                return window.innerWidth > 360 ? 5 : 0;
              },
              y: -2,
              z: () => {
                return window.innerWidth > 360 ? 2 : -10;
              },
            },
            2
          )
          .to(gltf.scene.rotation, { z: Math.PI * 0.1 }, 2)
          .to(gltf.scene.rotation, { x: Math.PI * 0.2 }, 2);
      }

      setupScrollAnimation();
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

    // This adds images to the mission section
    var missionImageTexture = loader.load("assets/textures/img/2.jpg");
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
    var missionImageTexture_2 = loader.load("assets/textures/img/1.jpg");
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
    var barBackgroundImage = loader.load("assets/textures/img/t.jpg");
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
    background.position.set(0, 0, -30);
    scene.add(background);

    /////////////////////////
    // SCENARIO
    /////////////////////////

    /////////////////////////
    ///// POST PROCESSING
    /////////////////////////
    const renderScene = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.setPixelRatio(window.devicePixelRatio);

    // Adding our shaders
    composer.addPass(renderScene);

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

      composer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", resize);

    /////////////////////////
    // Animate scene
    /////////////////////////
    const animate = () => {
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

      setTimeout(function () {
        requestAnimationFrame(animate);
        composer.render(0.1);
      }, 1000 / 75);
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
