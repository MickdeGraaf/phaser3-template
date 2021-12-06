import MainScene from "./scenes/MainScene";
import Phaser from "phaser";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    pixelArt: true,
    roundPixels: true,
    // width: 800,
    // height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [
        new MainScene()
    ],
    scale: {
        // Fit to window
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
        
    },
};

export default config;