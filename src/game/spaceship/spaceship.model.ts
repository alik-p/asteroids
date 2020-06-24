import { SpaceshipDrawing as Drawing } from './spaceship-drawing';
import { Mass } from '../shared/mass/mass.model';


export class Spaceship extends Mass {

    readonly #steeringPower: number;
    readonly #thruster: { power: number, on: boolean, right: boolean, left: boolean };

    constructor(x: number, y: number, power: number) {
        super(x, y, 10, 20, 1.5 * Math.PI);
        this.#thruster = {power, on: false, right: false, left: false};
        this.#steeringPower = power / 20;
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        Drawing.drawSpaceship(context, this.radius, this.#thruster.on);
        context.restore();
    }


    thrusterLeft(on: boolean): void {
        this.#thruster.left = on;
    }


    thrusterOn(on: boolean): void {
        this.#thruster.on = on;
    }


    thrusterRight(on: boolean): void {
        this.#thruster.right = on;
    }


    update(context: CanvasRenderingContext2D, timeElapsed: number): void {
        this.push(this.angle, +this.#thruster.on * this.#thruster.power, timeElapsed);
        this.twist((+this.#thruster.right - +this.#thruster.left) * this.#steeringPower, timeElapsed);
        super.update(context, timeElapsed);
    }


}
