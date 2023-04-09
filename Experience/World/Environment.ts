import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
// import GUI from "lil-gui";

export default class Environment {
    experience: any;
    scene: any;
    resources: any;
    sunlight: any;
    ambientLight: any;
    // gui: any;
    obj: any;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI();
        this.obj = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 3,
        };

        this.setSunlight();
        // this.setGUI();
    }

    /*
    setGUI() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunlight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunlight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        })
    }
    */

    setSunlight() {
        this.sunlight = new THREE.DirectionalLight("#FFFFFF", 1);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(1024, 1024);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(1.5, 7, 3);
        this.scene.add(this.sunlight);

        this.ambientLight = new THREE.AmbientLight("#FFFFFF", 0.5);
        this.scene.add(this.ambientLight);

        //const helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
        //this.scene.add(helper)
    }

    switchTheme(theme: any) {
        if (theme === "dark") {
            GSAP.to(this.sunlight.color, {
                r: 0.07058823529411765,
                g: 0.10196078431372549,
                b: 0.30196078431372547,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.07058823529411765,
                g: 0.10196078431372549,
                b: 0.30196078431372547,
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