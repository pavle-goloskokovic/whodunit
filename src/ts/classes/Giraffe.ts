export default class Giraffe extends Phaser.GameObjects.Container {

    pieces: Phaser.GameObjects.Image[] = [];

    constructor (scene: Phaser.Scene, x?: number, y?: number)
    {
        super(scene, x, y);

        this.pieces.push(
            scene.add.image(6, -10, 'sprites', 'g-top'),
            scene.add.image(2, 9, 'sprites', 'g-down-right'),
            scene.add.image(-8, 9, 'sprites', 'g-down-left'),
        );

        this.add(this.pieces);
    }
}
