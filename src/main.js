import { Physics } from 'phaser';
import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { WarningStart } from './scenes/Warning';
import { FlashWarning } from './scenes/FlashWarning';
import { TopiJ } from './scenes/TopiJ';
import { TitleScreen } from './scenes/TitleScreen';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import  PhaserNavMeshPlugin  from "phaser-navmesh"
import { Warning } from './scenes/Warning';



//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    parent: 'game-container',
    //backgroundColor: '#028af8',
    pixelArt: true,
    fixedStep: false,
    
    fps: 300,

    plugins: {
        scene: [
          {
            key: "PhaserNavMeshPlugin", // Key to store the plugin class under in cache
            plugin: PhaserNavMeshPlugin, // Class that constructs plugins
            mapping: "navMeshPlugin", // Property mapping to use for the scene, e.g. this.navMeshPlugin
            start: true
          }
        ]
      },

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        
    },
    
    scene: [
    
        Boot,
        Preloader,
        WarningStart,
        FlashWarning,
        TopiJ,
        TitleScreen,
        MainMenu,
        Game,
        GameOver
    ],
    physics: {
        
        default: "arcade",
        arcade: {
            gravity: 0,
            debug: true,
            fixedStep: true
        },
        
    } 
};

export default new Phaser.Game(config);
