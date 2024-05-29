import { Scene } from 'phaser';
import GameAnimations from '../GameAnimations';
import SoundController from '../SoundController';


export class TitleScreen extends Scene
{
    constructor ()
    {
        super('TitleScreen');
    }


    create ()
    {
        this.soundManager = this.game.registry.get('soundManager');
        GameAnimations.create(this)

        

        this.input.enabled = false
        this.time.delayedCall(1000, () => {
            this.input.enabled = true
        }, [], this)

        this.topiText = this.add.bitmapText(80, 15, "baseFont", "Topi Järvinen 2024", 16).setOrigin(0.5,0.5)
        this.topiText.depth = 5

        //this.add.image(320, 170, 'logo2').setOrigin(0.5,0.5)

        this.shadowHand = this.add.image(680, 520, 'shadowHand').setOrigin(0.5,0.5)
        this.shadowHand.depth = 4
        this.tweens.add({
            targets: this.shadowHand,
            y: 220,
            x: 380,
            duration: 7300,
            ease: "Power2",
            delay: 3000,
        })
        this.time.delayedCall(12150, () => {
            this.shadowHand.destroy()
        }, [], this)

        this.bOpacity2 = this.add.image(320, 170, 'blackOpacity').setOrigin(0.5,0.5)
        this.bOpacity2.depth = 4
        this.bOpacity2.alpha = 0

        /*this.time.delayedCall(11500, () => {
            this.bOpacity2.alpha = 100
        }, [], this) */

        this.tweens.add({
            targets: this.bOpacity2,
            alpha: 1,  
            duration: 500,  
            ease: 'Linear',  
            delay: 11500,
        })

        this.tweens.add({
            targets: this.bOpacity2,
            alpha: 0,  
            duration: 2800,  
            ease: 'Linear',  
            delay: 13500,
        })

        this.upTitle = this.add.image(320, -40, 'upTitle').setOrigin(0.5,0.5)
        this.upTitle.depth = 1

        this.tweens.add({
            targets: this.upTitle,
            y: 170,
            duration: 1300,
            ease: "Power2",
            delay: 800,
           
        
        })

        this.downTitle = this.add.image(320, 420, 'downTitle').setOrigin(0.5,0.5)

        this.tweens.add({
            targets: this.downTitle,
            y: 170,
            duration: 1400,
            ease: "Power2",
            delay: 1100,
            
        })

        this.time.delayedCall(4000, () => {
            this.upTitle.destroy();
        }, [], this)

        this.time.delayedCall(4000, () => {
            this.downTitle.destroy();
        }, [], this)



        this.titleLogo = this.add.sprite(320, 170, 'TitleLogoAnim').setOrigin(0.5,0.5)
        this.titleLogo.depth = 3

        

        if(this.titleLogo){
            this.time.delayedCall(3000, () => {
                if(this.titleLogo && this.titleLogo.active){
                    this.titleLogo.anims.play("titleAnim");
                }
            }, [], this);
        }
        

        this.titleLogo.on("animationcomplete", () => {
            if(this.titleLogo && this.titleLogo.active && this.titleLogo.anims.currentAnim.key === "titleAnim") {
                this.time.delayedCall(8500, () => {
                    if(this.titleLogo){
                        this.titleLogo.anims.play("titleHandAnim");
                    }
                }, [], this);
            }
        }) 
        

        this.startText = this.add.bitmapText(320,420, "baseFont", "Press anywhere to start", 22).setOrigin(0.5,0.5)
        this.startText.depth = 5

        this.tweens.add({
            targets: this.startText,
            y: 320,
            duration: 1300,
            ease: "Power2",
            delay: 1000,
           
        
        })
        

        this.input.once('pointerdown', () => {

            this.soundManager.playSound("classicClick")
            this.titleLogo.destroy()
            this.shadowHand.destroy()
            //this.bOpacity.destroy()
            this.bOpacity2.destroy()
            this.startText.destroy()
            this.upTitle.destroy()
            this.downTitle.destroy()

            this.titleClickUp = this.add.image(320, 170, 'titleClickUp').setOrigin(0.5,0.5)
            this.titleClickUp.depth = 2
            this.tweens.add({
                targets: this.titleClickUp,
                y: -40,
                duration: 1300,
                ease: "Power2",
                delay: 900,
            })

            this.titleClickDown = this.add.image(320, 170, 'titleClickDown').setOrigin(0.5,0.5)
            this.titleClickDown.depth = 1
            this.tweens.add({
                targets: this.titleClickDown,
                y: 420,
                duration: 1300,
                ease: "Power2",
                delay: 900,
            })

            this.time.delayedCall(2300, () => {
                
                this.scene.start('MainMenu')
            }, [], this)
            

        })
    }
}
