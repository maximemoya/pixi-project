import * as PIXI from 'pixi.js';

export class TextService {
    private app: PIXI.Application;

    constructor(app: PIXI.Application) {
        this.app = app;
    }

    /**
     * Creates clickable text with a background that triggers a callback when clicked
     * @param content The text content to display
     * @param x X position
     * @param y Y position
     * @param style Text style options
     * @param bgOptions Background styling options
     * @param onContinue Callback function to execute when clicked
     * @returns PIXI.Container containing the text and background
     */
    createClickableTextWithBackground(
        content: string,
        x: number,
        y: number,
        style: Partial<PIXI.TextStyle> = {},
        bgOptions: {
            color?: number,
            alpha?: number,
            padding?: number,
            borderRadius?: number,
            borderWidth?: number,
            borderColor?: number
        } = {}
    ): PIXI.Container {
        // Create a container for the button
        const container = new PIXI.Container();
        container.position.set(x, y);

        // Set default style with visual cues that it's clickable
        const defaultStyle: Partial<PIXI.TextStyle> = {
            fontFamily: 'Arial',
            fontSize: 48,
            fill: 0xffffff,
            fontWeight: 'bold'
        };

        // Merge default style with provided style
        const textStyle = new PIXI.TextStyle({ ...defaultStyle, ...style });

        // Create the text object
        const text = new PIXI.Text(content, textStyle);

        // Set default background options
        const defaultBgOptions = {
            color: 0x333333,
            alpha: 0.8,
            padding: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 0x555555
        };

        // Merge default bg options with provided options
        const finalBgOptions = { ...defaultBgOptions, ...bgOptions };

        // Create the background
        const background = new PIXI.Graphics();
        background.beginFill(finalBgOptions.color, finalBgOptions.alpha);

        if (finalBgOptions.borderWidth > 0) {
            background.lineStyle(finalBgOptions.borderWidth, finalBgOptions.borderColor);
        }

        // Draw rounded rectangle background
        background.drawRoundedRect(
            -finalBgOptions.padding,
            -finalBgOptions.padding,
            text.width + finalBgOptions.padding * 2,
            text.height + finalBgOptions.padding * 2,
            finalBgOptions.borderRadius
        );
        background.endFill();

        // Add background and text to container
        container.addChild(background);
        container.addChild(text);

        // Make the container interactive
        container.eventMode = 'static';
        container.cursor = 'pointer';

        // Add hover effects
        container.on('pointerover', () => {
            container.alpha = 0.9;
            container.scale.set(1.05, 1.05);
        });

        container.on('pointerout', () => {
            container.alpha = 1.0;
            container.scale.set(1.0, 1.0);
        });

        text.visible = true
        background.visible = true
        return container;
    }

    /**
     * Creates a popup-style continue prompt with background
     * @param container The container to add the prompt to
     * @param onContinue Callback function to execute when clicked
     * @returns PIXI.Container containing the prompt
     */
    createContinuePopup(
        text: string,
        container: PIXI.Container
    ): PIXI.Container {
        const popup = this.createClickableTextWithBackground(
            text,
            this.app.screen.width / 2,
            this.app.screen.height / 2,
            {
                fill: 0xffffff,
                fontSize: 48,
                align: 'center',
                dropShadow: {
                    color: 0x000000,
                    alpha: 1,
                    angle: 45,
                    blur: 2,
                    distance: 2
                },
            },
            {
                color: 0x3355aa,
                alpha: 0.9,
                padding: 15,
                borderRadius: 12,
                borderWidth: 4,
                borderColor: 0x4477cc
            }
        );

        // Center the popup
        popup.pivot.x = popup.width / 2;
        popup.pivot.y = popup.height / 2;
        popup.zIndex = 20
        popup.visible = true

        // Add to container
        container.addChild(popup);

        return popup;
    }

    /**
     * Creates clickable text that triggers a callback when clicked
     * @param content The text content to display
     * @param x X position
     * @param y Y position
     * @param style Text style options
     * @param onContinue Callback function to execute when text is clicked
     * @returns PIXI.Text instance
     */
    createClickableText(
        content: string,
        x: number,
        y: number,
        style: Partial<PIXI.TextStyle> = {},
        onContinue: () => void
    ): PIXI.Text {
        // Set default style with visual cues that it's clickable
        const defaultStyle: Partial<PIXI.TextStyle> = {
            fontFamily: 'Arial',
            fontSize: 42,
            fill: 0xffffff,
            fontWeight: 'bold'
        };

        // Merge default style with provided style
        const textStyle = new PIXI.TextStyle({ ...defaultStyle, ...style });

        // Create the text object
        const text = new PIXI.Text(content, textStyle);
        text.position.set(x, y);

        // Make it interactive and add hover effects
        text.eventMode = 'static';
        text.cursor = 'pointer';

        // Add hover effects
        text.on('pointerover', () => {
            text.alpha = 0.8;
            text.scale.set(1.05, 1.05);
        });

        text.on('pointerout', () => {
            text.alpha = 1.0;
            text.scale.set(1.0, 1.0);
        });

        // Add click handler
        text.on('pointerdown', () => {
            onContinue();
        });

        return text;
    }

    /**
     * Example usage: Create a "Click to continue" prompt
     * @param container The container to add the text to
     * @param onContinue Callback function to execute when clicked
     * @returns PIXI.Text instance
     */
    createContinuePrompt(
        container: PIXI.Container,
        onContinue: () => void
    ): PIXI.Text {
        const text = this.createClickableText(
            "Click to continue...",
            this.app.screen.width / 2,
            this.app.screen.height - 100,
            {
                fill: 0x00ffff,
                fontSize: 28,
                dropShadow: {
                    color: 0x000000,
                    alpha: 0,
                    angle: 0,
                    blur: 4,
                    distance: 2
                }
            },
            onContinue
        );

        // Center the text
        text.anchor.set(0.5);

        // Add to container
        container.addChild(text);

        return text;
    }

}