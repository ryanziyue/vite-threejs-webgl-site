import Experience from "../Experience";

import Room from "./Room"
import Floor from "./Floor";
import Environment from "./Environment";

import { EventEmitter } from "events";

export default class World extends EventEmitter{
    experience: Experience;
    sizes: any;
    scene!: THREE.Scene;
    canvas: any;
    camera: any;
    resources: any;
    theme: any;
    room: any;
    floor: any;
    environment: any;

    constructor() {
        super();
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
            console.log("Created Room!")
            this.emit("worldready");
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
    }
}