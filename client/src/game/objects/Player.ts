import { Scene } from "phaser";
import playerSprite from "../assets/cozyCharacters/walk/char4_walk.png";

class Player extends Phaser.GameObjects.Sprite {

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "playerSprite");
    }

    preload() {
        
    }

}

export default Player;