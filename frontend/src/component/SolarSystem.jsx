import {useEffect} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import getSun from "../utils/getSun.js";
import getPlanet from "../utils/getPlanet.js";
import getElipticLines from "../utils/getElipticLines.js";
import getStarfield from "../utils/getStarField.js";
import getNebula from "../utils/getNebula.js";

export default function SolarSystem() {

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

        // Find the container
        const container = document.getElementById("solar_system");

        // Mount renderer.domElement to container
        if (container) {
            container.appendChild(renderer.domElement);
        }
        //document.body.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.03;

        const solarSystem = new THREE.Group();

        setTimeout(() => (useAnimatedCamera = false), 2000);

        let animationFrameId;
        function animate(t = 0) {
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

            animationFrameId = requestAnimationFrame(animate);
        }

        const sun = getSun();
        solarSystem.add(sun);

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

        solarSystem.add(getElipticLines());

        scene.add(solarSystem);
        scene.add(getStarfield({numStars: 1000, size: 0.5}));
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
            cancelAnimationFrame(animationFrameId);

            renderer.dispose();
            if (container?.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            // optional:
            scene.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose?.();
                if (obj.material) {
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach((m) => m.dispose?.());
                    } else {
                        obj.material.dispose?.();
                    }
                }
            });
        };
    }, []);

    return (
        <div id="solar_system" className="fixed inset-0 w-screen h-screen -z-10"></div>
    );
}