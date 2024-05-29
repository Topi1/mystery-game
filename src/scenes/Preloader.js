import { Scene } from 'phaser';
import SoundController from './SoundController';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');


        //FONTS
        this.load.bitmapFont('baseFont', 'fonts/baseFont_0.png', 'fonts/baseFont.fnt')

        //AUDIO
        //Songs
        this.load.audio("introSong", "audio/introSong.mp3")
        //Other audio
        this.load.audio("classicClick", "audio/classicClick.mp3")
        this.load.audio("interfaceClick", "audio/interfaceClick.mp3")
        this.load.audio("ferrySound", "audio/ferrySound.mp3")
        this.load.audio("typeWriter", "audio/typeW.mp3")
        this.load.audio("woodWalk", "audio/woodWalk.mp3")

        //VIDEOS
        this.load.video("ferryVid", "videos/ferryVid.mp4")


        //LOGOS

        this.load.atlas("TJlogo", "TopiLogo.png", "TopiLogo.json")
        this.load.atlas("TitleLogo", "TitleLogo.png", "TitleLogo.json")

        this.load.image("upTitle", "logos/TitleLogo1.png")
        this.load.image("downTitle", "logos/TitleLogo2.png")

        this.load.atlas("TitleLogoAnim", "logos/TitleLogoAnim.png", "logos/TitleLogoAnim.json")

        this.load.image("shadowHand", "logos/TitleShadow.png")

        this.load.image("blackOpacity", "logos/blackOpacity.png")

        this.load.image("titleClickUp", "logos/TitleRdy1.png")
        this.load.image("titleClickDown", "logos/TitleRdy2.png")

        this.load.image("scalableTitle", "logos/TitlePng.png")


        //TILEMAPS
        //this.load.image("tiles", "tiles.png")
        this.load.image("lowWallTiles", "roofTiles.png")
        this.load.image("objectTiles", "tiles.png")
        this.load.image("highWallTiles", "walls.png")
        this.load.image("floorTiles2", "floortiles2.png")

        this.load.tilemapTiledJSON("map", "testtiles")

        this.load.tilemapTiledJSON("demomap", "demo")

        //BACKGROUNDS
        this.load.image("mainMenuBG", "backgrounds/MainMenuBG.png")
        this.load.image("mainMenuBG2", "backgrounds/MainMenuBG2.png")


        //CHARACTERS
        this.load.atlas("player", "detective.png", "detective.json")

        //UI
        this.load.spritesheet("menuButton", "UI/menuBtn.png", {frameWidth: 132, frameHeight: 38})
        this.load.spritesheet("menuIcons", "UI/menuIcons.png", {frameWidth: 38, frameHeight: 38})
        this.load.image("plusIcon", "UI/plusIcon.png")

    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        const soundManager = new SoundController(this);
        soundManager.addSounds();
        this.game.registry.set('soundManager', soundManager);
        

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("Warning");
    }
}
