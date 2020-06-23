import { AsteroidDrawing as Drawing } from './asteroid-drawing';

export class Asteroid {

    readonly #radius: number;
    readonly #noise: number;
    readonly #shape: number[] = [];
    #x: number;
    #y: number;
    #angle: number;
    #speed: { x: number, y: number, rotation: number };

    constructor(x: number, y: number, radius: number) {
        this.#x = x;
        this.#y = y;
        this.#angle = 0;
        this.#radius = radius;
        this.#noise = Math.random() - 0.4;
        this.#speed = {
            x: Math.random() * 100,
            y: Math.random() * 50,
            rotation: 2 * Math.PI * (Math.random() - 0.5),
        };
        const segments = 5 + Math.random() * 30;
        for (let i = 0; i < segments; i++) {
            this.#shape.push(Math.random() - 0.5);
        }
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.#x, this.#y);
        context.rotate(this.#angle);
        Drawing.drawAsteroid(context, this.#radius, this.#shape, this.#noise);
        context.restore();
    }


    update(context: CanvasRenderingContext2D, timeElapsed: number) {
        const {height, width} = context.canvas;
        // Position:
        this.#x += this.#speed.x * timeElapsed; // deltaX;
        this.#y += this.#speed.y * timeElapsed; // deltaY;
        // Right border:
        if (this.#x - this.#radius > width) {
            this.#x = -this.#radius;
        }
        // Left border:
        if (this.#x + this.#radius < 0) {
            this.#x = width + this.#radius;
        }
        // Top border:
        if (this.#y + this.#radius < 0) {
            this.#y = height + this.#radius;
        }
        // Bottom border:
        if (this.#y - this.#radius > height) {
            this.#y = -this.#radius;
        }
        // Rotation:
        this.#angle = (this.#angle + this.#speed.rotation * timeElapsed) % (2 * Math.PI);
    }

}
