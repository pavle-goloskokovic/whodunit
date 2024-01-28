import Suspect, {HairType, HeadType} from './Suspect';

type SmileType = 'ooo' | 'smirk' | 'wide';

export default class Head extends Phaser.GameObjects.Container {

    private smileType: SmileType = 'wide';
    private readonly smile;
    readonly drop;

    constructor (
        private suspect: Suspect,
        private headType: HeadType,
        hairType: HairType,
        x?: number, y?: number)
    {
        const scene = suspect.scene;

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

        this.drop = scene.add.image(0, 0,
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

                this.drop.x = 5;
                this.drop.y = -8.5;

                break;

            case 'S':

                switch (hairType)
                {
                    case 'brown':
                    case 'ginger':
                        hair.y = -2;
                        break;

                    case 'blonde':
                        hair.y = -1;
                        break;
                }

                this.drop.x = 4.5;
                this.drop.y = -7.5;

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
                switch (this.smileType)
                {
                    case 'wide':
                        this.smile.y = -2;
                        break;
                }
                break;
        }
    }

    updateSmile (distance: number): void
    {
        this.smileType = distance < 150 ? 'wide' :
            distance < 300 ? 'ooo' : 'smirk';

        this.smile.setFrame(`smile-${this.smileType}-${this.headType}`);

        this.drop.setVisible(this.smileType === 'wide' && !this.suspect.revealed);

        this.positionSmile();
    }
}
