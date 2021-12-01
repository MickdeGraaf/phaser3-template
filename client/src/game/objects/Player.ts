import Character from "./Character";

class Player extends Character {
    update() {
        this.handleControls();
    }

    handleControls() {

        // console.log("doing controls");

        if(!this.keyInputs) {
            return;
        }

        if(this.keyInputs.left.isDown){
            this.x = this.x - 2;
            this.setPlayerState("walk-left");
        }
        else if(this.keyInputs.right.isDown){
            this.x = this.x + 2;
            this.setPlayerState("walk-right");
        }
        else if(this.keyInputs.up.isDown){
            this.y = this.y - 2;
            this.setPlayerState("walk-up");
        }
        else if(this.keyInputs.down.isDown){
            this.y = this.y + 2;
            this.setPlayerState("walk-down");
        }
        else { 
            this.setPlayerState(this.state.replace("walk", "idle"))
        }
          
    }
}

export default Player;