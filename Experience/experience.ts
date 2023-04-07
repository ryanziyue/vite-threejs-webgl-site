import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

import Camera from "./Camera";
import Renderer from "./Renderer";

import World from "./World/World";

export default class Experience {
	canvas: any;
	scene: any;
	sizes: any;
	camera: any;
	renderer: any;
	time: any;
	world: any;
	static instance: any;

	constructor(canvas: any) {
		if (Experience.instance) {
			return Experience.instance;
		}

		Experience.instance = this;
		this.canvas = canvas;
		this.scene = new THREE.Scene();
		this.sizes = new Sizes();
		this.time = new Time();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();

		this.time.on("update", () => {
			this.update();
		})

		this.sizes.on("resize", () => {
			this.resize();
		})

	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.renderer.update();
	}

}