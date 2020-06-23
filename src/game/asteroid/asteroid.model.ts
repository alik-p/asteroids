import { AsteroidDrawing as Drawing } from './asteroid-drawing';
import { Mass } from '../shared/mass/mass.model';


export class Asteroid extends Mass {

    readonly #noise: number;
    readonly #shape: number[] = [];

    constructor(protected x: number, protected y: number, protected radius: number) {
        super(
            x, y, radius, 0,
            {
                x: Math.random() * 100,
                y: Math.random() * 50,
                rotation: 2 * Math.PI * (Math.random() - 0.5),
            }
        );
        this.#noise = Math.random() - 0.4;
        const segments = 5 + Math.random() * 30;
        for (let i = 0; i < segments; i++) {
            this.#shape.push(Math.random() - 0.5);
        }
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        Drawing.drawAsteroid(context, this.radius, this.#shape, this.#noise);
        context.restore();
    }


}
