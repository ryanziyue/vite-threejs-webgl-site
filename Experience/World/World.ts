import * as THREE from "three";
import Experience from "../Experience";

import Room from "./Room"

export default class World {
    experience: any;
    sizes: any;
    scene: any;
    canvas: any;
    camera: any;
    renderer: any;
    room: any;

    constructor() {
        this.experience = new Experience("");
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.room = new Room();
    }
    resize() {

    }

    update() {
    }
}