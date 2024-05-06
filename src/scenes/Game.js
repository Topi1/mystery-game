import { Scene } from 'phaser';

const {Vector2} = Phaser.Math

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.cursor
        this.playerSpeed = 60
        
    }

    create ()
    {   
        this.lights.enable().setAmbientColor(0x797979)
        //this.testLight = this.lights.addLight(600, 400, 800)
        //this.testLight.intensity = 1.5
        //this.testLight.depth = 10


        this.player = this.physics.add.sprite(600,400,"player")
        this.player.body.setAllowGravity(false)
        
        this.player.depth = 5
        this.player.scale = 0.8
        this.player.setSize(48,30)
        this.player.body.setOffset(24,93)
        this.player.setPipeline("Light2D")

        
        this.cameras.main.startFollow(this.player, true, 0.02,0.02)
        this.cameras.main.setBounds(0,0,2000,2000)

        
        
        /*this.input.on("pointerup", (pointer) => {
            const path = this.calculatePath(this.player, pointer)
            this.movePlayerAlongPath(path)
        })*/

        /*this.target = new Vector2()
        this.input.on("pointerup", (pointer) => {

            const {worldX, worldY} = pointer
            this.target.x = worldX
            this.target.y = worldY

            this.physics.moveToObject(this.player, this.target, 60)
        })*/

        //this.cameras.main.setBounds(0,0,1920,1980)

        /*this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });*/

        //this.img = this.add.image(0,0,"tiles")
        //this.img.depth = 5

        const map = this.make.tilemap({ key: "demomap" })
        
        const floorTileset = map.addTilesetImage("floor", "floorTiles2")
        const lowWallTileset = map.addTilesetImage("lowWalls", "lowWallTiles")
        const highWallTileset = map.addTilesetImage("walls", "highWallTiles")
        const objectTileset = map.addTilesetImage("objects", "objectTiles")

        const firstLayer = map.createLayer("floor", floorTileset).setPipeline("Light2D")
        firstLayer.depth = 0
        const secondLayer = map.createLayer("lowerWalls", lowWallTileset).setPipeline("Light2D")
        secondLayer.depth = 1
        const thirdLayer = map.createLayer("upperWalls", highWallTileset).setPipeline("Light2D")
        thirdLayer.depth = 3
        const fourthLayer = map.createLayer("objects", objectTileset).setPipeline("Light2D")
        fourthLayer.depth = 2

        firstLayer.setCollisionByProperty({ collides: true })
        secondLayer.setCollisionByProperty({ collides: true })
        thirdLayer.setCollisionByProperty({ collides: true })
        fourthLayer.setCollisionByProperty({ collides: true })

        this.physics.add.collider(this.player, [
            firstLayer,
            secondLayer,
            thirdLayer,
            fourthLayer
        ])


        this.cursor = this.input.keyboard.createCursorKeys();
        

        /*const debugGraphics = this.add.graphics().setAlpha(0.7)
        secondLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,234,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)
        })*/
    }

    /*calculatePath(start, end) {
        const path = []

        const dx = end.x - start.x
        const dy = end.y - start.y

        const distance = Math.sqrt(dx * dx + dy* dy)

        const numSteps = Math.ceil(distance / 10)

        for (let i = 0; i <= numSteps; i++) {
            const t = i / numSteps
            const x = start.x + t * dx
            const y = start.y + t * dy
            path.push({ x,y })
        }
        return path
    }

    movePlayerAlongPath(path) {
        for (let i = 0; i < path.length; i++) {
            const point = path[i]
            this.tweens.add({
                targets: this.player,
                x: point.x,
                y: point.y,
                duration: 500,
                ease: "Linear",
                onComplete: () => {

                }
            })
        }
    }*/

    update() {

        

        /*if(this.player.body.speed > 0) {
            const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.target.x, this.target.y)
        

        if(d < 4) {
            this.player.body.reset(this.target.x, this.target.y)
        }
      }*/

      const { left, right, up, down } = this.cursor;
      
      if (left.isDown) {
        this.player.setVelocityX(-this.playerSpeed);
        this.player.flipX = true
      } else if (right.isDown) {
        this.player.setVelocityX(this.playerSpeed);
        this.player.flipX = false
      } else {
        this.player.setVelocityX(0);
      }
  
      if (up.isDown) {
        this.player.setVelocityY(-this.playerSpeed);
      } else if (down.isDown) {
        this.player.setVelocityY(this.playerSpeed);
      } else {
        this.player.setVelocityY(0);
      }

      this.player.x = Math.round(this.player.x)
      this.player.y = Math.round(this.player.y)

      
    
    
      
      
    } 
        
}
