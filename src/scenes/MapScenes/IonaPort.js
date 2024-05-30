import { Scene } from 'phaser';
import { Player } from '../../player';
import GameAnimations from '../GameAnimations';






export class IonaPort extends Scene {
    constructor() {
        super('IonaPort');
        
        this.playerSpeed = 59;
        this.currentPath = [];
        this.currentPathIndex = 0;
        this.targetPosition = null;
       
    }

    create() {

        GameAnimations.create(this)

        this.lights.enable()
        this.lights.enable().setAmbientColor(0x0c0d0c);

        this.leftLantern = this.lights.addLight(150,90,140)
        this.rightLantern = this.lights.addLight(370,90,140)
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

        //this.player = new Player(this, 500, 180, 'player', 0,  this.navMesh);
        //this.player.setPipeline("Light2D")

        this.player = this.physics.add.sprite(300, 160, "player").setOrigin(0.5,0.5)
        this.player.body.setAllowGravity(false);
        this.player.depth = 7;
        this.player.scale = 1;
        this.player.setSize(40, 25);
        this.player.body.setOffset(5, 70);
        this.player.setPipeline("Light2D");

        this.cameras.main.setBounds(0, 0, portMap.widthInPixels, portMap.heightInPixels);
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
            this.startPathfinding(worldX, worldY);
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

        
    }


    handleCollision(player, layer) {
        // Stop the player
        this.player.body.setVelocity(0, 0);
        this.targetPosition = null;

        // Recalculate the path to the current goal
        if (this.currentPath.length > 0 && this.currentPathIndex < this.currentPath.length) {
            const goal = this.currentPath[this.currentPath.length - 1];
            this.startPathfinding(goal.x, goal.y);
        }
    }

    startPathfinding(targetX, targetY) {
        console.log("START PATH")
        
        this.player.body.setDrag(0, 0);
        const start = { x: this.player.x, y: this.player.y };
        const end = { x: targetX, y: targetY };

        const path = this.navMesh.findPath(start, end);
        console.log('Path:', path);
        if (path) {
            this.currentPath = path.map(point => ({
                x: Math.round(point.x),
                y: Math.round(point.y)
            }));
            this.currentPath = path;
            this.currentPathIndex = 0;
            this.moveToNextPoint();
        } else {
            console.log("NO PATH")
        }
    }

    moveToNextPoint() {
        //const deltaSeconds = delta / 1000

        if (this.currentPathIndex < this.currentPath.length) {
            this.targetPosition = this.currentPath[this.currentPathIndex];
            const deltaX = this.targetPosition.x - this.player.x;
            const deltaY = this.targetPosition.y - this.player.y;
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetPosition.x, this.targetPosition.y);

            if (distance > 8) {
                const speed = this.playerSpeed;
                // Calculate normalized direction
                const normDeltaX = deltaX / distance;
                const normDeltaY = deltaY / distance;
                // Apply speed and round to make the movement in whole pixels
            this.player.body.setVelocityX(Math.round(normDeltaX * speed));
            this.player.body.setVelocityY(Math.round(normDeltaY * speed));
            //this.soundManager.playSound("woodWalk")

        } 
        else {
            this.player.body.setVelocity(0, 0);
            // Snap to target and ensure coordinates are integers
            this.player.x = this.targetPosition.x;
            this.player.y = this.targetPosition.y;
        }

        this.adjustPlayerAnimation(deltaX, deltaY);
        this.currentPathIndex++;

        } else {
            //this.soundManager.stopSound("woodWalk")
            this.targetPosition = null;
            this.player.body.setVelocity(0, 0);
            this.player.anims.stop();
            this.player.setFrame(0);
            this.player.body.setDrag(50, 50);
        }
        
    } 

    adjustPlayerAnimation(deltaX, deltaY) {
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;  // Convert radians to degrees
    
        // Normalize the angle to a range of 0 to 360 degrees
        const normalizedAngle = angle < 0 ? 360 + angle : angle;
    
        if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) {
            this.player.anims.play("walkDown", true);  // South
        } else if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) {
            this.player.anims.play("walkDiag", true);  // Southwest
        } else if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) {
            this.player.anims.play("walk", true);  // West
        } else if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) {
            this.player.anims.play("walkDiagUp", true);  // Northwest
        } else if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) {
            this.player.anims.play("walkUp", true);  // North
        } else if (normalizedAngle >= 292.5 && normalizedAngle < 337.5) {
            this.player.anims.play("walkDiagUp", true);  // Northeast
        } else if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) {
            this.player.anims.play("walk", true);  // East
        } else if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) {
            this.player.anims.play("walkDiag", true);  // Southeast
        }
    
        // Adjust sprite flipping based on X direction
        this.player.flipX = deltaX < 0;
    }

    update() {
        
        if (this.targetPosition) {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetPosition.x, this.targetPosition.y);
            
            if (distance < 5) {
                
                
                this.moveToNextPoint();
            } 
        } 
        //this.player.update()
    }

}