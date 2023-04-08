import Experience from "../Experience";

import Room from "./Room"
import Controls from "./Controls";
import Environment from "./Environment";

export default class World {
    experience: any;
    sizes: any;
    scene: any;
    canvas: any;
    camera: any;
    resources: any;
    room: any;
    environment: any;
    controls: any;

    constructor() {
        this.experience = new Experience("");
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.room = new Room();
            this.environment = new Environment();
            this.controls = new Controls();
            console.log("Created Room!")
        })
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