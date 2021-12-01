import Simplex from "simplex-noise";

const CHUNK_SIZE = 32;

class ChunkGenerator {
    noise: Simplex;
    seed: string;

    scale = 5
    octaves = 6
    persistence = 0.5
    lacunarity = 2.0

    constructor(seed: string) {
        this.seed = seed;
        this.noise = new Simplex(seed);
    }


    generateChunk(chunkX: number, chunkY: number) {
        const ground: number[][] = [];


        // rows
        for(let x = 0; x < CHUNK_SIZE; x++) {
            const row = [];

            for(let y = 0; y < CHUNK_SIZE; y++) {
                

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
                        value = value / 1.5;
                        // value = value / (1 + this.persistence);
                    } else {
                        value += sample;
                    }
                }

                // console.log(value);

                if(value < 0.55) {
                    row.push(714);
                } else {
                    row.push(55);
                }

            }

            ground.push(row);
            // columns 
        }


        return({
            ground
        })

    }


}


export default ChunkGenerator;