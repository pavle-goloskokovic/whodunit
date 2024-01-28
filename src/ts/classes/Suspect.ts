import Head from './Head';

export type HeadType = 'S' | 'L';
export type HairType = 'beard' | 'brown' | 'ginger' | 'blonde';

const temp = new Phaser.Math.Vector2();

export default class Suspect extends Phaser.GameObjects.Container {

    private center: Phaser.Math.Vector2;
    private readonly head: Head;

    revealed: boolean = false;

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

        this.head =
            scene.add.existing(new Head(this, headType, hairType, 0, 0));

        this.add([this.head, body]);

        const bounds = this.getBounds();
        this.center = new Phaser.Math.Vector2(
            bounds.centerX, bounds.centerY
        );
        /*this.setInteractive({
            hitArea: bounds,
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            cursor: 'pointer'
        } as Phaser.Types.Input.InputConfiguration);*/

        this.setSize(bounds.width, bounds.height)
            .setInteractive({
                cursor: `url('${require('../../assets/images/pointer.png')}'), pointer`
            });
    }

    update ()
    {
        const input = this.scene.input;

        this.head.updateSmile(
            this.center.distance(temp.set(input.x, input.y))
        );
    }

    reveal (): void
    {
        this.revealed = true;
        this.head.drop.setVisible(false);
        this.removeInteractive();
    }
}
