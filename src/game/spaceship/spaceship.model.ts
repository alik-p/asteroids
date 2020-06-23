import { SpaceshipDrawing as Drawing } from './spaceship-drawing';


export class Spaceship {

    readonly angle: number;
    readonly radius: number;

    #x: number;
    #y: number;
    #speed = {x: 0, y: -30};

    constructor(x: number, y: number, radius: number) {
        this.#x = x;
        this.#y = y;
        this.angle = -Math.PI / 2;
        this.radius = radius;
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.#x, this.#y);
        context.rotate(this.angle);
        Drawing.drawSpaceship(context, this.radius);
        context.restore();
    }


    update(context: CanvasRenderingContext2D, timeElapsed: number) {
        const deltaX = this.#speed.x * timeElapsed;
        const deltaY = this.#speed.y * timeElapsed;
        // Position:
        this.#x += deltaX;
        this.#y += deltaY;
    }

}
