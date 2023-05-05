import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";

export default class Preloader extends EventEmitter {
    experience: any;
    scene: any;
    sizes: any;
    resources: any;
    camera: any;
    world: any;
    device: any;
    room: any;
    roomChildren: any;
    timeline: any;

    constructor() { //construction of window
        super();
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        
        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro() {
        this.timeline = new (GSAP.timeline as any);
        this.timeline.to(this.roomChildren.Cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 3
        })
    }

    playIntro() {
        this.firstIntro();
    }
}