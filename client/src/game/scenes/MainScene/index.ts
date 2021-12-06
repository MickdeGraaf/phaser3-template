import Phaser, { Scene } from "phaser";
import Terrain from "../../objects/Terrain";
import Player from "../../objects/Player";
import playerSprite from "../../assets/cozyCharacters/walk/char4_walk.png";
import MultiPlayerConnector from "../../objects/MultiPlayerConnector";
import Chunk from "../../objects/Chunk";
import Tile from "../../objects/Tile";
import tileImage from "../../assets/cozyFarm/tiles/tiles.png";

class MainScene extends Scene {

    // terrain: Terrain;
    player: Player | null = null;
    multiplayerConnector: MultiPlayerConnector | null = null;
    chunks: Chunk[] = [];
    chunkSize = 32;
    tileSize = 16;
    constructor() {
        super({key: "MainScene"});
        // this.terrain = new Terrain(this);
        // console.log(playerSprite);
    }


    preload() {
        this.player = new Player(this, 0, 0);
        // this.terrain.preload();
        this.player.preload();
        this.multiplayerConnector = new MultiPlayerConnector(this.player);
        this.multiplayerConnector.connect("http://192.168.255.36:8081/");
        this.load.image('tileImage', tileImage);
        this.load.spritesheet('tilesSprite', tileImage, {frameWidth: 16, frameHeight: 16});
        // new Tile(this, 0, 0, 755).preload();
        // @ts-ignore
    }

    create() {
        // this.terrain.create();
        // @ts-ignore
        this.add.sprite(this.player);
        // @ts-ignore
        this.player.create();

        this.cameras.main.zoom = 1;
        //@ts-ignore
        this.cameras.main.startFollow(this.player);


        // var newChunk = new Chunk(this, 0, 0);
        // var newChunk2 = new Chunk(this, 0, 1);
        // this.chunks.push(newChunk);
        // this.chunks.push(newChunk2);
        // newChunk.load();
        // newChunk2.load();
    }

    update() {
        this.player && this.player.update();
        this.multiplayerConnector && this.multiplayerConnector.update();

        this.handleChunks();
    }

    handleChunks() {
        if(!this.player) {
            return;
        }

        // console.log(this.player.x, this.player.y);

        let snappedChunkX = Math.round(this.player.x / (this.chunkSize * this.tileSize));
        let snappedChunkY = Math.round(this.player.y / (this.chunkSize * this.tileSize));
        
        // handle off set -0
        if(this.player.x < 0) {
            snappedChunkX = snappedChunkX - 1;
        }

        if(this.player.y < 0) {
            snappedChunkY = snappedChunkY - 1;
        }

        // console.log({
        //     snappedChunkX,
        //     snappedChunkY
        // });


        // create chunk in 2 chunk radius
        const radius = 1;


        for(let x = snappedChunkX - radius; x <= snappedChunkX + radius; x ++) {
            for(let y = snappedChunkY - radius; y <= snappedChunkY + radius; y ++) {
                var existingChunk = this.getChunk(x, y);
        
                if (existingChunk == null) {
                    var newChunk = new Chunk(this, x, y);
                    // newChunk.load();
                    this.chunks.push(newChunk);
                }
            }
        }


        for (let i = this.chunks.length - 1; i >=0 ; i --) {
            const chunk = this.chunks[i];
            // console.log(chunk);

            if(this.getDiff(snappedChunkX, chunk.x) > radius || this.getDiff(snappedChunkY, chunk.y) > radius ) {
                // console.log(`Loading chunk: ${chunk.x}, ${chunk.y}`);
                chunk.unload();
                this.chunks.splice(i, 1);
                // i --;
            } else {
                chunk.load();
                // console.log(`Unloading chunk: ${chunk.x}, ${chunk.y}`;
            }

        }
        
        console.log("Chunk lenghth 2:", this.chunks.length);
        
    }

    getChunk(x: number, y: number) {
        var chunk = null;
        for (var i = 0; i < this.chunks.length; i++) {
            if (this.chunks[i].x == x && this.chunks[i].y == y) {
                chunk = this.chunks[i];
            }
        }
        return chunk;
    }

    getDiff(value: number, oldValue: number) {
        return value > oldValue ? value - oldValue : oldValue - value;
    }
}

export default MainScene;