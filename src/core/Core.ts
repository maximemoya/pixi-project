import { Application, Container, Graphics } from "pixi.js";

export class Core {

    private app: Application;
    private gridDataHorizontal = [
        [1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1, 0]
    ];
    private gridDataVertical = [
        [0, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1, 1],
        [0, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1]
    ];
    private gridData = [[0]];

    // Configuration
    private CELL_SIZE_X = 0;
    private CELL_SIZE_Y = 0;
    private GRID_WIDTH = 0;
    private GRID_HEIGHT = 0;
    private gridContainer!: Container;

    private selectedCell: { row: number, col: number } | null = null

    constructor() {
        this.app = new Application();
        (async () => { this.init() })()
    }

    async init() {

        await this.app.init({ background: "#1099bb", resizeTo: window });
        document.getElementById("pixi-container")?.appendChild(this.app.canvas);

        this.updateGridForOrientation();

        // Create container for grid - use this.gridContainer
        this.gridContainer = new Container();
        this.app.stage.addChild(this.gridContainer);

        // Add resize event listener
        this.app.renderer.on('resize', () => {
            this.onResize();
        });

        // Call renderGrid() AFTER creating gridContainer
        this.renderGrid();

    }

    private updateGridForResizeOnly() {
        this.GRID_WIDTH = this.gridData[0].length;
        this.GRID_HEIGHT = this.gridData.length;
        this.CELL_SIZE_X = this.app.screen.width / this.GRID_WIDTH;
        this.CELL_SIZE_Y = this.app.screen.height / this.GRID_HEIGHT;
    }

    private updateGridForOrientation() {
        if (this.app.screen.width > this.app.screen.height) {
            if (this.selectedCell !== null) {
                this.selectedCell = VerticalToHorizontalPoint({ ...this.selectedCell }, { value: this.gridData })
            }
            this.gridData = this.gridDataHorizontal;
        } else {
            if (this.selectedCell !== null) {
                this.selectedCell = HorizontalToVerticalPoint({ ...this.selectedCell }, { value: this.gridData })
            }
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

        if (this.selectedCell !== null) {
            const cell = new Graphics();
            cell.rect(0, 0, this.CELL_SIZE_X, this.CELL_SIZE_Y);
            cell.stroke({ width: 4, color: "yellow" });
            cell.x = this.selectedCell.col * this.CELL_SIZE_X;
            cell.y = this.selectedCell.row * this.CELL_SIZE_Y;
            this.gridContainer.addChild(cell);
        }

    }

    private onResize() {
        this.updateGridForResizeOnly();
        this.renderGrid();
    }

    private onCellClick(row: number, col: number) {
        // this.gridData[row][col] = this.gridData[row][col] === 0 ? 1 : 0;
        if (this.selectedCell === null) {
            this.selectedCell = { row, col }
        }
        else {
            this.selectedCell = null
        }

        this.renderGrid();
    }

}

/**
 * Converts rows to columns (transpose operation)
 * @param {number[][]} matrix - The input matrix
 * @returns {number[][]} Matrix with rows converted to columns
 */
function HorizontalToVerticalGrid(matrix) {
    if (!matrix || matrix.length === 0) {
        return [];
    }

    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const result = [];

    // Create new matrix where each row becomes a column
    for (let col = 0; col < numCols; col++) {
        result[col] = [];
        for (let row = 0; row < numRows; row++) {

            result[col][row] = matrix[numRows - 1 - row][col]

        }
    }

    return result;
}

/**
 * Converts columns to rows (simple transpose operation)
 * @param {number[][]} matrix - The input matrix
 * @returns {number[][]} Matrix with columns converted to rows
 */
function VerticalToHorizontalGrid(matrix) {
    if (!matrix || matrix.length === 0) {
        return [];
    }

    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const result = [];

    // Create new matrix where each column becomes a row
    for (let col = 0; col < numCols; col++) {
        result[col] = [];
        for (let row = 0; row < numRows; row++) {
            result[col][row] = matrix[row][col];
        }
    }

    return result;
}

function HorizontalToVerticalPoint(point: { row: number, col: number }, grid: { value: number[][] }): { row: number, col: number } {
    return {
        row: point.col,
        col: grid.value.length - 1 - point.row
    }
}

function VerticalToHorizontalPoint(point: { row: number, col: number }, grid: { value: number[][] }): { row: number, col: number } {
    return {
        row: grid.value[0].length - 1 - point.col,
        col: point.row
    }
}

// TEST :
// {0, 0} <=> {0, 5}
// {2, 4} <=> {4, 3}
// {3, 0} <=> {0, 2}
// {0, 8} <=> {8, 5}
// {5, 8} <=> {8, 0}
const gridDataHorizontal = [
    [1, 1, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0]
];
const gridDataVertical = [
    [0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1]
];