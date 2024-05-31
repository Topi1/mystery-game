export class Player extends Phaser.Physics.Arcade.Sprite {


    constructor(scene, x, y, texture, frame, navMesh) {
        super(scene, x, y, texture, frame);
        this.navMesh = navMesh;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.body.setAllowGravity(false);
        this.setPipeline('Light2D');

        this.depth = 8;
        this.scale = 1;
        this.setSize(40, 25);
        this.body.setOffset(5, 70);
        
        this.scene = scene;
        this.playerSpeed = 59;
        this.currentPath = [];
        this.currentPathIndex = 0;
        this.targetPosition = null;

        this.idleAnimationCounter = 0;
        this.maxIdleRepeats = 3;
        this.currentIdleAnimation = 'playerIdle1'
        this.handleIdle()

        //console.log("Player coordinates in constructor:", x, y);
    }

    handleIdle() {
        this.on('animationcomplete', (animation) => {
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


    handleCollision = (player, layer) =>{
        // Stop the player
        this.body.setVelocity(0, 0);
        this.targetPosition = null;

        // Recalculate the path to the current goal
        if (this.currentPath.length > 0 && this.currentPathIndex < this.currentPath.length) {
            const goal = this.currentPath[this.currentPath.length - 1];
            this.startPathfinding(goal.x, goal.y);
        }
    }


    startPathfinding(targetX, targetY) {
        //console.log("START PATH")
        console.log("NavMesh available:", this.navMesh !== undefined);
        //this.body.setDrag(0, 0);
        const start = { x: this.x, y: this.y };
        const end = { x: targetX, y: targetY };

        console.log("Starting path from", start, "to", end); // Confirm coordinates

        if(this.navMesh) {

            const path = this.navMesh.findPath(start, end);
            console.log('Path:', path);

            
            if (path && path.length > 0) {
                console.log("Path found:", path);
                this.currentPath = path.map(point => ({
                    x: Math.round(point.x),
                    y: Math.round(point.y)
                }));
                
                this.currentPathIndex = 0;
                this.moveToNextPoint();
        }

        } else {
            console.log("NO PATH")
        }  
    }

    moveToNextPoint() {
        //const deltaSeconds = delta / 1000
        //console.log("movetonext")

        if (this.currentPathIndex < this.currentPath.length) {
            this.targetPosition = this.currentPath[this.currentPathIndex];
            const deltaX = this.targetPosition.x - this.x;
            const deltaY = this.targetPosition.y - this.y;
            const distance = Phaser.Math.Distance.Between(this.x, this.y, this.targetPosition.x, this.targetPosition.y);

            if (distance > 8) {
                const speed = this.playerSpeed;
                // Calculate normalized direction
                const normDeltaX = deltaX / distance;
                const normDeltaY = deltaY / distance;
                // Apply speed and round to make the movement in whole pixels
            this.body.setVelocityX(Math.round(normDeltaX * speed));
            this.body.setVelocityY(Math.round(normDeltaY * speed));
            //this.soundManager.playSound("woodWalk")

        } 
        else {
            this.body.setVelocity(0, 0);
            // Snap to target and ensure coordinates are integers
            this.x = this.targetPosition.x;
            this.y = this.targetPosition.y;
        }

        this.adjustPlayerAnimation(deltaX, deltaY);
        this.currentPathIndex++;

        } else {
            //this.soundManager.stopSound("woodWalk")
            this.targetPosition = null;
            this.body.setVelocity(0, 0);
            this.anims.stop();
            this.setFrame(0);
            //this.body.setDrag(50, 50);
        }
        
    } 


    adjustPlayerAnimation(deltaX, deltaY) {
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;  // Convert radians to degrees
    
        // Normalize the angle to a range of 0 to 360 degrees
        const normalizedAngle = angle < 0 ? 360 + angle : angle;
    
        if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) {
            this.anims.play("walkDown", true);  // South
        } else if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) {
            this.anims.play("walkDiag", true);  // Southwest
        } else if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) {
            this.anims.play("walk", true);  // West
        } else if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) {
            this.anims.play("walkDiagUp", true);  // Northwest
        } else if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) {
            this.anims.play("walkUp", true);  // North
        } else if (normalizedAngle >= 292.5 && normalizedAngle < 337.5) {
            this.anims.play("walkDiagUp", true);  // Northeast
        } else if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) {
            this.anims.play("walk", true);  // East
        } else if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) {
            this.anims.play("walkDiag", true);  // Southeast
        }
    
        // Adjust sprite flipping based on X direction
        this.flipX = deltaX < 0;
    }

    



    update() {
        // Add logic to handle player movement, animations, etc.
        //this.handleIdle()

        if (this.targetPosition) {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, this.targetPosition.x, this.targetPosition.y);
            if (distance < 5) {
                this.moveToNextPoint();
                
            }
        } else {
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                this.anims.play(this.currentIdleAnimation, true)
                
            }
        }
    }


}