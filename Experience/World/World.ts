import Experience from "../Experience";

import Room from "./Room"
import Floor from "./Floor";
import Controls from "./Controls";
import Environment from "./Environment";

export default class World {
    experience: Experience;
    sizes: any;
    scene: THREE.Scene;
    canvas: any;
    camera: any;
    resources: any;
    theme: any;
    room: any;
    floor: any;
    environment: any;
    controls: any;

    constructor() {
        this.experience = new Experience("");
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.room = new Room();
            this.floor = new Floor();
            this.environment = new Environment();
            this.controls = new Controls();
            console.log("Created Room!")
        })

        this.theme.on("switch", (theme: any) => {
            this.switchTheme(theme);
        })
    }

    switchTheme(theme: any) {
        if (this.environment) {
            this.environment.switchTheme(theme);
        }
    }

    resize() {

    }

    update() {
        if (this.room) {
            this.room.update();
        }

        if (this.controls) {
            this.controls.update();
        }
    }
}