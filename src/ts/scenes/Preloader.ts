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

        const loadOn = (event: string) =>
        {
            this.load.on(event, (...args: any[])=>
            {
                console.log(event, args);
            });
        };
        loadOn(Phaser.Loader.Events.ADD);
        loadOn(Phaser.Loader.Events.FILE_LOAD);
        loadOn(Phaser.Loader.Events.FILE_LOAD_ERROR);
        loadOn(Phaser.Loader.Events.COMPLETE);
        loadOn(Phaser.Loader.Events.FILE_PROGRESS);
        loadOn(Phaser.Loader.Events.FILE_COMPLETE);
        loadOn(Phaser.Loader.Events.POST_PROCESS);
        loadOn(Phaser.Loader.Events.PROGRESS);
        loadOn(Phaser.Loader.Events.START);

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
