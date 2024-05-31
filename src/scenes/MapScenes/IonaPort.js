import { Scene } from 'phaser';
import { Player } from '../../player';
import GameAnimations from '../GameAnimations';






export class IonaPort extends Scene {
    constructor() {
        super('IonaPort');
        
        
       
    }

    create() {

        this.soundManager = this.game.registry.get('soundManager');

        this.soundManager.setVolume("ferrySound", 0.4)

        GameAnimations.create(this)


        this.blackOverlay = this.add.graphics({ fillStyle: { color: 0x000000 } });
        this.blackOverlay.fillRect(0, 0, this.sys.game.config.width + 500, this.sys.game.config.height);
        this.blackOverlay.depth = 10
        this.tweens.add({
            targets: this.blackOverlay,
            alpha: 0,
            duration: 1800, 
            ease: 'Cubic.easeOut', 
            delay: 1000,
            onComplete: () => {
                this.blackOverlay.destroy();
            }
        });


        this.lights.enable()
        this.lights.enable().setAmbientColor(0x070708);

        this.leftLantern = this.lights.addLight(150,90,130)
        this.rightLantern = this.lights.addLight(370,90,130)
        this.bigLantern = this.lights.addLight(620,100,160)
        
        
        

        

        const portMap = this.make.tilemap({ key: "IonaPort" });

        const ground = portMap.addTilesetImage("ground", "A5_Hotel", 48,48);
        const house = portMap.addTilesetImage("house", "A4_Hotel", 48,48);
        const house2 = portMap.addTilesetImage("house2", "Hotel_Bonus", 48,48);
        const house3 = portMap.addTilesetImage("house3", "Hotel_Outside_A3", 48,48);
        //const house4 = portMap.addTilesetImage("house4", "objectTiles", 48,48);
        const house5 = portMap.addTilesetImage("house5", "portTiles", 48,48);
        const others = portMap.addTilesetImage("others", "Hotel_Outside", 48,48);

        const firstLayer = portMap.createLayer("ground", ground).setPipeline("Light2D");
        firstLayer.depth = 0;
        const secondLayer = portMap.createLayer("house", house).setPipeline("Light2D");
        secondLayer.depth = 1;
        const thirdLayer = portMap.createLayer("house2", house2).setPipeline("Light2D");
        thirdLayer.depth = 2;
        const fourthLayer = portMap.createLayer("house3", house3).setPipeline("Light2D");
        fourthLayer.depth = 3;
        //const fifthLayer = portMap.createLayer("house4", house4).setPipeline("Light2D");
        //fifthLayer.depth = 4;
        const sixthLayer = portMap.createLayer("house5", house5).setPipeline("Light2D");
        sixthLayer.depth = 5;
        const seventhLayer = portMap.createLayer("others", others).setPipeline("Light2D");
        seventhLayer.depth = 6;

        //firstLayer.setCollisionByProperty({ collides: true });
        secondLayer.setCollisionByProperty({ collides: true });
        thirdLayer.setCollisionByProperty({ collides: true });
        fourthLayer.setCollisionByProperty({ collides: true }); 
        sixthLayer.setCollisionByProperty({ collides: true }); 
        seventhLayer.setCollisionByProperty({ collides: true }); 

        

        this.navMesh = this.navMeshPlugin.buildMeshFromTilemap("meshPort", portMap);

        this.darkWater = this.add.tileSprite(320,170,0,0,"darkWater").setOrigin(0.5,0.5)
        this.darkWater.depth = -1
        this.darkWater.flipX
        this.darkWater.setPipeline("Light2D")

        this.player = new Player(this, 650, 150, 'player', 0,  this.navMesh);
        this.player.setPipeline("Light2D")
        //this.player.postFX.addShadow(0,0,0.06,1)

        //this.player = this.physics.add.sprite(650, 160, "player").setOrigin(0.5,0.5)
        //this.player.body.setAllowGravity(false);
        //this.player.depth = 7;
        //this.player.scale = 1;
        //this.player.setSize(40, 25);
        //this.player.body.setOffset(5, 70);
        //this.player.setPipeline("Light2D");

        this.cameras.main.setBounds(0, 0, portMap.widthInPixels + 100, portMap.heightInPixels);
        this.cameras.main.setZoom(1)

        this.cameras.main.startFollow(this.player, true, 1, 1);

        
        

        // Set up collision detection for all layers
        this.physics.add.collider(this.player, [
            //firstLayer,
            secondLayer,
            thirdLayer,
            fourthLayer,
            sixthLayer,
            seventhLayer
        ], this.player.handleCollision, null, this);  

        this.input.on("pointerup", (pointer) => {
            const { worldX, worldY } = pointer;
            this.player.startPathfinding(worldX, worldY);
            console.log("Player at:", this.player.x, this.player.y);
            console.log("Clicked at:", worldX, worldY);
            //console.log("NavMesh valid:", this.navMesh !== undefined);
            
        });


        /*this.navMesh.enableDebug(); // Creates a Phaser.Graphics overlay on top of the screen
        this.navMesh.debugDrawClear(); // Clears the overlay
        // Visualize the underlying navmesh
        this.navMesh.debugDrawMesh({
        drawCentroid: true,
        drawBounds: false,
        drawNeighbors: true,
        drawPortals: true
        }); */

        this.player.startPathfinding(649, 150)


        this.input.on('pointermove', (pointer) => {
            const worldPoint = pointer.positionToCamera(this.cameras.main); // Convert to world space

        this.checkPathExists(this.player.x, this.player.y, worldPoint.x, worldPoint.y).then(pathExists => {
            if (pathExists) {
                this.game.canvas.style.cursor = 'pointer'; // Change to hand cursor
            } else {
                this.game.canvas.style.cursor = 'default'; // Revert to default cursor
            }
        }).catch(() => {
            this.game.canvas.style.cursor = 'default'; // Ensure default on error
        });
    });
    

        
    }

    async checkPathExists(startX, startY, endX, endY) {
        const path = await this.navMesh.findPath({ x: startX, y: startY }, { x: endX, y: endY });
        return path && path.length > 0;
    }


    

    update() {
        
        //this.player.handleIdle()
        this.player.update()
        this.darkWater.tilePositionX += 0.3
        this.darkWater.tilePositionY += 0.3
    }

}