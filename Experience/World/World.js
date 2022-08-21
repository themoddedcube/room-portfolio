import * as THREE from "three";
import experience from "../experience.js";

import Room from "./Room.js";
import Environment from "./Environment.js";

export default class World{
     constructor(){
        this.experience = new experience();
		this.sizes = this.experience.sizes;
        this.scene  = this.experience.scene;
        this.canvas  = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
        })

    }

    resize() {

    }

    update() {
        if(this.room){
            this.room.update();
        }
    }
}