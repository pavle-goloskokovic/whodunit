export const
    /**
     * Game title used for page title tag and metadata.
     * @type {string}
     */
    title = 'Whodunit | GGJ 2024',
    /**
     * Game description used for html page metadata.
     * @type {string}
     */
    description = 'Who stole what',
    /**
     * Setting which enables us to quickly mute game sounds.
     * @type {boolean}
     */
    mute = false,
    /**
     * Setting which determines if stats should be enabled in game.
     * @type {boolean}
     */
    stats = true,
    /**
     * Game dimensions
     * @type {{w: number; h: number}}
     */
    size: {
        readonly w: number;
        readonly h: number;
    } = {
        w: 1024,
        h: 576
    },
    /**
     * Google Analytics 4 tag ID
     * @type {string}
     */
    tagId: string = null; // 'TAG_ID'; // TODO update
