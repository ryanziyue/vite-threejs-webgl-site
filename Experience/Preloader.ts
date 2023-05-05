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
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro() {
        this.timeline = new (GSAP.timeline as any);
        this.timeline.to(this.roomChildren.Cube.scale, {
            x: 0.225,
            y: 0.225,
            z: 0.225,
            ease: "back.out(2.5)",
            duration: 2,
        })
    }

    playIntro() {
        this.firstIntro();
    }
}