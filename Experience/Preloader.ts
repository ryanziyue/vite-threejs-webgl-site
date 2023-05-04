import { EventEmitter } from "events";
import Experience from "./Experience"

export default class Preloader extends EventEmitter {
    experience: any;
    scene: any;
    sizes: any;
    resources: any;
    camera: any;
    world: any;
    device: any;

    constructor() { //construction of window
        super();
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {

    }

    playIntro() {

    }
}