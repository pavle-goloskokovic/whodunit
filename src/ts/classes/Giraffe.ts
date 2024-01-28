export default class Giraffe extends Phaser.GameObjects.Container {

    private pieces: Phaser.GameObjects.Image[] = [];
    private revealed: number = 0;

    constructor (scene: Phaser.Scene, x?: number, y?: number)
    {
        super(scene, x, y);

        this.pieces.push(
            scene.add.image(6, -10, 'sprites', 'g-top')
                .setVisible(false),
            scene.add.image(2, 9, 'sprites', 'g-down-right')
                .setVisible(false),
            scene.add.image(-8, 9, 'sprites', 'g-down-left')
                .setVisible(false),
        );

        this.add(this.pieces);
    }

    reveal (index: number): boolean
    {
        if (!this.pieces[index].visible)
        {
            this.pieces[index].visible = true;

            this.revealed++;

            if (this.revealed === 3)
            {
                // TODO giraffe found

                console.log('giraffe found');

                this.setScale(10);

                return true;
            }
        }

        return false;
    }
}
