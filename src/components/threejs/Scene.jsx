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

export default function Scene({ onProgress, onLoaded }) {
  const mountRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.defaults({
    immediateRender: false,
  });

  useEffect(() => {
    const currentMount = mountRef.current;

    // Loading Manager
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const pct = Math.round((itemsLoaded / itemsTotal) * 100);
      if (onProgress) onProgress(pct);
    };
    manager.onLoad = () => {
      if (onLoaded) onLoaded();
    };

    // HDRI Loader
    const hdriLoader = new RGBELoader(manager);
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
    const loader = new THREE.TextureLoader(manager);

    // Draco loader
    const dracoLoader = new DRACOLoader(manager);
    dracoLoader.setDecoderPath("/draco/");

    // GLTF loader
    const gltfLoader = new GLTFLoader(manager);
    gltfLoader.setDRACOLoader(dracoLoader);

    var crema;
    const cremaPivot = new THREE.Group();
    cremaPivot.position.set(0, -4, 0);
    cremaPivot.rotation.set(Math.PI * 0.05, Math.PI * 1.25, 0);
    scene.add(cremaPivot);

    // Load 3D model
    gltfLoader.load("assets/models/cream.glb", function (gltf) {
      // Start in hidden entrance state inside pivot
      gltf.scene.scale.set(0.001, 0.001, 0.001);
      gltf.scene.position.set(0, -5, 0);
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
            ease: "none",
            duration: 1,
            scrollTrigger: {
              trigger: "#routine",
              scrub: 1,
              start: "top 75%",
              end: "center center",
              markers: false,
            },
          });
        }
      });

      crema = gltf.scene;
      cremaPivot.add(gltf.scene);

      function setupScrollAnimation() {
        // 1. Hero -> Register (100% complete when #register hits center center)
        gsap.fromTo(
          cremaPivot.position,
          {
            x: 0,
            y: -4,
            z: 0,
          },
          {
            x: () => (window.innerWidth > 768 ? -5.5 : 0),
            y: () => (window.innerWidth > 768 ? -2 : -1.2),
            z: () => (window.innerWidth > 768 ? -2 : -4.5),
            ease: "none",
            scrollTrigger: {
              trigger: "#register",
              start: "top 95%",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
        gsap.fromTo(
          cremaPivot.rotation,
          {
            x: Math.PI * 0.05,
            y: Math.PI * 1.25,
            z: 0,
          },
          {
            x: Math.PI * 0.2,
            y: Math.PI * 1.45,
            z: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#register",
              start: "top 95%",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        // 2. Register -> Mission / About (100% complete when #about hits center center)
        gsap.fromTo(
          cremaPivot.position,
          {
            x: () => (window.innerWidth > 768 ? -5.5 : 0),
            y: () => (window.innerWidth > 768 ? -2 : -1.2),
            z: () => (window.innerWidth > 768 ? -2 : -4.5),
          },
          {
            x: 0,
            y: -3,
            z: () => (window.innerWidth > 768 ? 5.5 : 0),
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top 85%",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
        gsap.fromTo(
          cremaPivot.rotation,
          {
            x: Math.PI * 0.2,
            y: Math.PI * 1.45,
            z: 0,
          },
          {
            x: Math.PI * 0.45,
            y: Math.PI * 1.75,
            z: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top 85%",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        // 3. Mission / About -> Routine / Services (100% complete when #routine hits center center)
        gsap.fromTo(
          cremaPivot.position,
          {
            x: 0,
            y: -3,
            z: () => (window.innerWidth > 768 ? 5.5 : 0),
          },
          {
            x: () => (window.innerWidth > 768 ? 5 : 0),
            y: -2,
            z: () => (window.innerWidth > 768 ? 2 : -10),
            ease: "none",
            scrollTrigger: {
              trigger: "#routine",
              start: "top 85%",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
        gsap.fromTo(
          cremaPivot.rotation,
          {
            x: Math.PI * 0.45,
            y: Math.PI * 1.75,
            z: 0,
          },
          {
            x: Math.PI * 0.2,
            y: Math.PI * 2.05,
            z: Math.PI * 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: "#routine",
              start: "top 85%",
              end: "center center",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Cinematic 3D Entrance Reveal Animation (operates on gltf.scene relative to cremaPivot)
      const entranceTl = gsap.timeline({ delay: 0.2 });
      entranceTl
        .to(
          gltf.scene.scale,
          {
            x: 5,
            y: 5,
            z: 5,
            duration: 1.8,
            ease: "power3.out",
          },
          0
        )
        .to(
          gltf.scene.position,
          {
            y: 0,
            duration: 1.8,
            ease: "power3.out",
          },
          0
        );

      // Ambient subtle breathing motion (relative inside cremaPivot, never fights ScrollTrigger)
      gsap.to(gltf.scene.position, {
        y: "-=0.18",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.1,
      });

      setupScrollAnimation();

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
            trigger: "#register",
            endTrigger: "#about",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        tl2
          .to(gltf.scene.position, { x: -12, y: -7, z: 0, ease: "none", duration: 1 }, 0)
          .to(gltf.scene.position, { x: -24, y: -7, z: 0, ease: "none", duration: 1 }, 1);
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

    let isHovered = false;

    /////////////////////////
    // Animate scene
    /////////////////////////
    const animate = () => {
      // Parallax effect
      camera.position.x = pointer.x * 0.4;
      camera.position.y = pointer.y * 0.4;
      // Raycaster
      raycaster.setFromCamera(pointer, camera);

      if (crema) {
        const hits = raycaster.intersectObjects([crema], true);

        if (hits.length > 0) {
          crema.rotation.y += 0.005;
          if (!isHovered) {
            isHovered = true;
            gsap.to(crema.scale, {
              x: 5.3,
              y: 5.3,
              z: 5.3,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        } else {
          if (isHovered) {
            isHovered = false;
            gsap.to(crema.scale, {
              x: 5,
              y: 5,
              z: 5,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
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
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
