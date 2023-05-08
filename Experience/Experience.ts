import { Scene } from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import assets from "./Utils/assets";
import Resources from "./Utils/Resources";

import Camera from "./Camera";
import Renderer from "./Renderer";
import Theme from "./Theme";
import Preloader from "./Preloader";
import Controls from "./Controls";

import World from "./World/World";
import { EventEmitter } from "events";

export default class Experience extends EventEmitter{
	canvas: any;
	scene!: THREE.Scene;
	sizes: any;
	time: any;
	camera: any;
	renderer: any;
	theme: any;
	preloader: any;
	resources: any;
	world: any;
	controls: any;
	static instance: any;

	constructor(canvas: any) {
		super();

		if (Experience.instance) {
			return Experience.instance;
		}

		Experience.instance = this;
		this.canvas = canvas;
		this.scene = new Scene();
		this.sizes = new Sizes();
		this.time = new Time();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.resources = new Resources(assets);
		this.theme = new Theme();
		this.world = new World();
		this.preloader = new Preloader();

		this.preloader.on("enablecontrols", () => {
			this.controls = new Controls();
			this.emit("startSmoothScroll");
		});

		this.time.on("update", () => {
			this.update();
		});

		this.sizes.on("resize", () => {
			this.resize();
		});
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
		this.world.resize();
	}

	update() {
		this.preloader.update()
		this.camera.update();
		this.renderer.update();
		this.world.update();
	}

}