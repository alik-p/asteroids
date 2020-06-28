import { AsteroidDrawing as Drawing } from './asteroid-drawing';
import { Mass } from '../mass/mass';


export class Asteroid extends Mass {

    readonly #noise: number;
    readonly #shape: number[] = [];

    constructor(x: number, y: number, mass: number) {
        super(
            x, y, mass,
            Math.sqrt((mass / 1) / Math.PI),  /* 1 - density, kg per square pixel*/
            0
        );
        this.#noise = Math.random() - 0.4;
        this.#shape = this.initShape(this.radius);
    }


    child(mass: number): Asteroid {
        const child = new Asteroid(this.x, this.y, mass);
        child.speed = {...this.speed};
        return child;
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        Drawing.drawAsteroid(context, this.radius, this.#shape, this.#noise);
        context.restore();
    }


    private initShape(radius: number): number[] {
        const circumference = 2 * Math.PI * radius;
        let segments = Math.ceil(circumference / 15);
        segments = Math.min(25, Math.max(5, segments));
        return Array.from({length: segments}, () => Math.random() - 0.5);

    }


}
