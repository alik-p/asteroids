import { Drawing } from './drawing';
import { Spaceship } from './spaceship/spaceship.model';
import { NumberIndicator } from './shared/number-indicator/number-indicator.model';
import { Asteroid } from './asteroid/asteroid.model';

export class AsteroidsGame {
    readonly #canvas: HTMLCanvasElement;
    readonly #context: CanvasRenderingContext2D;

    #asteroids: Asteroid[];
    #fps: number;
    #fpsIndicator: NumberIndicator;
    #spaceship: Spaceship;
    #timestamp: number;


    constructor(canvas: HTMLCanvasElement) {
        const {height, width} = canvas;
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#asteroids = [
            new Asteroid(width * Math.random(), height * Math.random(), 50),
            new Asteroid(width * Math.random(), height * Math.random(), 40),
        ];
        this.#fpsIndicator = new NumberIndicator(width - 10, height - 15, 'fps', {digits: 2});
        this.#spaceship = new Spaceship(width / 2, height / 2, 20);
        requestAnimationFrame(this.frame.bind(this));
    }


    frame(timestamp: number): void {
        if (!this.#timestamp) this.#timestamp = timestamp;
        const elapsed = timestamp - this.#timestamp;
        this.#fps = 1000 / elapsed;
        this.update(elapsed / 1000);
        this.draw();
        this.#timestamp = timestamp;
        requestAnimationFrame(this.frame.bind(this));
    }


    private draw(): void {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        Drawing.drawGrid(this.#context);
        this.#fpsIndicator.draw(this.#context, this.#fps);
        this.#asteroids.forEach(asteroid => {
           asteroid.draw(this.#context);
        });
        this.#spaceship.draw(this.#context);

    }


    private update(timeElapsed: number): void {
        this.#spaceship.update(this.#context, timeElapsed);
    }

}
