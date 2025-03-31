import * as THREE from "three";

import getSun from "../src/getSun.js";
import getStarfield from "../src/getStarField.js";
import getPlanet from "../src/getPlanet.js";
import getElipticLines from "../src/getElipticLines.js";
import getNebula from "../src/getNebula.js";

describe('Solar system functions', () => {
    it('should get a THREE.Mesh object for the sun', () => {
        const sun = getSun();
        expect(sun).toBeInstanceOf(THREE.Mesh);
    });

    it('should get a THREE.Group object for a planet', () => {
        const planet = getPlanet({
            size: 0.1,
            distance: 1.25,
            img: "mercury.png",
        });
        expect(planet).toBeInstanceOf(THREE.Group);
    });

    it('should get a THREE.Group object for elliptic lines', () => {
        const lines = getElipticLines();
        expect(lines).toBeInstanceOf(THREE.Group);
    });

    it('should get a THREE.Group object for elliptic lines', () => {
        const nebula = getNebula({
            hue: 0.0,
            numSprites: 10,
            opacity: 0.2,
            radius: 50,
            size: 100,
            z: 50.5,
        });
        expect(nebula).toBeInstanceOf(THREE.Group);
    });

    it('should get a THREE.Points object for the starfield', () => {
        const starfield = getStarfield({ numStars: 10, size: 0.5 });
        expect(starfield).toBeInstanceOf(THREE.Points);
    });
});
