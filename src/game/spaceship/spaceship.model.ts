import { SpaceshipDrawing as Drawing } from './spaceship-drawing';


export class Spaceship {

    readonly angle: number;

    readonly #radius: number;
    #x: number;
    #y: number;
    #speed = {x: 0, y: -50};

    constructor(x: number, y: number, radius: number) {
        this.#x = x;
        this.#y = y;
        this.angle = Math.PI * 1.5;
        this.#radius = radius;
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.#x, this.#y);
        context.rotate(this.angle);
        Drawing.drawSpaceship(context, this.#radius);
        context.restore();
    }


    update(context: CanvasRenderingContext2D, timeElapsed: number) {
        const deltaX = this.#speed.x * timeElapsed;
        const deltaY = this.#speed.y * timeElapsed;
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
    }

}
