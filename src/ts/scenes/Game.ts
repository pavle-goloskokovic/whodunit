import Giraffe from '../classes/Giraffe';
import Suspect from '../classes/Suspect';

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {

    private biz: Suspect;
    private pen: Suspect;
    private regular: Suspect;
    private gTop: Suspect;
    private gRight: Suspect;
    private gLeft: Suspect;
    private giraffe: Giraffe;
    // private greatJob: Phaser.GameObjects.Image;

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

        const bags = [
            this.add.image(149, 358, 'sprites', 'bag')
                .setScale(8),
            this.add.image(325, 342, 'sprites', 'bag')
                .setScale(8),
        ];

        this.biz = this.add.existing(
            new Suspect(this, 'biz', 'L', 'brown', x -267, y + 6))
            .setScale(8)
            .on('pointerdown', () =>
            {
                if (this.input.x < this.biz.x)
                {
                    this.children.moveAbove(bags[0], this.biz);
                }
                else
                {
                    this.children.moveAbove(bags[1], this.biz);
                }

                const i = this.children.getIndex(this.biz);
                if (i < this.children.getIndex(bags[0]) &&
                    i < this.children.getIndex(bags[1]))
                {
                    this.biz.reveal();
                }
            });

        const feather = this.add.image(x - 8, y - 62, 'sprites', 'pen')
            .setScale(8);

        this.pen = this.add.existing(
            new Suspect(this, 'pen', 'L', 'beard', x - 8, y + 6))
            .setScale(8)
            .on('pointerdown', () =>
            {
                feather.y -= 80;

                this.pen.reveal();
            });

        /*const overlay =*/ this.add.image(0, 0, 'sprites', 'overlay')
            .setOrigin(0, 0)
            .setScale(w, h)
            .setVisible(false);

        this.regular = this.add.existing(
            new Suspect(this, 'regular', 'S', 'brown', x + 244, y - 75)
                .setScale(8));

        this.gTop = this.add.existing(
            new Suspect(this, 'g-top', 'S', 'brown', x + 244, y - 75)
                .setScale(8)
                .setVisible(false));

        this.gRight = this.add.existing(
            new Suspect(this, 'g-down-right', 'S', 'ginger', x + 244, y + 77)
                .setScale(8)
                .setVisible(false));

        this.gLeft = this.add.existing(
            new Suspect(this, 'g-down-left', 'S', 'blonde', x + 148, y + 77)
                .setScale(8)
                .setVisible(false));

        this.giraffe = new Giraffe(this, x + 204, y - 7) // end: x, y + 30
            .setScale(8)
            .setVisible(false);
        this.add.existing(this.giraffe);

        /*this.greatJob =*/ this.add.image(x, 50, 'sprites', 'great-job')
            .setOrigin(0.5, 0)
            .setVisible(false);

        // TODO fireworks particles
    }

    update (/*time: number, delta: number*/)
    {
        this.biz.update();
        this.pen.update();
        this.regular.update();
        this.gTop.update();
        this.gRight.update();
        this.gLeft.update();
    }
}
