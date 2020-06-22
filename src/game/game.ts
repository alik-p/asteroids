import { Drawing } from './drawing';
import { Spaceship } from './spaceship/spaceship.model';

export class AsteroidsGame {
    readonly #canvas: HTMLCanvasElement;
    readonly #context: CanvasRenderingContext2D;

    #spaceship: Spaceship;

    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#spaceship = new Spaceship(
            this.#canvas.width / 2,
            this.#canvas.height / 2,
            20
        );
        this.draw();
    }


    private draw(): void {
        Drawing.drawGrid(this.#context);
        this.#spaceship.draw(this.#context);
    }

}
