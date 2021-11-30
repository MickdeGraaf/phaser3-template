import Phaser, { Scene } from "phaser";
import Terrain from "../../objects/Terrain";
import Player from "../../objects/Player";
import playerSprite from "../../assets/cozyCharacters/walk/char4_walk.png";

class MainScene extends Scene {

    terrain: Terrain;
    player: Player | null = null;

    constructor() {
        super({key: "MainScene"});
        this.terrain = new Terrain(this);

        console.log(playerSprite);
        
    }

    preload() {
        this.player = new Player(this, 0, 0);
        this.load.spritesheet('playerSprite', playerSprite, { frameWidth: 16, frameHeight: 20 });
        this.player.preload();
        this.terrain.preload();
        
    }

    create() {
        this.terrain.create();
    }

}

export default MainScene;