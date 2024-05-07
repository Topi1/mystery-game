// phaser-navmesh.d.ts
declare module 'phaser-navmesh' {
    import Phaser from 'phaser';

    export class PhaserNavMeshPlugin extends Phaser.Plugins.ScenePlugin {
        constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager);

        buildMeshFromTilemap(
            key: string,
            tilemap: Phaser.Tilemaps.Tilemap,
            layers: Phaser.Tilemaps.TilemapLayer[]
        ): PhaserNavMesh;

        findPath(
            key: string,
            start: { x: number; y: number },
            end: { x: number; y: number }
        ): { x: number; y: number }[] | null;

        enableDebug(key: string, options?: object): void;
    }

    export class PhaserNavMesh {
        findPath(start: { x: number; y: number }, end: { x: number; y: number }): { x: number; y: number }[] | null;
        enableDebug(): void;
    }
}
