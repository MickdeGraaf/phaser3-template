import Phaser from "phaser";
import config from "./config";

class Game extends Phaser.Game {
    constructor(parent: any) {
        super({parent: parent, ...config})
    }

    preload() {

    }

    create() {
        // this.game.make
    }
}

export default Game;