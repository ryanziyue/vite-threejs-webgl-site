import { PlaneGeometry } from "three";
import { MeshStandardMaterial } from "three";
import { Mesh } from "three";
import Experience from "../Experience";

export default class Floor {
    experience: Experience;
    scene: any;
    geometry: any;
    material: any;
    plane: any;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;

        this.setFloor();
    }

    setFloor() {
        this.geometry = new PlaneGeometry(100, 100);
        this.material = new MeshStandardMaterial({
            color: 0xffffff,
        })
        this.plane = new Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = - Math.PI / 2;
        this.plane.position.y = -0.1;
        this.plane.receiveShadow = true;
    }

    resize() {

    }

    update() {

    }


}