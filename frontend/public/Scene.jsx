import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import getSun from "./getSun.js";
import getStarfield from "./getStarField.js";
import getNebula from "./getNebula.js";
import getPlanet from "./getPlanet.js";
import getElipticLines from "./getElipticLines.js";
import { ChoosePlanet } from "./component/ChoosePlanet.jsx";
import { PlanetJourney } from "./component/PlanetJourney.jsx";

export function Scene() {
  const [popUp, setPopUp] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isTraveling, setIsTraveling] = useState(false);
  const [planets, setPlanets] = useState([]);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    // setTimeout(() => setPopUp(true), 3000);

    let useAnimatedCamera = true;
    const cameraDistance = 5;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const solarSystem = new THREE.Group();
    scene.add(solarSystem);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    setTimeout(() => (useAnimatedCamera = false), 2000);

    function animate(t = 0) {
      requestAnimationFrame(animate);
      const time = t * 0.0005;

      // Ensure each planet has a valid update function before calling it
      solarSystem.children.forEach((child) => {
        if (child.userData && typeof child.userData.update === "function") {
          child.userData.update(time);
        }
      });

      renderer.render(scene, camera);

      if (useAnimatedCamera) {
        camera.position.x = Math.cos(time * 0.75) * cameraDistance;
        camera.position.y = Math.cos(time * 0.75);
        camera.position.z = Math.sin(time * 0.75) * cameraDistance;
        camera.lookAt(0, 0, 0);
      } else {
        controls.update();
      }
    }

    const sun = getSun();
    solarSystem.add(sun);

    const planetData = [
      {
        size: 0.1,
        distance: 1.25,
        img: "mercury.png",
        name: "Mercury",
        speed: 0.02,
      },
      {
        size: 0.2,
        distance: 1.65,
        img: "venus.png",
        name: "Venus",
        speed: 0.015,
      },
      {
        size: 0.225,
        distance: 2.0,
        img: "earth.png",
        name: "Earth",
        speed: 0.01,
      },
      {
        size: 0.15,
        distance: 2.25,
        img: "mars.png",
        name: "Mars",
        speed: 0.008,
      },
      {
        size: 0.4,
        distance: 2.75,
        img: "jupiter.png",
        name: "Jupiter",
        speed: 0.005,
      },
      {
        size: 0.35,
        distance: 3.25,
        img: "saturn.png",
        name: "Saturn",
        speed: 0.004,
      },
      {
        size: 0.3,
        distance: 3.75,
        img: "uranus.png",
        name: "Uranus",
        speed: 0.003,
      },
      {
        size: 0.3,
        distance: 4.25,
        img: "neptune.png",
        name: "Neptune",
        speed: 0.002,
      },
    ];

    const newPlanets = planetData.map((p) => {
      const planet = getPlanet({
        size: p.size,
        distance: p.distance,
        img: p.img,
      });
      planet.userData = {
        name: p.name,
        img: p.img,
        update: (time) => {
          planet.position.x = Math.cos(time * 0.2) * p.distance;
          planet.position.z = Math.sin(time * 0.2) * p.distance;
        },
      };

      solarSystem.add(planet);
      return planet;
    });

    setPlanets(newPlanets);

    solarSystem.add(getElipticLines());
    scene.add(getStarfield({ numStars: 1000, size: 0.5 }));
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444));
    scene.add(
      getNebula({
        hue: 0.6,
        numSprites: 10,
        opacity: 0.2,
        radius: 50,
        size: 100,
        z: -50.5,
      }),
    );
    scene.add(
      getNebula({
        hue: 0.0,
        numSprites: 10,
        opacity: 0.2,
        radius: 50,
        size: 100,
        z: 50.5,
      }),
    );

    camera.position.z = 5;

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  const handlePlanetSelect = (planet) => {
    console.log("🌍 Planet selected in Scene:", planet);
    setIsTraveling(false);
    setSelectedPlanet(planet);
    setPopUp(false);
  };

  return (
    <>
      {popUp && <ChoosePlanet onPlanetSelect={handlePlanetSelect} />}
      {selectedPlanet && <PlanetJourney selectedPlanet={selectedPlanet} />}
    </>
  );
}
