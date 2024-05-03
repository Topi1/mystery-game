import { Scene } from 'phaser';

const {Vector2} = Phaser.Math

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        //this.scene.physics.world.fixedStep = false
        this.player = this.physics.add.sprite(400,400,"player")
        this.player.body.setAllowGravity(false)
        this.player.depth = 5
        this.player.scale = 0.8

        this.cameras.main.startFollow(this.player, false)
        this.cameras.main.setBounds(0,0,1000,1000)
        


        this.target = new Vector2()
        this.input.on("pointerup", (pointer) => {

            const {worldX, worldY} = pointer
            this.target.x = worldX
            this.target.y = worldY

            this.physics.moveToObject(this.player, this.target, 60)
        })

        //this.cameras.main.setBounds(0,0,1920,1980)

        /*this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });*/

        //this.img = this.add.image(0,0,"tiles")
        //this.img.depth = 5

        const map = this.make.tilemap({ key: "map" })
        const tileset = map.addTilesetImage("phaserThest", "tiles")

        const firstLayer = map.createLayer("first", tileset)
        const secondLayer = map.createLayer("second", tileset)

        secondLayer.setCollisionByProperty({ collides: true })

        /*const debugGraphics = this.add.graphics().setAlpha(0.7)
        secondLayer.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243,234,48,255),
            faceColor: new Phaser.Display.Color(40,39,37,255)
        })*/
    }

    update() {
        if(this.player.body.speed > 0) {
            const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.target.x, this.target.y)
        

        if(d < 4) {
            this.player.body.reset(this.target.x, this.target.y)
        }
      }
    }
}
