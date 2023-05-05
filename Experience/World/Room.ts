import { Group } from "three";
import { RectAreaLight } from "three";
import Experience from "../Experience";
import GSAP from "gsap";
// import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

export default class Room {
    experience: Experience;
    scene!: THREE.Scene;
    resources: any;
    room: any;
    actualRoom: any;
    roomChildren: any;
    lerp: any;
    rotation: any;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
    
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
        this.actualRoom.children.forEach( (child: { 
                castShadow: boolean;
                receiveShadow: boolean;
                scale: any;
                position: any;
                rotation: any;
                name: any;
            }) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof Group) {
                child.children.forEach((groupchild: any) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            child.scale.set(0, 0, 0);
            if (child.name==="Cube") {
                child.scale.set(0.15, 0.15, 0.15);
                child.position.set(0, 0.2, 0);
                child.rotation.y = Math.PI / 4;
            }
            
            this.roomChildren[child.name] = child;
        })

        const width = 0.25;
        const height = 0.25;
        const intensity = 1;
        const rectLight = new RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( 0.5643317699432373, 1.1841734552383423, -0.2813844382762909 );
        rectLight.lookAt(0.6643317699432373, 0.2441734552383423, 0.2413844382762909 );
        this.actualRoom.add( rectLight );
        
        this.roomChildren["rectLight"] = rectLight;

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
    }

    setAnimation() {}

    onMouseMove() {
        window.addEventListener("mousemove", (e: any) => {
            this.rotation = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            this.lerp.target = this.rotation;
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

        this.actualRoom.rotation.y = this.lerp.current;
    }


}