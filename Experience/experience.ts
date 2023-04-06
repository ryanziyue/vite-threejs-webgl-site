import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";

export default class Experience {
  canvas: any;
  scene: any;
  sizes: any;
  camera: any;
  renderer: any;
  static instance: any;
  
  constructor(canvas: any) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
  }
}