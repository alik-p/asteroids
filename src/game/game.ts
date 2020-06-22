import { Drawing } from './drawing';

export class AsteroidsGame {
    readonly #canvas: HTMLCanvasElement;
    readonly #context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.draw();
    }

    private draw(): void {
        Drawing.drawGrid(this.#context);
        Drawing.drawSpaceship(this.#context, 50);
    }

}
