const CHUNK_SIZE = 64;

class ChunkGenerator {

    

    seed: string;
    constructor(seed: string) {
        this.seed = seed;
    }


    generateChunk(chunkX: number, chunkY: number) {
        const ground: number[][] = [];

        // rows
        for(let y = 0; y < CHUNK_SIZE; y++) {
            const row = [];

            for(let x = 0; x < CHUNK_SIZE; x++) {
                row.push(55);
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