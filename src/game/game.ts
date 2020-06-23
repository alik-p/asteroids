import { Drawing } from './drawing';
import { Spaceship } from './spaceship/spaceship.model';

export class AsteroidsGame {
    readonly #canvas: HTMLCanvasElement;
    readonly #context: CanvasRenderingContext2D;

    #spaceship: Spaceship;
    #timestamp: number;


    constructor(canvas: HTMLCanvasElement) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#spaceship = new Spaceship(
            this.#canvas.width / 2,
            this.#canvas.height / 2,
            20
        );
        requestAnimationFrame(this.frame.bind(this));
    }


    frame(timestamp: number): void {
        if (!this.#timestamp) this.#timestamp = timestamp;
        const elapsed = timestamp - this.#timestamp;
        this.update(elapsed / 1000);
        this.draw();
        this.#timestamp = timestamp;
        requestAnimationFrame(this.frame.bind(this));
    }


    private draw(): void {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        Drawing.drawGrid(this.#context);
        this.#spaceship.draw(this.#context);
        // Temporary indication:
        this.#context.fillStyle = 'white';
        this.#context.fillText(`Timestamp: ${this.#timestamp}`, 20, 30);
    }


    private update(timeElapsed: number): void {
        this.#spaceship.update(this.#context, timeElapsed);
    }

}
