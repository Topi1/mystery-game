

export default class GameAnimations {
    static create(scene) {

            const addAnimation = (config) => {
                if (!scene.anims.exists(config.key)) {
                    scene.anims.create(config)
                }
            }
        

            //TITLE SCREEN
            
            addAnimation({
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
    
            addAnimation({
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

            addAnimation({
                key: 'walk',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 9,
                    end: 16,
                     
                }),
                frameRate: 5,
                repeat: -1
            });
    
            addAnimation({
                key: 'walkDown',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 1,
                    end: 8,
                    
                }),
                frameRate: 5,
                repeat: -1
            });
    
            addAnimation({
                key: 'walkUp',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 17,
                    end: 24,
                    
                }),
                frameRate: 5,
                repeat: -1
            });

            addAnimation({
                key: 'walkDiag',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 25,
                    end: 32,
                    
                }),
                frameRate: 5,
                repeat: -1
            });

            addAnimation({
                key: 'walkDiagUp',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 33,
                    end: 40,
                    
                }),
                frameRate: 5,
                repeat: -1
            });

            addAnimation({
                key: 'playerIdle1',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 41,
                    end: 42,
                    
                }),
                frameRate: 1,
                //repeat: -1
            });

            addAnimation({
                key: 'playerIdle2',
                frames: scene.anims.generateFrameNames('player', {
                    prefix: 'detective ',
                    suffix: '.aseprite',
                    start: 43,
                    end: 52,
                    
                }),
                frameRate: 1,
                //repeat: -1
            });



        
    }
}