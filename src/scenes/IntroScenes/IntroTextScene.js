import { Scene } from "phaser";


export class IntroTextScene extends Scene {


    constructor ()
    {
        super('IntroTextScene');
    }


    create() {

        this.soundManager = this.game.registry.get('soundManager');

        this.soundManager.setVolume("typeWriter", 0.3)

        this.input.enabled = false

        this.content = "It is late evening in Scotland.\n\nYou are in Fionnphort, waiting for a ferry.\n\nYour destination is The Isle of Iona.\n\nIt's a tiny island off the southwest\ncoast of Mull in the Inner Hebrides.\n\nWhy are you going there?\n\nI will tell you soon, wait a moment...";
        this.label = this.add.bitmapText(320, 150, "baseFont", "", 16).setOrigin(0.5,0.5)
        this.typewriteText(this.content, () => {
            this.onComplete()
        });





        this.input.once('pointerdown', () => {
            this.time.delayedCall(2000, () => {
                this.scene.start('FerryScene')
            }, [], this)
        })
    }

    typewriteText(text, onComplete) {
        
        let i = 0;
        const length = text.length;
        this.label.text = ''; // Ensure the label is cleared before starting
        const timer = this.time.addEvent({
        callback: () => {
            this.label.text += text[i];
            this.soundManager.playSound("typeWriter")
            i++;
            if (i === length) {
                timer.remove(); // Stop the timer when all characters are displayed
                if(onComplete) {
                    onComplete()
                }
            }
        },
        repeat: length - 1,
        delay: 100, // Delay in ms between each character
        loop: true
    });
}


    onComplete() {

        this.time.delayedCall(2000, () => {
            
            // Set the new content and call typewriteText again with new text
            this.newContent = "By the way...\n\nYou are Detective Dean Donahan\nof the Scotland's Police.\n\nAnd you are going to the Isle of Iona\nbecause of your job...\n\nThere has been two brutal murders\non the island.\n\nYou have been reported that both\nof the corpses had their hands missing...\n\nOkey... Time to get into that ferry,\nit is leaving soon...";
            this.typewriteText(this.newContent, () => {
                // You can define another onComplete function here if needed
                
                console.log("New message display complete.");
                this.nextAction()
            });

        }, [], this)
    }

    nextAction() {
        // Define what happens next, e.g., transition to another scene after a delay
        this.time.delayedCall(2000, () => {
            console.log("Transitioning to the next scene or doing another action.");
            this.newContent = "Press anywhere to continue."
            this.typewriteText(this.newContent, () => {
                this.input.enabled = true
            })
            // Example: this.scene.start('NextScene');
        }, [], this);
    }


}