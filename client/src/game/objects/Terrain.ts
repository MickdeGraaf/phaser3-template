import Phaser, { Scene } from "phaser";
import ChunkGenerator from "../chunks/ChunkGenerator";

import tileImage from "../assets/cozyFarm/tiles/tiles.png";

class Terrain {

    scene: Scene;
    // @ts-ignore
    map: Phaser.Tilemaps.Tilemap
    chunkGenerator: ChunkGenerator;

    constructor(scene: Scene) {
        this.scene = scene;
        this.chunkGenerator = new ChunkGenerator("kek");
    }

    preload() {
        this.scene.load.image('tileImage', tileImage);
    }

    create() {

        this.map = this.scene.make.tilemap({
            tileWidth: 16,
            tileHeight: 16,
            width: 256,
            height: 256
        });

        // this.map.x

        console.log("creating terrain");

        this.map = this.scene.make.tilemap({key: "map", tileWidth: 16, tileHeight: 16, height: 64, width: 64})
        const tileset = this.map.addTilesetImage("tileImage", "tileImage", 16, 16, 0, 0);

        // Create an empty layer and give it the name "Layer 1"
        const layer = this.map.createBlankLayer("Layer 1", tileset);

        const chunk = this.chunkGenerator.generateChunk(0, 0);

        layer.putTilesAt(chunk.ground, 0, 0);
    }

}

export default Terrain