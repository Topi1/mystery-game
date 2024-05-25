

export default class GameAnimations {
    static create(scene) {
        

            //TITLE SCREEN
            scene.anims.create({
                key: 'titleAnim',
                frames: scene.anims.generateFrameNames('TitleLogoAnim', {
                    prefix: 'TitleLogoAnim ',
                    suffix: '.aseprite',
                    start: 0,
                    end: 1,
                    zeroPad: 1 // Ensure the frame numbers are correctly formatted (if necessary)
                }),
                frameRate: 2,
                repeat: 0
            });
    
            scene.anims.create({
                key: 'titleHandAnim',
                frames: scene.anims.generateFrameNames('TitleLogoAnim', {
                    prefix: 'TitleLogoAnim ',
                    suffix: '.aseprite',
                    start: 15,
                    end: 44,
                    zeroPad: 1 
                }),
                frameRate: 5,
                repeat: -1
            })

            //PLAYER CHARACTER

            scene.anims.create({
                key: 'walk',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 9,
                    end: 16,
                    zeroPad: 1 
                }),
                frameRate: 6,
                repeat: -1
            });
    
            scene.anims.create({
                key: 'walkDown',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 1,
                    end: 8,
                    zeroPad: 1 
                }),
                frameRate: 6,
                repeat: -1
            });
    
            scene.anims.create({
                key: 'walkUp',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 17,
                    end: 24,
                    zeroPad: 1 
                }),
                frameRate: 6,
                repeat: -1
            });



        
    }
}