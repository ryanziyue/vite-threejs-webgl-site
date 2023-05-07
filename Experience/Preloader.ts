import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/Convert";

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
    secondTimeline: any;
    firstScroll: any;
    tempRoomChildren: any;
    initialY: any;
    touchStart: any;
    touchMove: any;
    moveFlag!: boolean;
    scaleFlag!: boolean;

    constructor() { //construction of window
        super();
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device: any) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise((resolve: any) => {
            this.timeline = new (GSAP.timeline as any);

            if (this.device === "desktop") {
                this.timeline.to(
                    this.roomChildren.Cube.scale,
                    {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                    ease: "back.out(2.5)",
                    duration: 2,
                    },
                ).to(
                    this.room.position,
                    {
                        x: -1,
                        ease: "power1.out",
                        duration: 0.7,
                        onComplete: resolve,
                    }
                );
            } else {
                this.timeline.to(
                    this.roomChildren.Cube.scale,
                    {
                        x: 0.2,
                        y: 0.2,
                        z: 0.2,
                        ease: "back.out(2.5)",
                        duration: 2,
                    }
                ).to(
                    this.room.position,
                    {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    }
                );
            }

            this.timeline.to(
                ".intro-text .animatediv",
                {
                    yPercent: -100,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                    onComplete: resolve,
                },
            )
        });  
    }


    secondIntro() {
        return new Promise((resolve: any) => {
            this.secondTimeline = new (GSAP.timeline as any);
            this.tempRoomChildren = this.roomChildren;

            this.secondTimeline
            .to(
                ".intro-text .animatediv",
                {
                    yPercent: 100,
                    stagger: 0.05,
                    ease: "back.in(1.7)",
                },
            ).to(
                this.room.position,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                    duration: 1,
                },
                "match",
                ).to(
                this.roomChildren.Cube.rotation,
                {
                    y: 4 * Math.PI + Math.PI / 4,
                    duration: 1,
                },
                "match",
            ).to(
                this.roomChildren.Cube.scale,
                {
                    x: 1.1,
                    y: 1.1,
                    z: 1.1,
                    duration: 1,
                },
                "match",
            ).to(
                this.camera.orthographicCamera.position,
                {
                    y: 4.5,
                    duration: 1,
                },
                "match",
            ).to(
                this.roomChildren.Cube.position,
                {
                    x: 0,
                    y: 1.45794,
                    z: -0.002677,
                    duration: 1,
                },
                "match",
            ).set(
                this.roomChildren.Room.scale,
                {
                    x: 0.7493097186088562,
                    y: 0.7493097186088562,
                    z: 0.7493097186088562,
                    ease: "power1.out",
                },
            ).to(
                this.roomChildren.Cube.scale,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                "cubematch",
            ).to(
                this.roomChildren.Cube.position,
                {
                    y: 1.1
                },
                "cubematch",
            ).to(
                ".hero-main-title .animatediv",
                {
                    yPercent: -100,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                },
                "match1"
            ).to(
                ".hero-main-description .animatediv",
                {
                    yPercent: -100,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                },
                "match1"
            );

            delete this.tempRoomChildren["Cube"];
            delete this.tempRoomChildren["Room"];
            
            var count = 0
            var keys = Object.keys(this.tempRoomChildren).sort();
            console.log(keys);
            while (count <= 4) {
                this.secondTimeline.to(
                    this.tempRoomChildren[keys[count]].scale,
                    {
                        x: 0.7493097186088562,
                        y: 0.7493097186088562,
                        z: 0.7493097186088562,
                        ease: "back.out(2.5)",
                        duration: 0.15,
                        delay: 0.1 * count,
                    },
                    "match1"
                )
                count += 1;
            }
            while (count <= 20) {
                this.secondTimeline.to(
                    this.tempRoomChildren[keys[count]].scale,
                    {
                        x: 0.7493097186088562,
                        y: 0.7493097186088562,
                        z: 0.7493097186088562,
                        ease: "back.out(2.5)",
                        duration: 0.15,
                        delay: 0.1 * (count),
                    },
                    "match1"
                )
                count += 1;
            }
            while (count <= 26) {
                this.secondTimeline.to(
                    this.tempRoomChildren[keys[count]].scale,
                    {
                        x: 0.7493097186088562,
                        y: 0.7493097186088562,
                        z: 0.7493097186088562,
                        ease: "back.out(2.5)",
                        duration: 0.15,
                        delay: 0.1 * (count),
                    },
                    "match1"
                )
                count += 1;
            }

            this.secondTimeline.to(
                this.tempRoomChildren[keys[count]].scale,
                {
                    x: 0.7493097186088562,
                    y: 0.7493097186088562,
                    z: 0.7493097186088562,
                    ease: "back.out(2.5)",
                    duration: 0.15,
                    delay: 0.05 * count,
                },
                "match1"
            )
            count += 1;

            this.secondTimeline.to(
                this.tempRoomChildren[keys[count]].scale,
                {
                    x: 0.7493097186088562,
                    y: 0.7493097186088562,
                    z: 0.7493097186088562,
                    ease: "back.out(2.5)",
                    duration: 0.15,
                    delay: 0.05 * (count),
                },
                "match1"
            ).to(
                this.tempRoomChildren[keys[count]].rotation,
                {
                    y: 16 * Math.PI + Math.PI / 2,
                    ease: "power2.out",
                    duration: 3,
                },
                "match1"
            )

            count += 1;
            
            while (count <= 41) {
                this.secondTimeline.to(
                    this.tempRoomChildren[keys[count]].scale,
                    {
                        x: 0.7493097186088562,
                        y: 0.7493097186088562,
                        z: 0.7493097186088562,
                        ease: "back.out(2.5)",
                        duration: 0.15,
                        delay: 0.05 * (count),
                    },
                    "match1"
                )
                count += 1;
            }

            this.secondTimeline.to(
                this.tempRoomChildren[keys[count]].scale,
                {
                    x: 0.7493097186088562,
                    y: 0.7493097186088562,
                    z: 0.7493097186088562,
                    ease: "back.out(2.5)",
                    duration: 0.15,
                    delay: 0.05 * (count),
                    onComplete: resolve,
                },
                "match1"
            )
            /*
            while (count <= 4) {
                this.secondTimeline.to(
                    this.tempRoomChildren[keys[count]].scale,
                    {
                        x: 0.7493097186088562,
                        y: 0.7493097186088562,
                        z: 0.7493097186088562,
                        ease: "back.out(2.5)",
                        duration: 0.15,
                        delay: 0.1 * count,
                    },
                    "match1"
                )
                count += 1;
            }
            while (count <= 20) {
                this.secondTimeline.to(
                    this.tempRoomChildren[keys[count]].scale,
                    {
                        x: 0.7493097186088562,
                        y: 0.7493097186088562,
                        z: 0.7493097186088562,
                        ease: "back.out(2.5)",
                        duration: 0.15,
                        delay: 0.1 * (count - 5),
                    },
                    "match2"
                )
                count += 1;
            }
            while (count <= 26) {
                this.secondTimeline.to(
                    this.tempRoomChildren[keys[count]].scale,
                    {
                        x: 0.7493097186088562,
                        y: 0.7493097186088562,
                        z: 0.7493097186088562,
                        ease: "back.out(2.5)",
                        duration: 0.15,
                        delay: 0.1 * (count - 21),
                    },
                    "match3"
                )
                count += 1;
            }

            this.secondTimeline.to(
                this.tempRoomChildren[keys[count]].scale,
                {
                    x: 0.7493097186088562,
                    y: 0.7493097186088562,
                    z: 0.7493097186088562,
                    ease: "back.out(2.5)",
                    duration: 0.15,
                },
                "match4"
            )
            count += 1;

            this.secondTimeline.to(
                this.tempRoomChildren[keys[count]].scale,
                {
                    x: 0.7493097186088562,
                    y: 0.7493097186088562,
                    z: 0.7493097186088562,
                    ease: "back.out(2.5)",
                    duration: 0.15,
                    delay: 0.1 * (count - 28),
                },
                "match4"
            ).to(
                this.tempRoomChildren[keys[count]].rotation,
                {
                    y: 4 * Math.PI + Math.PI * 2 / 3,
                    ease: "power2.out",
                    duration: 3,
                },
                "match4"
            )

            count += 1;
            
            while (count <= 42) {
                this.secondTimeline.to(
                    this.tempRoomChildren[keys[count]].scale,
                    {
                        x: 0.7493097186088562,
                        y: 0.7493097186088562,
                        z: 0.7493097186088562,
                        ease: "back.out(2.5)",
                        duration: 0.15,
                        delay: 0.15 * (count - 29),
                    },
                    "match4"
                )
                count += 1;
            }
            */
        });
    }

    onScroll(e: any) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e: any) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e: any) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.firstScroll);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove)
    }

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.firstScroll = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.firstScroll);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove)
    }

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        console.log("GO!");
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        this.room.scale.set(0.7493097186088562, 0.7493097186088562, 0.7493097186088562);
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}