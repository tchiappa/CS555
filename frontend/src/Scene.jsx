import React, { useEffect, useState } from "react";
import getSun from "./getSun.js";
import * as THREE from "three";
import getStarfield from "./getStarField.js";
import getNebula from "./getNebula.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
// import getAsteroidBelt from "./getAstroidBelt.js";
import getPlanet from "./getPlanet.js";
import getElipticLines from "./getElipticLines.js";
import { ChoosePlanet } from "./component/ChoosePlanet.jsx";

export function Scene() {
  const [popUp, setPopUp] = useState(false);
  setTimeout(() => {
    setPopUp(true);
  }, "2000");

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
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const solarSystem = new THREE.Group();
    solarSystem.userData.update = (t) => {
      solarSystem.children.forEach((child) => {
        child.userData.update?.(t);
      });
    };
    scene.add(solarSystem);

    setTimeout(() => {
      console.log("Delayed for 1 second.");
      useAnimatedCamera = false;
    }, "2000");

    function animate(t = 0) {
      const time = t * 0.0005;
      requestAnimationFrame(animate);
      solarSystem.userData.update(time);
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

    const mercury = getPlanet({
      size: 0.1,
      distance: 1.25,
      img: "mercury.png",
    });
    solarSystem.add(mercury);

    const venus = getPlanet({ size: 0.2, distance: 1.65, img: "venus.png" });
    solarSystem.add(venus);

    const moon = getPlanet({ size: 0.075, distance: 0.4, img: "moon.png" });
    const earth = getPlanet({
      children: [moon],
      size: 0.225,
      distance: 2.0,
      img: "earth.png",
    });
    solarSystem.add(earth);

    const mars = getPlanet({ size: 0.15, distance: 2.25, img: "mars.png" });
    solarSystem.add(mars);

    // const manager = new THREE.LoadingManager();
    // // manager.onLoad = () => initScene(sceneData);
    // const loader = new OBJLoader(manager);
    //
    // objs = ["Rock1", "Rock2", "Rock3"];
    // objs.forEach((name) => {
    //   let path = `.src/assets/${name}.obj`;
    //   loader.load(path, (obj) => {
    //     obj.traverse((child) => {
    //       if (child.isMesh) {
    //         sceneData.objs.push(child);
    //       }
    //     });
    //   });
    // });
    //
    // const asteroidBelt = getAsteroidBelt(objs);
    // solarSystem.add(asteroidBelt);

    const jupiter = getPlanet({
      size: 0.4,
      distance: 2.75,
      img: "jupiter.png",
    });
    solarSystem.add(jupiter);

    const sRingGeo = new THREE.TorusGeometry(0.6, 0.15, 8, 64);
    const sRingMat = new THREE.MeshStandardMaterial();
    const saturnRing = new THREE.Mesh(sRingGeo, sRingMat);
    saturnRing.scale.z = 0.1;
    saturnRing.rotation.x = Math.PI * 0.5;
    const saturn = getPlanet({
      children: [saturnRing],
      size: 0.35,
      distance: 3.25,
      img: "saturn.png",
    });
    solarSystem.add(saturn);

    const uRingGeo = new THREE.TorusGeometry(0.5, 0.05, 8, 64);
    const uRingMat = new THREE.MeshStandardMaterial();
    const uranusRing = new THREE.Mesh(uRingGeo, uRingMat);
    uranusRing.scale.z = 0.1;
    const uranus = getPlanet({
      children: [uranusRing],
      size: 0.3,
      distance: 3.75,
      img: "uranus.png",
    });
    solarSystem.add(uranus);

    const neptune = getPlanet({
      size: 0.3,
      distance: 4.25,
      img: "neptune.png",
    });
    solarSystem.add(neptune);

    const elipticLines = getElipticLines();
    solarSystem.add(elipticLines);

    const starfield = getStarfield({ numStars: 1000, size: 0.5 });
    scene.add(starfield);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    scene.add(hemiLight);

    const nebula = getNebula({
      hue: 0.6,
      numSprites: 10,
      opacity: 0.2,
      radius: 50,
      size: 100,
      z: -50.5,
    });
    scene.add(nebula);

    const anotherNebula = getNebula({
      hue: 0.0,
      numSprites: 10,
      opacity: 0.2,
      radius: 50,
      size: 100,
      z: 50.5,
    });
    scene.add(anotherNebula);

    camera.position.z = 5;
  });

  return <div>{popUp && <ChoosePlanet />}</div>;
}
