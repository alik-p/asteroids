import { SpaceshipDrawing as Drawing } from './spaceship-drawing';
import { Mass } from '../shared/mass/mass.model';


export class Spaceship extends Mass {

    constructor(x: number, y: number, radius: number) {
        super(x, y, 1, radius, 1.5 * Math.PI, {x: 0, y: -50, rotation: 0});
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        Drawing.drawSpaceship(context, this.radius);
        context.restore();
    }

}
