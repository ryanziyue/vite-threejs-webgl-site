import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Room {
    experience: any;
    scene: any;
    resources: any;
    room: any;
    actualRoom: any;
    lerp: any;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
    
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach( (child: { castShadow: any; receiveShadow: any; }) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

        })
        this.scene.add(this.actualRoom);
    }

    setAnimation() {
        
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e: any) => {
            console.log(e);
        })
    }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate (
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
    }
}