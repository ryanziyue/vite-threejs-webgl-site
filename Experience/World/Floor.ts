import {
    PlaneGeometry, 
    MeshStandardMaterial,
    Mesh,
    CircleGeometry,
} from "three";
import Experience from "../Experience";

export default class Floor {
    experience: Experience;
    scene!: THREE.Scene;
    geometry: any;
    material: any;
    plane: any;
    circleFirst!: THREE.Mesh;
    circleSecond!: THREE.Mesh;
    circleThird!: THREE.Mesh;

    constructor() {
        this.experience = new Experience("");
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();
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

    setCircles() {
        const geometry = new CircleGeometry( 5, 32 ); 
        const material1 = new MeshStandardMaterial( { color: 0x97B1AB } );
        const material2 = new MeshStandardMaterial( { color: 0x8395CD } );
        const material3 = new MeshStandardMaterial( { color: 0xf6b4bd } ); 
        this.circleFirst = new Mesh( geometry, material1 );
        this.circleSecond = new Mesh( geometry, material2 );
        this.circleThird = new Mesh( geometry, material3 );

        this.circleFirst.position.y = -0.09;
        this.circleSecond.position.y = -0.08;
        this.circleThird.position.y = -0.07;

        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.position.set(0,0,0);
        this.circleThird.position.set(0,0,0);

        this.circleFirst.rotation.x =
            this.circleSecond.rotation.x =
            this.circleThird.rotation.x = 
                -Math.PI / 2;

        this.circleFirst.receiveShadow =
        this.circleSecond.receiveShadow =
        this.circleThird.receiveShadow =
            true;

        this.scene.add( this.circleFirst );
        this.scene.add( this.circleSecond );
        this.scene.add( this.circleThird );
    }

    resize() {

    }

    update() {

    }


}