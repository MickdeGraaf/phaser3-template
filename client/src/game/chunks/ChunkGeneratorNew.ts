import Simplex from "simplex-noise";
import {default as memoize} from "memoizee";
const CHUNK_SIZE = 32;

class ChunkGenerator {
    noise: Simplex;
    seed: string;

    scale = 6
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0

    constructor(seed: string) {
        this.seed = seed;
        this.noise = new Simplex(seed);
    }


    generateChunk(chunkX: number, chunkY: number) {
        const ground: string[][] = [];


        // rows
        for(let y = 0; y < CHUNK_SIZE; y++) {
            const row = [];

            for(let x = 0; x < CHUNK_SIZE; x++) {
                

                let value = 0;

                for(let i = 0; i < this.octaves; i ++) {

                    const scale = this.scale * ((i + 1) * this.lacunarity)
                    // console.log(scale);
                    const sample = (this.noise.noise2D(
                        ((chunkX * CHUNK_SIZE) + x) / scale,// * this.scale,
                        ((chunkY * CHUNK_SIZE) + y) / scale,// * this.scale,
                    ) + 1) / 2; 

                    // console.log(sample);

                    // normalise to 1
                    if(i != 0) {
                        value += (sample * this.persistence);
                        value = value / (1 + this.persistence);
                        // value = value / (1 + this.persistence);
                    } else {
                        value += sample;
                    }
                }

                
                if(value < 0.6) { //land
                    row.push("land");
                } else { //water
                    row.push("water");
                }
                

                // console.log(value);

                // row.push(value);

            }

            ground.push(row);
            // columns 
        }


        return({
            x: chunkX,
            y: chunkY,
            ground
        })

    }

    generateChunkMemoized = memoize(this.generateChunk);


}


export default ChunkGenerator;