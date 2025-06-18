import { Application, Container, Graphics } from "pixi.js";

export class Core {

    private app: Application;
    private gridDataHorizontal = [
        [0, 0, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0]
    ];
    private gridDataVertical = [
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0]
    ];
    private gridData = [[0]];

    // Configuration
    private CELL_SIZE_X = 0;
    private CELL_SIZE_Y = 0;
    private GRID_WIDTH = 0;
    private GRID_HEIGHT = 0;
    private gridContainer!: Container;

    constructor() {
        this.app = new Application();
        (async () => { this.init() })()
    }

    async init() {

        await this.app.init({ background: "#1099bb", resizeTo: window });
        document.getElementById("pixi-container")?.appendChild(this.app.canvas);

        if (this.app.screen.width > this.app.screen.height) {
            this.gridData = this.gridDataHorizontal
        }
        else {
            this.gridData = this.gridDataVertical
        }
        this.GRID_WIDTH = this.gridData[0].length;
        this.GRID_HEIGHT = this.gridData.length;
        this.CELL_SIZE_X = this.app.screen.width / this.GRID_WIDTH
        this.CELL_SIZE_Y = this.app.screen.height / this.GRID_HEIGHT

        // Create container for grid - use this.gridContainer
        this.gridContainer = new Container();
        this.app.stage.addChild(this.gridContainer);

        // Add resize event listener
        this.app.renderer.on('resize', () => {
            this.onResize();
        });

        // Alternative: Listen to window resize directly
        window.addEventListener('resize', () => {
            this.onResize();
        });

        // Call renderGrid() AFTER creating gridContainer
        this.renderGrid();

        console.log(this.gridData);

    }

    private updateGridForOrientation() {
        if (this.app.screen.width > this.app.screen.height) {
            this.gridData = this.gridDataHorizontal;
        } else {
            this.gridData = this.gridDataVertical;
        }
        this.GRID_WIDTH = this.gridData[0].length;
        this.GRID_HEIGHT = this.gridData.length;
        this.CELL_SIZE_X = this.app.screen.width / this.GRID_WIDTH;
        this.CELL_SIZE_Y = this.app.screen.height / this.GRID_HEIGHT;
    }

    private renderGrid() {
        // Clear existing grid (only if gridContainer exists)
        if (this.gridContainer) {
            this.gridContainer.removeChildren();
        }

        // Render the grid
        for (let row = 0; row < this.GRID_HEIGHT; row++) {
            for (let col = 0; col < this.GRID_WIDTH; col++) {
                const cell = new Graphics();

                // Set color based on array value
                const color = this.gridData[row][col] === 0 ? 0x000000 : 0xffffff; // Black for 0, white for 1

                // Draw the cell
                cell.rect(0, 0, this.CELL_SIZE_X, this.CELL_SIZE_Y);
                cell.fill(color);
                cell.stroke({ width: 1, color: 0x888888 }); // Optional border

                // Position the cell
                cell.x = col * this.CELL_SIZE_X;
                cell.y = row * this.CELL_SIZE_Y;

                // Make cell interactive
                cell.eventMode = 'static';
                cell.cursor = 'pointer';

                // Add click/touch listener
                cell.on('pointerdown', () => {
                    this.onCellClick(row, col);
                });

                this.gridContainer.addChild(cell);
            }
        }
    }

    private onResize() {
        this.updateGridForOrientation();
        this.renderGrid();
    }

    private onCellClick(row: number, col: number) {
        this.gridData[row][col] = this.gridData[row][col] === 0 ? 1 : 0;
        this.renderGrid();
    }

}