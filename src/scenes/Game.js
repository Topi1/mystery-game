import { Scene } from 'phaser';
import GameAnimations from './GameAnimations';


const { Vector2 } = Phaser.Math;

export class Game extends Scene {
    constructor() {
        super('Game');
        this.cursor;
        this.playerSpeed = 59;
        this.currentPath = [];
        this.currentPathIndex = 0;
        this.targetPosition = null;
        
        this.idleAnimationCounter = 0;
        this.maxIdleRepeats = 3;
        this.currentIdleAnimation = 'playerIdle1'
    }

    create() {
        //this.fpsText = this.add.text(100, 100, '', { font: '30px Arial', fill: '#ffffff' });
        //this.fpsText.depth = 10

        //this.textures.setDefaultFilter('NEAREST');

        this.soundManager = this.game.registry.get('soundManager');

        GameAnimations.create(this)

        this.lights.enable().setAmbientColor(0x797979);


        this.player = this.physics.add.sprite(600, 400, "player").setOrigin(0.5,0.5)
        this.player.body.setAllowGravity(false);
        this.player.depth = 5;
        this.player.scale = 1;
        this.player.setSize(40, 25);
        this.player.body.setOffset(5, 70);
        this.player.setPipeline("Light2D");

        this.player.postFX.addShadow(0,0,0.06,1)

        

        

        this.cameras.main.startFollow(this.player, false, 0.03, 0.03);
        this.cameras.main.followOffset.set(-1, -1);
        //this.cameras.main.setBounds(0, 0, 2000, 2000);
        
        this.cameras.main.setDeadzone(80, 80);

        const map = this.make.tilemap({ key: "demomap" });

        const floorTileset = map.addTilesetImage("floor", "floorTiles2", 48,48,1,2);
        const lowWallTileset = map.addTilesetImage("lowWalls", "lowWallTiles", 48,48,1,2);
        const highWallTileset = map.addTilesetImage("walls", "highWallTiles", 48,48,1,2);
        const objectTileset = map.addTilesetImage("objects", "objectTiles", 48,48,1,2);

        const firstLayer = map.createLayer("floor", floorTileset).setPipeline("Light2D");
        firstLayer.depth = 0;
        const secondLayer = map.createLayer("lowerWalls", lowWallTileset).setPipeline("Light2D");
        secondLayer.depth = 1;
        const thirdLayer = map.createLayer("upperWalls", highWallTileset).setPipeline("Light2D");
        thirdLayer.depth = 3;
        const fourthLayer = map.createLayer("objects", objectTileset).setPipeline("Light2D");
        fourthLayer.depth = 2;

        firstLayer.setCollisionByProperty({ collides: true });
        secondLayer.setCollisionByProperty({ collides: true });
        thirdLayer.setCollisionByProperty({ collides: true });
        fourthLayer.setCollisionByProperty({ collides: true });

        //const isWalkable = (tile) => !tile.collides;

        this.navMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh", map);

        this.navMesh.enableDebug({ color: 0xff0000}) 

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // Set up collision detection for all layers
        this.physics.add.collider(this.player, [
            firstLayer,
            secondLayer,
            thirdLayer,
            fourthLayer
        ], this.handleCollision, null, this);

        // Add point-and-click functionality
        this.input.on("pointerup", (pointer) => {
            const { worldX, worldY } = pointer;
            this.startPathfinding(worldX, worldY);
        });


        this.player.on('animationcomplete', (animation) => {
            if (animation.key === 'playerIdle1') {
                this.idleAnimationCounter++;
                if (this.idleAnimationCounter >= this.maxIdleRepeats) {
                    this.currentIdleAnimation = 'playerIdle2';
                    this.idleAnimationCounter = 0;  // Reset counter
                }
            } else if (animation.key === 'playerIdle2') {
                this.currentIdleAnimation = 'playerIdle1';  // Switch back to the first idle animation
            }
        });
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
            this.currentPath = path;
            this.currentPathIndex = 0;
            this.moveToNextPoint();
        } else {
            console.log("NO PATH")
        }
    }

    /*moveToNextPoint() {
        if (this.currentPathIndex < this.currentPath.length) {
            this.targetPosition = this.currentPath[this.currentPathIndex];
            const deltaX = this.targetPosition.x - this.player.x;
            const deltaY = this.targetPosition.y - this.player.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
            if (distance > 2) {
                const speed = this.playerSpeed;
                this.player.body.setVelocityX((deltaX / distance) * speed);
                this.player.body.setVelocityY((deltaY / distance) * speed);


               
            }  else {
                // Stop movement and snap to the exact target position
                this.player.body.setVelocity(0, 0);
                this.player.x = this.targetPosition.x;
                this.player.y = this.targetPosition.y;
            }

            

            this.adjustPlayerAnimation(deltaX, deltaY);

            this.currentPathIndex++;

        } else {
            this.targetPosition = null;
            this.player.body.setVelocity(0, 0);
            this.player.anims.stop();
            this.player.setFrame(0)
            this.player.body.setDrag(50, 50);
            
        }
    } */


    moveToNextPoint() {
        //const deltaSeconds = delta / 1000

        if (this.currentPathIndex < this.currentPath.length) {
            this.targetPosition = this.currentPath[this.currentPathIndex];
            const deltaX = this.targetPosition.x - this.player.x;
            const deltaY = this.targetPosition.y - this.player.y;
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetPosition.x, this.targetPosition.y);

            if (distance > 2) {
                const speed = this.playerSpeed;
                // Calculate normalized direction
                const normDeltaX = deltaX / distance;
                const normDeltaY = deltaY / distance;
                // Apply speed and round to make the movement in whole pixels
            this.player.body.setVelocityX(Math.round(normDeltaX * speed));
            this.player.body.setVelocityY(Math.round(normDeltaY * speed));
            this.soundManager.playSound("woodWalk")

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
            this.soundManager.stopSound("woodWalk")
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
        

        this.cameras.main.scrollX = Math.round(this.cameras.main.scrollX);
        this.cameras.main.scrollY = Math.round(this.cameras.main.scrollY);
        
        //this.player.x = Math.round(this.player.x); // Ensuring the sprite position stays on integer coordinates
        //this.player.y = Math.round(this.player.y);

        //this.fpsText.setText('FPS: ' + this.game.loop.actualFps.toFixed(2));

        if (this.targetPosition) {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetPosition.x, this.targetPosition.y);
            
            if (distance < 5) {
                
                
                this.moveToNextPoint();
            } 
        } else {
            if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
                this.player.anims.play(this.currentIdleAnimation, true)
            }
        }

        
    }

}
