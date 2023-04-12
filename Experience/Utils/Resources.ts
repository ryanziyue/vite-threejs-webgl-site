import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import Experience from "../Experience";


export default class Resources extends EventEmitter {
    experience: Experience;
    renderer: any;
    assets: any;
    items: any;
    queue: number;
    loaded: number;
    loaders: any;

    constructor(assets: any) {
        super();
        this.experience = new Experience("");
        this.renderer = this.experience.renderer;

        this.assets = assets;
        
        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading() {
        for (const asset of this.assets) {
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file: any) => {
                    this.singleAssetLoaded(asset, file);
                })
            }
        }
    }

    singleAssetLoaded(asset: any, file: any) {
        this.items[asset.name] = file;
        this.loaded ++;
        // console.log(file);

        if (this.loaded === this.queue) {
            this.emit("ready");
        }
    }
}