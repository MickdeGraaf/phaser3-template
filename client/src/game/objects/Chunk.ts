
import Phaser, { Scene } from "phaser";
import ChunkGenerator from "../chunks/ChunkGeneratorNew";
import Tile from "./Tile";

class Chunk {

    scene: Scene;
    x: number;
    y: number;
    tiles: Phaser.GameObjects.Group;
    isLoaded: boolean;
    seed: string = "420";
    chunkGenerator = new ChunkGenerator(this.seed);

    constructor(scene: Scene, x:number, y:number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.tiles = this.scene.add.group();
        this.isLoaded = false;
    }

    unload() {
        if (this.isLoaded) {
            this.tiles.clear(true, true);
            this.isLoaded = false;
        }
        
    }

    load() {
        if (!this.isLoaded) {
            const chunk = this.chunkGenerator.generateChunk(this.x, this.y);

            for(let x = 0; x < chunk.ground.length; x++) {
                for(let y = 0; y < chunk.ground[x].length; y++) {
                    const value = chunk.ground[x][y];

                    const CHUNK_SIZE = 32;

                    var tileX = (this.x * (CHUNK_SIZE * 16)) + (x * 16);
                    var tileY = (this.y * (CHUNK_SIZE * 16)) + (y * 16);

                    let frame = 0;

                    if(value < 0.6) {
                        frame = 55;
                    } else {
                        frame = 714;
                    }

                    var tile = new Tile(this.scene, tileX, tileY, frame);
                    this.tiles.add(tile);
                }
            }

        }

        this.isLoaded = true;
    }
}

export default Chunk;