import { Scene } from "phaser";

import tileImage from "../assets/cozyFarm/tiles/tiles.png";

class Tile extends Phaser.GameObjects.Sprite {

    scene: Scene;
    // x: number;
    // y: number;
    frameNumber: number;
    

    constructor(scene: Scene, x: number, y: number, frame: number) {
        // scene.load.spritesheet('tilesSprite', tileImage, {frameWidth: 16, frameHeight: 16});

        super(scene, x, y, "tilesSprite");
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0);
        this.setTexture("tilesSprite");
        this.setFrame(frame);
        this.frameNumber = frame;
        // const tileset = this.map.addTilesetImage("tileImage", "tileImage", 16, 16, 0, 0);
    }

    create() {
        this.setTexture("tilesSprite");
        this.setFrame(this.frameNumber);
    }


    preload() {
        // this.scene.load.image('tilesSprite', tileImage);
        // this.scene.load.spritesheet('tilesSprite', tileImage, {frameWidth: 16, frameHeight: 16});
        this.setFrame(this.frameNumber);
    }
}

export default Tile;