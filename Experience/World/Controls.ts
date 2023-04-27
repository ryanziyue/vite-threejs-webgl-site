import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls {
    experience: Experience;
    scene: any;
    resources: any;
    camera: any;
    room: any;
    timeline: any;
    sizes: any;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.sizes = this.experience.sizes;

        GSAP.registerPlugin(ScrollTrigger);

        this.setPath();

    }

    setPath() {
        this.timeline = new (GSAP.timeline as any)();
        this.timeline.to(this.room.position, {
            x: () => { return this.sizes.width * 0.00165},
            scrollTrigger: {
                trigger: ".first-move",
                markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
    }

    resize() {

    }

    update() {
    }
}