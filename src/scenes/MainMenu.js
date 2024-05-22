import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {

        this.topiText = this.add.bitmapText(80, 15, "baseFont", "Topi Järvinen 2024", 16).setOrigin(0.5,0.5)
        this.topiText.depth = 5

        this.scalableTitle = this.add.sprite(150, 100, 'scalableTitle').setOrigin(0.5,0.5)
        //let texture = this.textures.get("scalableTitle")
        //texture.setFilter(Phaser.Textures.FilterMode.NEAREST)
        this.scalableTitle.depth = 5
        this.scalableTitle.scale = 0.4

        this.lights.enable().setAmbientColor(0x000000);

        this.walkingPlayer = this.add.sprite(280, 110, "player");
        this.walkingPlayer.depth = 2
        this.walkingPlayer.setPipeline("Light2D")

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'detective ',
                suffix: '.aseprite',
                start: 9,
                end: 16,
                zeroPad: 1
            }),
            frameRate: 5,
            repeat: -1
        })
        this.walkingPlayer.anims.play("walk")

        this.light = this.lights.addLight(310,95,100)
        this.light.depth = 3


        //this.bgTest = this.add.rectangle(320,130, 640, 34, 0x00ff00)
        //this.bgTest.setPipeline("Light2D")

        this.mainMenuBG = this.add.tileSprite(320, 115, 0, 0, 'mainMenuBG2').setOrigin(0.5,0.5)
        this.mainMenuBG.setPipeline("Light2D")
        this.mainMenuBG.depth = 0

        
    }

    update() {
        this.mainMenuBG.tilePositionX += 0.5
    }
}
