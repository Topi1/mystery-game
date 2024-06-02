import Phaser from "phaser";


export class PopupMenu extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, scene.cameras.main.width / 2, scene.cameras.main.height / 2)
        
        scene.add.existing(this);

        this.createMenuItems();
        this.setVisible(false);  // Initially hidden
        this.depth = 30
        
    }

    setSaveGamePopup(saveGamePopup) {
        this.saveGamePopup = saveGamePopup;
    }

    setLoadGamePopup(loadGamePopup) {
        this.loadGamePopup = loadGamePopup;
    }

    setSettingsPopup(settingsPopup) {
        this.settingsPopup = settingsPopup;
    }
    setHowPlayPopup(howplayPopup) {
        this.howplayPopup = howplayPopup;
    }

    setExitPopup(exitPopup) {
        this.exitPopup = exitPopup;
    }

    createMenuItems() {
        const { width, height } = this.scene.sys.game.config;

        
        

        this.inputBlocker = this.scene.add.rectangle(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height, 0x000000, 0.0)
            .setOrigin(0.5, 0.5)
            .setInteractive()
            .on('pointerdown', (pointer, localX, localY, event) => {
                // Stop the event from propagating to lower layers
                event.stopPropagation();
            });
            this.inputBlocker.depth = 30 
        this.add(this.inputBlocker); // Add it to the container to keep depth management easy 

        // Background for the menu
        let bg = this.scene.add.graphics({ fillStyle: { color: 0x2e2c2d, alpha: 0.7 } })
        bg.fillRect(-width / 2, -height / 2, width, height);
        bg.depth = 30
        this.add(bg);

        //BUTTONS

        this.mainButton2 = this.scene.add.sprite(290, -160, "mainIcon").setFrame(1).setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
            this.toggleVisibility()
        })
        this.mainButton2.depth = 32
        this.add(this.mainButton2)

        this.saveGameBtn = this.scene.add.sprite(240,-110, "menuButton1").setFrame(0).setInteractive({ useHandCursor: true })
        .on('pointerover', () => {this.saveGameBtn.setFrame(1), this.saveGameBtn.depth = 32})
        .on('pointerout', () => {this.saveGameBtn.setFrame(0), this.saveGameBtn.depth = 31})
        .on('pointerdown', () => {
            this.saveGamePopup.toggleVisibility()
        })
        this.saveGameBtn.depth = 31
        this.add(this.saveGameBtn)

        this.saveGameText = this.scene.add.bitmapText(0,0,"baseFontUI","Save Game",16).setDepth(33)
        Phaser.Display.Align.In.Center(this.saveGameText, this.saveGameBtn);
        this.add(this.saveGameText)

        this.loadGameBtn = this.scene.add.sprite(240,-76, "menuButton1").setFrame(0).setInteractive({ useHandCursor: true })
        .on('pointerover', () => {this.loadGameBtn.setFrame(1), this.loadGameBtn.depth = 32})
        .on('pointerout', () => {this.loadGameBtn.setFrame(0), this.loadGameBtn.depth = 31})
        .on('pointerdown', () => {
            this.loadGamePopup.toggleVisibility()
        })
        this.loadGameBtn.depth = 31
        this.add(this.loadGameBtn)

        this.loadGameText = this.scene.add.bitmapText(0,0,"baseFontUI","Load Game",16).setDepth(33)
        Phaser.Display.Align.In.Center(this.loadGameText, this.loadGameBtn);
        this.add(this.loadGameText)

        this.settingsBtn = this.scene.add.sprite(240,-42, "menuButton1").setFrame(0).setInteractive({ useHandCursor: true })
        .on('pointerover', () => {this.settingsBtn.setFrame(1), this.settingsBtn.depth = 32})
        .on('pointerout', () => {this.settingsBtn.setFrame(0), this.settingsBtn.depth = 31})
        .on('pointerdown', () => {
            this.settingsPopup.toggleVisibility()
        })
        this.settingsBtn.depth = 31
        this.add(this.settingsBtn)

        this.settingsText = this.scene.add.bitmapText(0,0,"baseFontUI","Settings",16).setDepth(33)
        Phaser.Display.Align.In.Center(this.settingsText, this.settingsBtn);
        this.add(this.settingsText)

        this.howplayBtn = this.scene.add.sprite(240,-8, "menuButton1").setFrame(0).setInteractive({ useHandCursor: true })
        .on('pointerover', () => {this.howplayBtn.setFrame(1), this.howplayBtn.depth = 32})
        .on('pointerout', () => {this.howplayBtn.setFrame(0), this.howplayBtn.depth = 31})
        .on('pointerdown', () => {
            this.howplayPopup.toggleVisibility()
        })
        this.howplayBtn.depth = 31
        this.add(this.howplayBtn)

        this.howplayText = this.scene.add.bitmapText(0,0,"baseFontUI","How To Play",16).setDepth(33)
        Phaser.Display.Align.In.Center(this.howplayText, this.howplayBtn);
        this.add(this.howplayText)

        this.exitBtn = this.scene.add.sprite(240,26, "menuButton1").setFrame(0).setInteractive({ useHandCursor: true })
        .on('pointerover', () => {this.exitBtn.setFrame(1), this.exitBtn.depth = 32})
        .on('pointerout', () => {this.exitBtn.setFrame(0), this.exitBtn.depth = 31})
        .on('pointerdown', () => {
            this.exitPopup.toggleVisibility()
        })
        this.exitBtn.depth = 31
        this.add(this.exitBtn)

        this.exitText = this.scene.add.bitmapText(0,0,"baseFontUI","Quit",16).setDepth(33)
        Phaser.Display.Align.In.Center(this.exitText, this.exitBtn);
        this.add(this.exitText)

        
    }

    onSettingsClicked() {
        console.log('Settings clicked');
        // Handle settings logic here
    }

    toggleVisibility() {
        const isVisible = !this.visible;
        this.setVisible(isVisible);

        // Toggle the input of IngameUI depending on the visibility of the menu
        const ingameUIScene = this.scene.scene.get('IngameUI');
        if (ingameUIScene) {
            ingameUIScene.toggleUIInput(!isVisible);
        }
        
    }

}