import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Controls {
    experience: Experience;
    scene!: THREE.Scene;
    resources: any;
    camera: any;
    room: any;
    sizes: any;
    rectLight: any;
    firstMoveTimeline!: GSAPTimeline;
    secondMoveTimeline!: GSAPTimeline;
    thirdMoveTimeline!: GSAPTimeline;
    sections: any;
    progressWrapper: any;
    progressBar: any;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach((child: any) => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        })
        this.sizes = this.experience.sizes;

        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();

    }

    setScrollTrigger() {
        let mm = GSAP.matchMedia();

        // DESKTOP STUFF
        mm.add("(min-width: 800px", () => {
            console.log("desktop!");
            this.rectLight.width = 0.25;
            this.rectLight.height = 0.25;
            this.camera.orthographicCamera.position.set(0, 4.5, 5);
            this.room.position.set(0, 0, 0);

            // First Section
            this.firstMoveTimeline = new (GSAP.timeline as any)({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            }).to(
                this.room.position,
                {
                    x: this.sizes.width * 0.00100,
                },
                "first-desktop"
            ).to(
                this.room.scale,
                {
                    x: 1.1,
                    y: 1.1,
                    z: 1.1,
                },
                "first-desktop"
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
                    x: -5.8,
                    z: 5.5,
                },
                "second-desktop",
            ).to(
                this.room.scale,
                {
                    x: 4,
                    y: 4,
                    z: 4
                },
                "second-desktop",
            ).to(
                this.rectLight,
                {
                    width: 0.25 * 4,
                    height: 0.25 * 4,
                },
                "second-desktop",
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
                    x: 0,
                    y: 0,
                    z: 0,
                },
                "third-desktop"
            ).to(
                this.room.scale,
                {
                    x: 4,
                    y: 4,
                    z: 4,
                },
                "third-desktop"
            );

        })


        // MOBILE STUFF
        mm.add("(max-width: 799px", () => {
            console.log("mobile!");
            this.room.position.set(0, 0, 0);
            this.rectLight.width = 0.25;
            this.rectLight.height = 0.25;
            this.camera.orthographicCamera.position.set(0, 4.5, 5);

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
                this.room.scale,
                {
                    x: 2,
                    y: 2,
                    z: 2,
                },
                "second-mobile",
            ).to(
                this.rectLight,
                {
                    width: 0.25 * 2,
                    height: 0.25 * 2,
                },
                "second-mobile",
            ).to(
                this.room.position,
                {
                    x: -1.5,
                    y: -0.5,
                },
                "second-mobile",
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
                    z: -4.5,
                },
                "third-mobile"
            );
        });
            
        // ALL
        mm.add("", () => {
            this.sections = document.querySelectorAll(".section");
            this.sections.forEach((section: any) => {
                this.progressWrapper =
                    section.querySelector(".progress-wrapper");
                this.progressBar = section.querySelector(".progress-bar");
                console.log(this.progressBar);

                if (section.classList.contains("right")) {
                    GSAP.to(section, {
                        borderTopLeftRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        },
                    });
                    GSAP.to(section, {
                        borderBottomLeftRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    });
                } else {
                    GSAP.to(section, {
                        borderTopRightRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        },
                    });
                    GSAP.to(section, {
                        borderBottomRightRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    });
                }
                GSAP.from(this.progressBar, {
                    scaleY: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                        pin: this.progressWrapper,
                        pinSpacing: false,
                    },
                });
            });
        })
    }

    resize() {

    }

    update() {
    }
}