import Giraffe from '../classes/Giraffe';

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

        /*const overlay =*/ this.add.image(0, 0, 'sprites', 'overlay')
            .setOrigin(0, 0)
            .setScale(w, h)
            .setVisible(!false);

        const giraffe = new Giraffe(this, x, y)
            .setScale(10);
        this.add.existing(giraffe);

        this.add.image(x, 50, 'sprites', 'great-job')
            .setOrigin(0.5, 0);

        // TODO fireworks particles
    }
}
