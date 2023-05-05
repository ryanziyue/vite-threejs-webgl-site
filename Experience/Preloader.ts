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
    secondTimeline: any;
    firstScroll: any;

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
                        onComplete: resolve,
                    }
                );
            }
            })        
    }

    secondIntro() {
        return new Promise((resolve: any) => {
            this.secondTimeline = new (GSAP.timeline as any);

            this.secondTimeline.to(
                this.room.position,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                },
                "match",
                ).to(
                this.roomChildren.Cube.rotation,
                {
                    y: 2 * Math.PI + Math.PI / 4,
                },
                "match",
            ).to(
                this.roomChildren.Cube.scale,
                {
                    x: 1.1,
                    y: 1.1,
                    z: 1.1,
                },
                "match",
            ).to(
                this.camera.orthographicCamera.position,
                {
                    y: 4.5,
                },
                "match",
            ).to(
                this.roomChildren.Cube.position,
                {
                    x: 0,
                    y: 1.45794,
                    z: -0.002677,
                },
                "match",
            ).set(
                this.roomChildren.Room.scale,
                {
                    x: 0.7493097186088562,
                    y: 0.7493097186088562,
                    z: 0.7493097186088562,
                    ease: "power1.out",
                    delay: 0.4,
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
            );
            delete this.roomChildren["Cube"];
            console.log(this.roomChildren);
        });
    }

    onScroll(e: any) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.firstScroll);
    }

    async playIntro() {
        await this.firstIntro();
        this.firstScroll = this.onScroll.bind(this);
        window.addEventListener("wheel", this.firstScroll);
    }

    async playSecondIntro() {
        await this.secondIntro();
    }
}