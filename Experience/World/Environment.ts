import { DirectionalLight } from "three";
import { AmbientLight } from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Environment {
    experience: Experience;
    scene: any;
    resources: any;
    sunlight: any;
    ambientLight: any;
    obj: object;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.obj = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 3,
        };

        this.setSunlight();
    }

    setSunlight() {
        this.sunlight = new DirectionalLight("#FFFFFF", 1);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(1024, 1024);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(1.5, 7, 3);
        this.scene.add(this.sunlight);

        this.ambientLight = new AmbientLight("#FFFFFF", 0.5);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme: any) {
        if (theme === "dark") {
            GSAP.to(this.sunlight.color, {
                r: 14 / 255,
                g: 21 / 255,
                b: 61 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 14 / 255,
                g: 21 / 255,
                b: 61 / 255,
            });
            GSAP.to(this.sunlight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            });
        }
        else {
            GSAP.to(this.sunlight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.sunlight, {
                intensity: 1,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.5,
            });
        }
    }

    resize() {

    }

    update() {
    }
}