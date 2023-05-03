import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls {
    experience: Experience;
    scene!: THREE.Scene;
    resources: any;
    camera: THREE.Camera;
    room: any;
    sizes: any;
    firstMoveTimeline!: GSAPTimeline;
    secondMoveTimeline!: GSAPTimeline;
    thirdMoveTimeline!: GSAPTimeline;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.sizes = this.experience.sizes;

        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();

    }

    setScrollTrigger() {
        let mm = GSAP.matchMedia();
        mm.add("(min-width: 800px", () => {

            // First Section
            this.firstMoveTimeline = new (GSAP.timeline as any)({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
            
            this.firstMoveTimeline.to(
                this.room.position,
                {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    },
                }
            );

            // Second Section
            this.secondMoveTimeline = new (GSAP.timeline as any)({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            }).to(
                this.room.position,
                {
                    x: () => {
                        return 1;
                    },
                    z: () => {
                        return this.sizes.height * 0.0032;
                    },
                }
            ).to(
                this.room.scale,
                {
                    x: () => {
                        return 4;
                    },
                    y: () => {
                        return 4;
                    },
                    z: () => {
                        return 4;
                    },
                }
            );

            // Third Section
            this.thirdMoveTimeline = new (GSAP.timeline as any)({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            }).to(
                this.room.position,
                {
                    x: () => {
                        return 0;
                    },
                    y: () => {
                        return 0;
                    },
                    z: () => {
                        return 0;
                    },
                }
            ).to(
                this.room.scale,
                {
                    x: () => {
                        return 0.25;
                    },
                    y: () => {
                        return 0.25;
                    },
                    z: () => {
                        return 0.25;
                    },
                }
            );

        })
    }

    resize() {

    }

    update() {
    }
}