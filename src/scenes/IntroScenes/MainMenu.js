import { Scene } from 'phaser';
import { SettingsPopup } from '../UIscenes/SettingsPopup';
import { HowToPlayPopup } from '../UIscenes/HowToPlayPopup';
import GameAnimations from '../GameAnimations';
import SoundController from '../SoundController';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {   
        this.soundManager = this.game.registry.get('soundManager');
        this.soundManager.setVolume("introSong", 0.6)
        
        GameAnimations.create(this)

        

        this.blackOverlay = this.add.graphics({ fillStyle: { color: 0x000000 } });
        this.blackOverlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.blackOverlay.depth = 6

        this.tweens.add({
            targets: this.blackOverlay,
            alpha: 0,
            duration: 1800, 
            ease: 'Cubic.easeOut', 
            onComplete: () => {
                this.blackOverlay.destroy();
            }
        });


        


        this.topiText = this.add.bitmapText(80, 15, "baseFont", "Topi Järvinen 2024", 16).setOrigin(0.5,0.5)
        this.topiText.depth = 6

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

        
        this.walkingPlayer.anims.play("walk")

        this.light = this.lights.addLight(310,95,180)
        this.light.depth = 3


        

        this.mainMenuBG = this.add.tileSprite(320, 115, 0, 0, 'mainMenuBG2').setOrigin(0.5,0.5)
        this.mainMenuBG.setPipeline("Light2D")
        this.mainMenuBG.depth = 0

        //BUTTONS

        this.canGoBack = true


        //New Game
        this.newGameBtn = this.add.sprite(300,200, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.newGameBtn.depth = 1
        this.newGameBtn.on('pointerover', () => {this.newGameBtn.setFrame(1), this.newGameBtn.depth = 2,
            this.tweens.add({
                targets: this.plusIcon,
                x: 384,
                duration: 800,
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
        this.plusIcon = this.add.sprite(340,200,"menuIcons")
        this.plusIcon.depth = 0
        this.plusIcon.alpha = 0.6


        //Load Game
        this.loadGameBtn = this.add.sprite(340,234, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.loadGameBtn.depth = 1
        this.loadGameBtn.on('pointerover', () => {this.loadGameBtn.setFrame(1), this.loadGameBtn.depth = 2,
            this.tweens.add({
                targets: this.loadIcon,
                x: 256,
                duration: 800,
                ease: "Sine.InOut"
            })
        })
        this.loadGameBtn.on('pointerout', () => {this.loadGameBtn.setFrame(0), this.loadGameBtn.depth = 1,
            this.tweens.add({
                targets: this.loadIcon,
                x: 300,
                duration: 1000,
                ease: "Sine.InOut"
            })
        })
        this.loadGameText = this.add.bitmapText(0,0,"baseFont","Load Game",16).setDepth(4)
        Phaser.Display.Align.In.Center(this.loadGameText, this.loadGameBtn);
        this.loadIcon = this.add.sprite(300,234,"menuIcons", 1)
        this.loadIcon.depth = 0
        this.loadIcon.alpha = 0.6


        //Settings
        this.settingsBtn = this.add.sprite(300,268, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.settingsBtn.depth = 1
        this.settingsBtn.on('pointerover', () => {this.settingsBtn.setFrame(1), this.settingsBtn.depth = 2,
            this.tweens.add({
                targets: this.settingsIcon,
                x: 384,
                duration: 800,
                ease: "Sine.InOut"
            })
        })
        this.settingsBtn.on('pointerout', () => {this.settingsBtn.setFrame(0), this.settingsBtn.depth = 1,
            this.tweens.add({
                targets: this.settingsIcon,
                x: 340,
                duration: 1000,
                ease: "Sine.InOut"
            })
        })
        this.settingsText = this.add.bitmapText(270,254,"baseFont","Settings",16).setDepth(4)
        Phaser.Display.Align.In.Center(this.settingsText, this.settingsBtn);
        this.settingsIcon = this.add.sprite(340,268,"menuIcons", 2)
        this.settingsIcon.depth = 0
        this.settingsIcon.alpha = 0.6


        //How to Play
        this.howPlayBtn = this.add.sprite(340,302, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.howPlayBtn.depth = 1
        this.howPlayBtn.on('pointerover', () => {this.howPlayBtn.setFrame(1), this.howPlayBtn.depth = 2,
            this.tweens.add({
                targets: this.howPlayIcon,
                x: 268,
                duration: 800,
                ease: "Sine.InOut"
            })
        })
        this.howPlayBtn.on('pointerout', () => {this.howPlayBtn.setFrame(0), this.howPlayBtn.depth = 1,
            this.tweens.add({
                targets: this.howPlayIcon,
                x: 300,
                duration: 1000,
                ease: "Sine.InOut"
            })
        })
        this.howPlayText = this.add.bitmapText(310,286,"baseFont","How To Play",16).setDepth(4)
        Phaser.Display.Align.In.Center(this.howPlayText, this.howPlayBtn);
        this.howPlayIcon = this.add.sprite(300,302,"menuIcons", 3)
        this.howPlayIcon.depth = 0
        this.howPlayIcon.alpha = 0.6


        //Credits Button
        this.creditsBtn = this.add.sprite(300,336, "menuButton").setFrame(0).setInteractive({ useHandCursor: true })
        this.creditsBtn.depth = 1
        this.creditsBtn.on('pointerover', () => {this.creditsBtn.setFrame(1), this.creditsBtn.depth = 2,
            this.tweens.add({
                targets: this.creditsIcon,
                x: 384,
                duration: 800,
                ease: "Sine.InOut"
            })
        })
        this.creditsBtn.on('pointerout', () => {this.creditsBtn.setFrame(0), this.creditsBtn.depth = 1,
            this.tweens.add({
                targets: this.creditsIcon,
                x: 340,
                duration: 1000,
                ease: "Sine.InOut"
            })
        })
        this.creditsText = this.add.bitmapText(270,318,"baseFont","Credits",16).setDepth(4)
        Phaser.Display.Align.In.Center(this.creditsText, this.creditsBtn);
        this.creditsIcon = this.add.sprite(340,336,"menuIcons", 4)
        this.creditsIcon.depth = 0
        this.creditsIcon.alpha = 0.7

        
        
        //BUTTON CLICKS
        this.moveBackground = true

        //New Game

        this.newGameBtn.on('pointerdown', () => {
            this.soundManager.playSound("interfaceClick")
            this.tweens.add({
                targets: this.walkingPlayer,
                x: 700,
                duration: 6000,
                //ease: "Sine.InOut",
                delay: 200
            })
            
            this.time.delayedCall(200, () => {
                this.moveBackground = false
            }, [], this)

            this.time.delayedCall(2500, () => {
                this.soundManager.stopSound("introSong")
                this.scene.start('IntroTextScene')
            }, [], this)
    })


        //Settings

        this.settingsPopup = new SettingsPopup(this, this.cameras.main.centerX, this.cameras.main.centerY)
        this.settingsPopup.depth = 10

        this.settingsBtn.on('pointerdown', () => {
            this.settingsPopup.toggleVisibility()
        })

        //How to play

        this.howToPlayPopup = new HowToPlayPopup(this, this.cameras.main.centerX, this.cameras.main.centerY)
        this.howToPlayPopup.depth = 10

        this.howPlayBtn.on('pointerdown', () => {
            this.howToPlayPopup.toggleVisibility()
        })
        
    }

    update() {
        if(this.moveBackground){
            this.mainMenuBG.tilePositionX += 0.1
        }
    }
}
