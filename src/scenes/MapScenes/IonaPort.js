import { Scene } from 'phaser';
import { Player } from '../../player';
import GameAnimations from '../GameAnimations';






export class IonaPort extends Scene {
    constructor() {
        super('IonaPort');
       
    }

    create() {

        GameAnimations.create(this)
        this.player = new Player(this, 600, 170, 'player', 0,  this.navMesh);

        this.cameras.main.startFollow(this.player, true, 1, 1);
        //this.cameras.main.setBounds(0, 0, portMap.widthInPixels, portMap.heightInPixels);
        //this.cameras.main.setZoom(1.5)

        this.lights.enable()
        this.lights.enable().setAmbientColor(0x0ffffff);

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
        });





        
    }

    update() {
        this.player.update()
    }

}