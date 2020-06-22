import { SpaceshipDrawing as Drawing } from './spaceship-drawing';

export class Spaceship {
    readonly x: number;
    readonly y: number;
    readonly angle: number;
    readonly radius: number;


    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.angle = -Math.PI / 2;
        this.radius = radius;
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        Drawing.drawSpaceship(context, this.radius);
        context.restore();
    }

}
