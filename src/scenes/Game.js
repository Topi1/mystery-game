import { Scene } from 'phaser';
import GameAnimations from './GameAnimations';


const { Vector2 } = Phaser.Math;

export class Game extends Scene {
    constructor() {
        super('Game');
        this.cursor;
        this.playerSpeed = 65;
        this.currentPath = [];
        this.currentPathIndex = 0;
        this.targetPosition = null;
        //this.cameraLerpSpeed = 0.1; // Camera lerp speed
    }

    create() {

        GameAnimations.create(this)

        this.lights.enable().setAmbientColor(0x797979);


        this.player = this.physics.add.sprite(600, 400, "player");
        this.player.body.setAllowGravity(false);
        this.player.depth = 5;
        this.player.scale = 1;
        this.player.setSize(40, 25);
        this.player.body.setOffset(5, 70);
        this.player.setPipeline("Light2D");

        this.player.postFX.addShadow(0,0,0.06,1)


        

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, 2000, 2000);

        const map = this.make.tilemap({ key: "demomap" });

        const floorTileset = map.addTilesetImage("floor", "floorTiles2");
        const lowWallTileset = map.addTilesetImage("lowWalls", "lowWallTiles");
        const highWallTileset = map.addTilesetImage("walls", "highWallTiles");
        const objectTileset = map.addTilesetImage("objects", "objectTiles");

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

    moveToNextPoint() {


        if (this.currentPathIndex < this.currentPath.length) {
            this.targetPosition = this.currentPath[this.currentPathIndex];
            this.physics.moveToObject(this.player, this.targetPosition, this.playerSpeed);

            const deltaX = Math.abs(this.targetPosition.x - this.player.x);
            const deltaY = Math.abs(this.targetPosition.y - this.player.y);
            //console.log(`DeltaX: ${deltaX}, DeltaY: ${deltaY}`)

            
            
        if (deltaY > deltaX) {
            if (this.player.y < this.targetPosition.y) {
                this.player.anims.play("walkDown", true); // Moving downwards
            } else if (this.player.y > this.targetPosition.y){
                this.player.anims.play("walkUp", true); // Moving upwards
                console.log("Playing walkUp Animation")
            }
        } else {
            this.player.anims.play("walk", true); // Horizontal movement, use the default walk animation
        }

            // Adjust player facing direction
            this.player.flipX = this.targetPosition.x < this.player.x;

            this.currentPathIndex++;
        } else {
            this.targetPosition = null;
            this.player.body.setVelocity(0, 0);
            this.player.anims.stop("walk")
            this.player.setFrame(0)
        }
    }

    preRender(time, delta) {
        this.cameras.main.centerOn(this.player.x, this.player.y);
    }

    update() {
        /*const camera = this.cameras.main;
        const cameraLerpSpeed = this.cameraLerpSpeed;
        camera.scrollX = Phaser.Math.Linear(camera.scrollX, this.player.x - camera.width / 2, cameraLerpSpeed);
        camera.scrollY = Phaser.Math.Linear(camera.scrollY, this.player.y - camera.height / 2, cameraLerpSpeed); */

        //this.player.body.setOffset(24, 93)

        this.cameras.main.scrollX = Math.floor(this.player.x - this.cameras.main.width / 2);
        this.cameras.main.scrollY = Math.floor(this.player.y - this.cameras.main.height / 2);

        if (this.targetPosition) {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetPosition.x, this.targetPosition.y);
            
            if (distance < 4) {
                //this.player.body.reset(this.targetPosition.x, this.targetPosition.y);
                
                this.moveToNextPoint();
            }
        }

        
    }

}
