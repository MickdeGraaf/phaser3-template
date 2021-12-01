import { io, Socket } from "socket.io-client";
import Player from "./Player";
import Character from "./Character";
import { DECLARATION_TYPES } from "@babel/types";

class MultiPlayerConnector {
    
    active = false;
    socket: Socket | null = null;
    player: Player;

    characters = {};

    constructor(player: Player) {
        this.player = player;
    }

    connect(serverAddress: string) {
        this.socket = io(serverAddress);

        this.socket.on("connect", () => {
            if(!this.socket) {
                return
            }
            console.log("connected to ", serverAddress);
            console.log("id", this.socket.id); 
        });

        this.socket.on("update", (players) => {
            // console.log(players);

            // @ts-ignore
            // delete this.characters[this.socket.id]

            for (const key in players) {

                // @ts-ignore
                if(key == this.socket.id) {
                    continue;
                }

                // @ts-ignore
                this.characters[key] = { ...this.characters[key], ...players[key], lastUpdate: Date.now()};

                // @ts-ignore
                if(!this.characters[key].sprite) {
                    // @ts-ignore
                    this.characters[key].sprite = new Character(this.player.scene, this.characters[key].x, this.characters[key].y);
                    // @ts-ignore
                    this.characters[key].sprite.create();
                    // @ts-ignore
                    
                };
                
                // @ts-ignore
                const sprite: Character = this.characters[key].sprite;
                // console.log(sprite);

                // @ts-ignore
                sprite.setPlayerState(this.characters[key].state);

                // @ts-ignore
                sprite.x = this.characters[key].x;
                // @ts-ignore
                sprite.y = this.characters[key].y;

                // sprite.setPlayerState("walk-up");
                // console.log(this.characters)
            }

        })

        this.active = true;
    }


    update() {
        if(!this.active || !this.socket || !this.socket.connected || !this.player) {
            return;
        }
        // console.log("update");

        // console.log("sending update");
        this.socket.emit("update", {
            x: this.player.x,
            y: this.player.y,
            state: this.player.state
        });

        for (const key in this.characters) {
            // @ts-ignore
            const character = this.characters[key];

            // cleanup non updated sprites
            if(character.lastUpdate < Date.now() - 1000) {
                character.sprite.destroy();
                // @ts-ignore
                delete this.characters[key];
            }
        }

    }


}

export default MultiPlayerConnector;