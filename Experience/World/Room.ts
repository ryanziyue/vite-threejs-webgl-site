import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
    experience: any;
    scene: any;
    resources: any;
    room: any;
    actualRoom: any;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
    
        this.setModel();
        this.setAnimation();
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

    resize() {

    }

    update() {
    }
}