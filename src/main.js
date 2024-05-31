import { Physics } from 'phaser';
import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { WarningStart } from './scenes/IntroScenes/Warning';
import { FlashWarning } from './scenes/IntroScenes/FlashWarning';
import { TopiJ } from './scenes/IntroScenes/TopiJ';
import { TitleScreen } from './scenes/IntroScenes/TitleScreen';
import { MainMenu } from './scenes/IntroScenes/MainMenu';
import { IntroTextScene } from './scenes/IntroScenes/IntroTextScene';
import { FerryScene } from './scenes/IntroScenes/FerryScene';
import { IonaPort } from './scenes/MapScenes/IonaPort';
import { Preloader } from './scenes/Preloader';
import  PhaserNavMeshPlugin  from "phaser-navmesh"
import { Warning } from './scenes/IntroScenes/Warning';



//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 360,
    parent: 'game-container',
    //backgroundColor: '#028af8',
    pixelArt: true,
    
    roundPixels: true,
    
    fps: {
        target: 60,
        //forceSetTimeOut : false,
        //deltaHistory: 10
    },

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
        IntroTextScene,
        FerryScene,
        IonaPort,
        Game,
        GameOver
    ],
    physics: {
        
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            //debug: true,
            //fixedStep: true
        },
        
    } 
};

export default new Phaser.Game(config);
