import { Scene } from "phaser";
import playerSprite from "../assets/cozyCharacters/walk/char4_walk.png";

class Character extends Phaser.GameObjects.Sprite {

    state: string = "idle-down";
    keyInputs: Phaser.Types.Input.Keyboard.CursorKeys | null = null;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, "playerSprite", 0);
        this.scene.add.existing(this);
        this.depth = 1;
    }

    preload() {
        this.scene.load.spritesheet('playerSprite', playerSprite, { frameWidth: 256 / 8, frameHeight: 32 });
    }

    create() {

        this.keyInputs = this.scene.input.keyboard.createCursorKeys();

        this.setTexture("playerSprite");
        this.anims.create({
            key: "walk-down",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("playerSprite", { start: 0, end: 7 }),
            repeat: -1
        });
        this.anims.create({
            key: "walk-up",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("playerSprite", { start: 8, end: 15 }),
            repeat: -1
        });
        this.anims.create({
            key: "walk-right",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("playerSprite", { start: 16, end: 23 }),
            repeat: -1
        });
        this.anims.create({
            key: "walk-left",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("playerSprite", { start: 24, end: 31 }),
            repeat: -1
        });
        this.anims.create({
            key: "idle-down",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("playerSprite", { start: 0, end: 0 }),
            repeat: -1
        });
        this.anims.create({
            key: "idle-up",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("playerSprite", { start: 8, end: 8 }),
            repeat: -1
        });
        this.anims.create({
            key: "idle-right",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("playerSprite", { start: 16, end: 16 }),
            repeat: -1
        });
        this.anims.create({
            key: "idle-left",
            frameRate: 7,
            frames: this.anims.generateFrameNumbers("playerSprite", { start: 24, end: 24 }),
            repeat: -1
        });

        // this.scene.add.image(0, 0, 'playerSprite', 0).setOrigin(0, 0);
        console.log("running player create")
        // this.anim.setCurrentFrame(1);
        // this.anims.play("walk-left");
    }

    
    
    setPlayerState(state: string) {
        if(this.state == state) {
            return;
        }
         console.log("changing animation");
        this.anims.play(state);
        this.state = state;
    }

}

export default Character;