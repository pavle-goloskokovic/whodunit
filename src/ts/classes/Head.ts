import {HairType, HeadType} from './Suspect';

type SmileType = 'ooo' | 'smirk' | 'wide';

export default class Head extends Phaser.GameObjects.Container {

    private smileType: SmileType = 'wide';
    private readonly smile;
    private drop;

    constructor (scene: Phaser.Scene,
        private headType: HeadType,
        hairType: HairType,
        x?: number, y?: number)
    {
        super(scene, x, y);

        const skin =
            scene.add.image(0, 0, 'sprites', `skin-${headType}`)
                .setOrigin(0.5, 1);

        const hair = scene.add.image(0, 0,
            'sprites', `hair-${hairType}-${headType}`)
            .setOrigin(0.5, 1);

        this.smile = scene.add.image(0, 0,
            'sprites', `smile-${this.smileType}-${headType}`)
            .setOrigin(0.5, 1);

        this.positionSmile();

        this.drop = scene.add.image(6, -8.5,
            'sprites', 'drop');

        switch (headType)
        {
            case 'L':

                switch (hairType)
                {
                    case 'brown':
                        hair.y = -6;
                        break;

                    case 'beard':
                        hair.x = 0.5;
                        break;
                }

                break;

            case 'S':
                break;
        }

        this.add([skin, this.smile, hair, this.drop]);
    }

    private positionSmile (): void
    {
        switch (this.headType)
        {
            case 'L':
                switch (this.smileType)
                {
                    case 'wide':
                        this.smile.y = -2;
                        break;
                }
                break;

            case 'S':
                break;
        }
    }
}
