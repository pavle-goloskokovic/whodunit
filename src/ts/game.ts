/**
 * Game entry point
 */

import '../css/style.css'; // loading css
import 'phaser'; // loading Phaser
import {size, stats} from './game.config';

import Boot from './scenes/Boot';
import Preloader from './scenes/Preloader';
import Game from './scenes/Game';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'container', // parent id - '' means  no container
    scale: {
        width: size.w,
        height: size.h,
        // mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        Game
    ],
    pixelArt: true
};

// Choosing implementation based on 'stats' app config setting
if (process.env.NODE_ENV !== 'production' && stats)
{
    const PhaserStatsGame = require('./classes/PhaserStatsGame').default;
    new PhaserStatsGame(config);
}
else
{
    new Phaser.Game(config);
}
