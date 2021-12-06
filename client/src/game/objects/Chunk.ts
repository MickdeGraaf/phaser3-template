
import Phaser, { Scene } from "phaser";
import ChunkGenerator from "../chunks/ChunkGeneratorNew";
import Tile from "./Tile";

const CHUNK_SIZE = 32;



class Chunk {

    scene: Scene;
    x: number;
    y: number;
    tiles: Phaser.GameObjects.Group;
    isLoaded: boolean;
    seed: string = "420";
    chunkGenerator = new ChunkGenerator(this.seed);
    // @ts-ignore
    map: Phaser.Tilemaps.Tilemap

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
            this.map.destroy();
            this.isLoaded = false;
        }
        
    }

    load() {
        if (!this.isLoaded) {
            this.map = this.scene.make.tilemap({key: "map", tileWidth: 16, tileHeight: 16, height: 64, width: 64})
            const tileset = this.map.addTilesetImage("tileImage", "tileImage", 16, 16, 0, 0);

            // Create an empty layer and give it the name "Layer 1"
            const layer = this.map.createBlankLayer("Layer 1", tileset);
            const chunk = this.chunkGenerator.generateChunkMemoized(this.x, this.y);

        

            // const groundTileIds = groundTiles.map((row) => {
            //     return row.map((cell) => {
            //         return if()
            //     })
            // });

            layer.putTilesAt(this.groundChunkToTiles(chunk), 0, 0);

            // this.map.setCollision(714);

            layer.setPosition(
                this.x * (CHUNK_SIZE * 16),
                this.y * (CHUNK_SIZE * 16)
            );

        }

        this.isLoaded = true;
    }


    groundChunkToTiles(chunk: any): number[][] {
        return chunk.ground.map((row: any, y: number) => {
            return row.map((tile: any, x: number) =>  {
                if(tile == "water") {

                    const neigbourTiles = this.fetchGroundNeighbourTiles(chunk, x, y);
                    
                    // water beneath land
                    if(neigbourTiles.top == "land" && neigbourTiles.bottom != "land") {
                        return(757);
                    }
                    // corner top right land water
                    if(neigbourTiles.left == "water" && neigbourTiles.bottom == "land" && neigbourTiles.right =="water") {
                        return(650)
                    }
                    // water on top of land
                    if(neigbourTiles.bottom == "land" && neigbourTiles.top != "land") {
                        return(711)
                    }
                    

                    return 714;
                } else {
                    return 55;
                }
            })
        })
    }

    fetchGroundNeighbourTiles(chunk: any, x: number, y: number) {
        // above
        const topLeft = this.fetchTile(chunk, x - 1, y - 1);
        const top = this.fetchTile(chunk, x, y - 1);
        const topRight = this.fetchTile(chunk, x + 1, y - 1);

        // left right
        const left = this.fetchTile(chunk, x - 1, y);
        const right = this.fetchTile(chunk, x + 1, y);

        // below
        const bottomLeft = this.fetchTile(chunk, x - 1, y + 1);
        const bottom = this.fetchTile(chunk, x, y + 1);
        const bottomRight = this.fetchTile(chunk, x + 1, y + 1);

        return {
            topLeft,
            top,
            topRight,
            left,
            right,
            bottomLeft,
            bottom,
            bottomRight
        }
        
    }

    fetchTile(chunk:any, x:number, y:number) {
        // fetching tile in other chunk to the left
        let chunkX = chunk.x;
        let chunkY = chunk.y;
        if(x < 0) {
            x = 31;
            chunkX ++;
        }
        // fetching tile in other chunk to the right
        if(x >= CHUNK_SIZE) {
            x = 0;
            chunkX --;
        }
        // fetching tile in other chunk below
        if(y < 0) {
            y = 31;
            chunkY --;
        }
        // fetching tile in other chunk above
        if(y >= CHUNK_SIZE) {
            y = 0;
            chunkY ++;
        }

        const tempChunk = this.chunkGenerator.generateChunkMemoized(chunkX, chunkY);
        // console.log(tempChunk);

        return tempChunk.ground[y][x];

        // return tempChunk.ground[y][x];
    }

    
}

export default Chunk;