import Giraffe from '../classes/Giraffe';
import Suspect from '../classes/Suspect';

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {

    constructor () { super('game'); }

    create (): void
    {
        console.info('Game enter');

        const scale = this.scale;
        const w = scale.width;
        const h = scale.height;
        const x = w / 2;
        const y = h / 2;

        this.add.image(x, y, 'sprites', 'bg');

        /*const bags =*/ [
            this.add.image(149, 358, 'sprites', 'bag')
                .setScale(8),
            this.add.image(325, 342, 'sprites', 'bag')
                .setScale(8),
        ];

        /*const biz =*/ this.add.existing(
            new Suspect(this, 'biz', 'L', 'brown', x -267, y + 6))
            .setScale(8);

        this.add.image(x - 8, y - 62, 'sprites', 'pen')
            .setScale(8);

        /*const pen =*/ this.add.existing(
            new Suspect(this, 'pen', 'L', 'beard', x - 8, y + 6))
            .setScale(8);

        /*const overlay =*/ this.add.image(0, 0, 'sprites', 'overlay')
            .setOrigin(0, 0)
            .setScale(w, h)
            .setVisible(false);

        this.add.existing(
            new Suspect(this, 'regular', 'S', 'brown', x + 244, y - 75)
                .setScale(8));

        this.add.existing(
            new Suspect(this, 'g-top', 'S', 'brown', x + 244, y - 75)
                .setScale(8)
                .setVisible(false));

        this.add.existing(
            new Suspect(this, 'g-down-right', 'S', 'ginger', x + 244, y + 77)
                .setScale(8)
                .setVisible(false));

        this.add.existing(
            new Suspect(this, 'g-down-left', 'S', 'blonde', x + 148, y + 77)
                .setScale(8)
                .setVisible(false));

        const giraffe = new Giraffe(this, x + 204, y - 7) // end: x, y + 30
            .setScale(8)
            .setVisible(false);
        this.add.existing(giraffe);

        this.add.image(x, 50, 'sprites', 'great-job')
            .setOrigin(0.5, 0)
            .setVisible(false);

        // TODO fireworks particles
    }
}
