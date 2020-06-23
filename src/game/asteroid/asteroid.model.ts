import { AsteroidDrawing as Drawing } from './asteroid-drawing';

export class Asteroid {

    readonly #radius: number;
    readonly #noise: number;
    readonly #shape: number[] = [];
    #x: number;
    #y: number;
    #angle: number;

    constructor(x: number, y: number, radius: number) {
        this.#x = x;
        this.#y = y;
        this.#angle = 0;
        this.#radius = radius;
        this.#noise = 0.2;
        const segments = Math.random() * 40;
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

}
