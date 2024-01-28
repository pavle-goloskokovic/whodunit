import spritesData from '../../data/sprites.json';

/**
 * Preloader Phaser scene.
 *
 * This is where we load all the assets including images,
 * sounds and all relevant data before starting the game.
 */
export default class Preloader extends Phaser.Scene {

    constructor () { super('preloader'); }

    preload (): void
    {
        console.info('Preloader enter');

        this.load.audio('main',
            require('../../assets/audio/moody-cop-show-130bpm-short-music-079613070_nw_prev.mp3'));
        this.load.audio('end',
            require('../../assets/audio/prime-tv-loop-01-pop-music-046865998_nw_prev.mp3'));

        this.load.atlas('sprites',
            require('../../assets/images/sprites.png'),
            spritesData);
    }

    create (): void
    {
        console.info('Preloader leave');

        this.scene.start('game');
    }

}
