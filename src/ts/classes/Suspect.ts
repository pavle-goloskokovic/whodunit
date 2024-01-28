import Head from './Head';

export type HeadType = 'S' | 'L';
export type HairType = 'beard' | 'brown' | 'ginger' | 'blonde';

export default class Suspect extends Phaser.GameObjects.Container {

    constructor (scene: Phaser.Scene,
        bodyFrame: 'biz' | 'pen' | 'regular' | 'g-top' | 'g-down-left' | 'g-down-right',
        headType: HeadType,
        hairType: HairType,
        x?: number, y?: number
    )
    {
        super(scene, x, y);

        const body =
            scene.add.image(0, 0, 'sprites', `body-${bodyFrame}`)
                .setOrigin(0.5, 0);

        switch (bodyFrame)
        {
            case 'pen':
                body.x = 0.5;
                body.y = -1;
                break;

            case 'regular':
                body.x = -5.5;
                break;

            case 'g-top':
                body.x = 0.5;
                break;

            case 'g-down-right':
            case 'g-down-left':
                body.x = -0.5;
                break;
        }

        const head =
            scene.add.existing(new Head(scene, headType, hairType, 0, 0));

        this.add([head, body]);
    }
}
