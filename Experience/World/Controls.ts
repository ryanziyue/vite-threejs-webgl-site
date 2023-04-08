import Experience from "../Experience";

export default class Controls {
    experience: any;
    scene: any;
    resources: any;
    camera: any;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;

    }

    resize() {

    }

    update() {
    }
}