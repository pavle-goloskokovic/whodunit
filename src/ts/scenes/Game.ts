import Giraffe from '../classes/Giraffe';
import Suspect from '../classes/Suspect';

const {
    red,
    orange,
    yellow,
    lime,
    green,
    aqua,
    blue,
    fuchsia,
    purple
} = {
    aqua: 0x26ccff,
    // black: 0x111111,
    blue: 0x004e82,
    fuchsia: 0xff36ff,
    // gray: 0xaaaaaa,
    green: 0x88ff5a,
    lime: 0x01ff70,
    // maroon: 0x85144b,
    // navy: 0x001f3f,
    // olive: 0x3d9970,
    orange: 0xffa62d,
    purple: 0xa25afd,
    red: 0xff5e7e,
    // silver: 0xdddddd,
    // teal: 0x39cccc,
    // white: 0xffffff,
    yellow: 0xfcff42
};

const tints = [
    red,
    orange,
    yellow,
    lime,
    green,
    aqua,
    blue,
    fuchsia,
    purple
];

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
    private overlay: Phaser.GameObjects.Image;
    private greatJob: Phaser.GameObjects.Image;

    constructor () { super('game'); }

    init (): void
    {
        this.textures.generate('rocket', {
            data: ['0123...'],
            palette: {
                0: '#fff2',
                1: '#fff4',
                2: '#fff8',
                3: '#ffff'
            } as any,
            pixelWidth: 4
        });
    }

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

        this.overlay = this.add.image(0, 0, 'sprites', 'overlay')
            .setOrigin(0, 0)
            .setScale(w, h)
            .setAlpha(0);

        this.regular = this.add.existing(
            new Suspect(this, 'regular', 'S', 'brown', x + 244, y - 75))
            .setScale(8)
            .on('pointerdown', () =>
            {
                this.regular.setVisible(false).reveal();

                this.gTop.visible =
                    this.gRight.visible =
                        this.gLeft.visible = true;
            });

        this.gTop = this.add.existing(
            new Suspect(this, 'g-top', 'S', 'brown', x + 244, y - 75))
            .setScale(8)
            .setVisible(false)
            .on('pointerdown', () =>
            {
                this.gTop/*.setVisible(false)*/.reveal();

                if (this.giraffe.reveal(0))
                {
                    /*this.gTop.visible =
                        this.gRight.visible =
                            this.gLeft.visible = true;*/

                    this.end();
                }
            });

        this.gRight = this.add.existing(
            new Suspect(this, 'g-down-right', 'S', 'ginger', x + 244, y + 77))
            .setScale(8)
            .setVisible(false)
            .on('pointerdown', () =>
            {
                this.gRight/*.setVisible(false)*/.reveal();

                if (this.giraffe.reveal(1))
                {
                    /*this.gTop.visible =
                        this.gRight.visible =
                            this.gLeft.visible = true;*/

                    this.end();
                }
            });

        this.gLeft = this.add.existing(
            new Suspect(this, 'g-down-left', 'S', 'blonde', x + 148, y + 77))
            .setScale(8)
            .setVisible(false)
            .on('pointerdown', () =>
            {
                this.gLeft/*.setVisible(false)*/.reveal();

                if (this.giraffe.reveal(2))
                {
                    /*this.gTop.visible =
                        this.gRight.visible =
                            this.gLeft.visible = true;*/

                    this.end();
                }
            });

        this.giraffe = this.add.existing(new Giraffe(this, x + 204, y - 7)) // end: x, y + 30
            .setScale(8);

        this.greatJob = this.add.image(x, 50, 'sprites', 'great-job')
            .setOrigin(0.5, 0)
            .setScale(0);
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

    end (): void
    {
        const scale = this.scale;
        const w = scale.width;
        const h = scale.height;
        const x = w / 2;
        const y = h / 2;

        this.tweens.add({
            targets: this.giraffe,
            scaleX: 11,
            scaleY: 11,
            x,
            y: y + 30,
            duration: 500,
            ease: Phaser.Math.Easing.Back.Out,
            onComplete: () =>
            {
                this.tweens.chain({
                    targets: this.giraffe,
                    tweens: [
                        {
                            scaleX: 9,
                            scaleY: 9,
                            duration: 200,
                            ease: Phaser.Math.Easing.Back.In
                        },
                        {
                            scaleX: 11,
                            scaleY: 11,
                            duration: 200,
                            ease: Phaser.Math.Easing.Back.In
                        }
                    ],
                    loop: -1,
                    yoyo: true,
                    loopDelay: 0
                });
            }
        });

        this.tweens.chain({
            targets: this.giraffe,
            tweens: [
                {
                    angle: -20,
                    duration: 300,
                    ease: Phaser.Math.Easing.Back.In
                },
                {
                    angle: 20,
                    duration: 300,
                    ease: Phaser.Math.Easing.Back.In
                }
            ],
            loop: -1,
            yoyo: true,
            loopDelay: 0
        });

        this.tweens.add({
            targets: this.greatJob,
            scaleX: 1,
            scaleY: 1,
            duration: 1000,
            ease: Phaser.Math.Easing.Back.Out
        });

        this.tweens.add({
            targets: this.overlay,
            alpha: 1,
            duration: 1000
        });

        // particles

        const updateParticleRotation = (p: Phaser.GameObjects.Particles.Particle): number =>
        {
            return Phaser.Math.RadToDeg(Math.atan2(p.velocityY, p.velocityX));
        };

        const particlesConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig = {
            alpha: { start: 1, end: 0, ease: 'Cubic.easeIn' },
            angle: { start: 0, end: 360, steps: 100 },
            rotate: {
                onEmit: updateParticleRotation,
                onUpdate: updateParticleRotation
            },
            blendMode: 'ADD',
            gravityY: 128,
            lifespan: 3000,
            quantity: 500,
            reserve: 500,
            scaleX: {
                onUpdate: (p: Phaser.GameObjects.Particles.Particle) =>
                {
                    return Phaser.Math.Easing.Cubic.Out(1 - p.lifeT);
                }
            },
            speed: { min: 128, max: 256 }
        };

        const updateEmitter = (emitter: Phaser.GameObjects.Particles.ParticleEmitter) =>
        {
            emitter.setPosition(
                1024 * Phaser.Math.FloatBetween(0.25, 0.75),
                768 * Phaser.Math.FloatBetween(0, 0.5));
            emitter.particleTint = Phaser.Utils.Array.GetRandom(tints);
        };

        const emitter1 = this.add
            .particles(0, 0, 'rocket', particlesConfig)
            .setFrequency(2000);
        const emitter2 = this.add
            .particles(0, 0, 'rocket', particlesConfig)
            .setFrequency(3000);
        const emitter3 = this.add
            .particles(0, 0, 'rocket', particlesConfig)
            .setFrequency(4000);

        updateEmitter(emitter1);
        updateEmitter(emitter2);
        updateEmitter(emitter3);

        this.time.addEvent({
            delay: emitter1.frequency,
            repeat: -1,
            callback: () =>
            {
                updateEmitter(emitter1);
            }
        });

        this.time.addEvent({
            delay: emitter2.frequency,
            repeat: -1,
            callback: () =>
            {
                updateEmitter(emitter2);
            }
        });

        this.time.addEvent({
            delay: emitter3.frequency,
            repeat: -1,
            callback: () =>
            {
                updateEmitter(emitter3);
            }
        });
    }
}
