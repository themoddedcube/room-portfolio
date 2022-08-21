import * as THREE from "three ";
import experience from "../experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room{
     constructor(){
        this.experience = new experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            // console.log(this.actualRoom);

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }


            if(child.name === "Aquarium"){
                // console.log(child);
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
            }
            
            if(child.name === "Computer"){
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            if(child.name === "MiniFloor"){
                // child.position.x = 1.21696;
                child.position.x = .2;
                child.position.z = 6.82473;
            }

            if(
                child.name === "Mailbox" || 
                child.name === "Lamp" || 
                child.name === "FloorFirst" || 
                child.name === "FloorSecond" || 
                child.name === "FloorThird" || 
                child.name === "Dirt" ||
                child.name === "Flower1" ||
                child.name === "Flower2"
            ) {
                child.scale.set(0, 0, 0);
            }

            
        });

        const width = 1;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set(7.74153, 8, .5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = 1.2 * Math.PI / 1;
        this.actualRoom.add( rectLight );    

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );
        // console.log(this.room);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[8]);
        
        this.swim.play();
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX-window.innerWidth/2)*2)/window.innerWidth;
            this.lerp.target = this.rotation*.1;

        });
    }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * .0009);
    }
}