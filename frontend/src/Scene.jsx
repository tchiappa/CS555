import React, {useEffect, useState, useRef, useContext} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import getSun from "./getSun.js";
import getStarfield from "./getStarField.js";
import getNebula from "./getNebula.js";
import getPlanet from "./getPlanet.js";
import getElipticLines from "./getElipticLines.js";
import { ChoosePlanet } from "./component/ChoosePlanet.jsx";
import { PlanetJourney } from "./component/PlanetJourney.jsx";
import QuizModal from "./component/QuizModal.jsx";
import FuelStatus from "./component/FuelStatus.jsx";
import SpaceStation from "./component/SpaceStation.jsx";
import { useHazard } from "./hooks/useHazard.js";
import { Hazard } from "./component/Hazard.jsx";
import TradeContext from "./context/tradeContext.jsx";
import TutorialOverlay from "./component/TutorialOverlay";

export function Scene() {
  const [popUp, setPopUp] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isTraveling, setIsTraveling] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentPlanet, setCurrentPlanet] = useState("Earth");

  const {playerResources, setPlayerResources, fuel, setFuel} =
      useContext(TradeContext);

  // HAZARDS
  const { currentHazard, maybeTriggerHazard, resolveHazard, clearHazard } =
    useHazard();
  const updateStats = ({ fuel: fuelChange, resources: resChange }) => {
    // Update fuel
    setFuel((f) => Math.max(0, f + fuelChange));

    // Update resources with clamping to zero
    setPlayerResources((prevResources) => {
      const updatedResources = { ...prevResources };

      for (const [key, change] of Object.entries(resChange)) {
        const current = updatedResources[key] || 0;
        const newValue = current + change;

        // Prevent values from dropping below 0
        updatedResources[key] = Math.max(0, newValue);
      }

      return updatedResources;
    });
  };

  const [pendingPlanet, setPendingPlanet] = useState(null);
  useEffect(() => {
    if (currentHazard && currentHazard.resolved && pendingPlanet) {
      const timeout = setTimeout(() => {
        travelToPlanet(pendingPlanet);
        setPendingPlanet(null);
        clearHazard();
      }, 2000); // or however long you want the result to show

      return () => clearTimeout(timeout);
    }
  }, [currentHazard, pendingPlanet]);

    const [showTutorial, setShowTutorial] = useState(true);


    const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
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
    //renderer.setAnimationLoop(animate);
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
      const startAngle = Math.random() * Math.PI * 2;
      const startInclination = ((Math.random() - 0.5) * Math.PI) / 4; // -45 to 45 degrees
      const planet = getPlanet({
        size: p.size,
        distance: p.distance,
        img: p.img,
      });
      planet.userData = {
        name: p.name,
        img: p.img,
        angle: startAngle,
        inclination: startInclination,
        speed: p.speed,
        update: (time) => {
          planet.userData.angle += planet.userData.speed; // Orbital speed

          // Base circular motion
          const x = Math.cos(planet.userData.angle) * p.distance;
          const z = Math.sin(planet.userData.angle) * p.distance;

          // Apply inclination by rotating around the X-axis
          const y = Math.sin(planet.userData.inclination) * z; // Adjust height variation
          const adjustedZ = Math.cos(planet.userData.inclination) * z; // Adjust depth

          // Set new position
          planet.position.set(x, y, adjustedZ);
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

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  const handlePlanetSelect = (planet) => {
    console.log("🌍 Planet selected in Scene:", planet);

    const hazard = maybeTriggerHazard();

    if (hazard) {
      // Store selected planet for later, wait for hazard resolution
      setPendingPlanet(planet);
    } else {
      // No hazard, travel immediately
      travelToPlanet(planet);
    }
  };

  const travelToPlanet = (planet) => {
    setIsTraveling(true);

    setSelectedPlanet(planet);
    setCurrentPlanet(planet.name);
    setPopUp(false);
    setShowQuiz(true);
  };

  return (
    <>
      {showTutorial && <TutorialOverlay onFinish={() => setShowTutorial(false)} />}
      <FuelStatus fuel={fuel} />

      {selectedPlanet && (
        <SpaceStation
          selectedPlanet={selectedPlanet}
          fuel={fuel}
          setFuel={setFuel}
          playerResources={playerResources}
          setPlayerResources={setPlayerResources}
        />
      )}

      <Hazard
        hazard={currentHazard}
        onChooseOption={(opt) => resolveHazard(opt, updateStats)}
        onClose={clearHazard}
      />

      {/* Show ChoosePlanet only when there's no selected planet */}
      {popUp && !selectedPlanet && (
        <ChoosePlanet onPlanetSelect={handlePlanetSelect} />
      )}

      {/* Always show the planet journey/info panel if a planet is selected */}
      {selectedPlanet && (
        <PlanetJourney
          selectedPlanet={selectedPlanet}
          onExit={() => {
            setSelectedPlanet(null);
            setPopUp(true);
          }}
        />
      )}

      {/* Optional: Start quiz button (when not showing quiz) */}
      {!showQuiz && selectedPlanet && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => setShowQuiz(true)}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Start Quiz
          </button>
        </div>
      )}
    </>
  );
}
