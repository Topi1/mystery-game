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

        /*this.quoteText = this.add.bitmapText(450, 100, "baseFont", "A person's fears are lighter\n when the danger is at hand.\n\n- Lucius Annaeus Seneca", 16).setOrigin(0.5,0.5)
        this.quoteText.depth = 5*/

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


        

        this.mainMenuBG = this.add.tileSprite(320, 115, 0, 0, 'mainMenuBG2').setOrigin(0.5,0.5)
        this.mainMenuBG.setPipeline("Light2D")
        this.mainMenuBG.depth = 0

        //BUTTONS

        this.newGameBtn = this.add.sprite(300,200, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.newGameBtn.depth = 1
        this.newGameBtn.on('pointerover', () => {this.newGameBtn.setFrame(1), this.newGameBtn.depth = 2,
            this.tweens.add({
                targets: this.plusIcon,
                x: 382,
                duration: 1000,
                ease: "Sine.InOut"
            })
        })
        this.newGameBtn.on('pointerout', () => {this.newGameBtn.setFrame(0), this.newGameBtn.depth = 1,
            this.tweens.add({
                targets: this.plusIcon,
                x: 340,
                duration: 1000,
                ease: "Sine.InOut"
            })
        })
        this.newGameText = this.add.bitmapText(0,0,"baseFont","New Game",16).setDepth(4)
        Phaser.Display.Align.In.Center(this.newGameText, this.newGameBtn);
        this.plusIcon = this.add.image(340,200,"plusIcon")
        this.plusIcon.depth = 0
        this.plusIcon.alpha = 0.6


        this.loadGameBtn = this.add.sprite(340,234, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.loadGameBtn.depth = 1
        this.loadGameBtn.on('pointerover', () => {this.loadGameBtn.setFrame(1), this.loadGameBtn.depth = 2})
        this.loadGameBtn.on('pointerout', () => {this.loadGameBtn.setFrame(0), this.loadGameBtn.depth = 1})
        this.loadGameText = this.add.bitmapText(0,0,"baseFont","Load Game",16).setDepth(4)
        Phaser.Display.Align.In.Center(this.loadGameText, this.loadGameBtn);

        this.settingsBtn = this.add.sprite(300,268, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.settingsBtn.depth = 1
        this.settingsBtn.on('pointerover', () => {this.settingsBtn.setFrame(1), this.settingsBtn.depth = 2})
        this.settingsBtn.on('pointerout', () => {this.settingsBtn.setFrame(0), this.settingsBtn.depth = 1})
        this.settingsText = this.add.bitmapText(270,254,"baseFont","Settings",16).setDepth(4)
        Phaser.Display.Align.In.Center(this.settingsText, this.settingsBtn);

        this.howPlayBtn = this.add.sprite(340,302, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.howPlayBtn.depth = 1
        this.howPlayBtn.on('pointerover', () => {this.howPlayBtn.setFrame(1), this.howPlayBtn.depth = 2})
        this.howPlayBtn.on('pointerout', () => {this.howPlayBtn.setFrame(0), this.howPlayBtn.depth = 1})
        this.howPlayText = this.add.bitmapText(310,286,"baseFont","How To Play",16).setDepth(4)
        Phaser.Display.Align.In.Center(this.howPlayText, this.howPlayBtn);

        this.creditsBtn = this.add.sprite(300,336, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.creditsBtn.depth = 1
        this.creditsBtn.on('pointerover', () => {this.creditsBtn.setFrame(1), this.creditsBtn.depth = 2})
        this.creditsBtn.on('pointerout', () => {this.creditsBtn.setFrame(0), this.creditsBtn.depth = 1})
        this.creditsText = this.add.bitmapText(270,318,"baseFont","Credits",16).setDepth(4)
        Phaser.Display.Align.In.Center(this.creditsText, this.creditsBtn);

        
        
        

        
    }

    update() {
        this.mainMenuBG.tilePositionX += 0.5
    }
}
