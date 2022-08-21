import * as THREE from "three ";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";

import World from "./World/World.js";

export default class experience{
	static instance 
    constructor(canvas){
		if(experience.instance){
			return experience.instance;
		}
		experience.instance = this;
        this.canvas = canvas;
		this.scene = new THREE.Scene();
		this.time = new Time();
		this.sizes = new Sizes();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.resources = new Resources(assets);
		this.theme = new Theme();
		this.world = new World();
		
		this.sizes.on("resize", () => {
			this.resize();
			//console.log(this.resize.postionZ);
		})

		this.time.on("update", () => {
			this.update();
		})
    }

	resize(){
		this.camera.resize();
		this.world.resize();
		this.renderer.resize();
	}

	update(){
		this.camera.update();
		this.world.update();
		this.renderer.update();
	}
}