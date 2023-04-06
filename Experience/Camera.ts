import * as THREE from "three";
import Experience from "./Experience";
import { EventEmitter } from "events";

export default class Camera extends EventEmitter {
  experience: any;
  sizes: any;
  scene: any;
  canvas: any;
  frustrum: any;
  perspectiveCamera: any;
  orthographicCamera: any;

  constructor() {
    super();
    this.experience = new Experience("");
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera() ;
    this.createOrthographicCamera();

    console.log(this.experience, this.sizes, this.scene, this.canvas);
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35, this.sizes.aspect, 0.1, 1000
    );
    this.scene.add(this.perspectiveCamera);
  }

  createOrthographicCamera() {
    this.frustrum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum/2, -this.sizes.frustrum/2,
      -100, 100
    );
    this.scene.add(this.orthographicCamera);
  }

  resize() {
    //resizing perspective camera
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    //resizing orthographic camera
    this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum/2;
    this.orthographicCamera.bottom = -this.sizes.frustrum/2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    window.requestAnimationFrame(() => this.update());
  }
}