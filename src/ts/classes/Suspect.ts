import Head from './Head';

export type HeadType = 'S' | 'L';
export type HairType = 'beard' | 'brown';

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

        const head =
            scene.add.existing(new Head(scene, headType, hairType, 0, 0));

        this.add([body, head]);
    }
}
