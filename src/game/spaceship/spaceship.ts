import { SpaceshipDrawing as Drawing } from './spaceship-drawing';
import { Mass } from '../mass/mass';
import { Projectile } from './projectile';
import { Weapon } from './weapon';


export class Spaceship extends Mass {

    compromised = false;
    reverse = false;
    weaponTrigger = false;
    readonly health: { max: number, left: number };

    readonly #steeringPower: number;
    readonly #thruster: { power: number, on: boolean, right: boolean, left: boolean };
    readonly #weapon: Weapon;

    constructor(x: number, y: number, power: number) {
        super(x, y, 10, 20, 1.5 * Math.PI);
        const maxHealth = 2.0;
        this.health = {max: maxHealth, left: maxHealth};
        this.#steeringPower = power / 15;
        this.#thruster = {power, on: false, right: false, left: false};
        this.#weapon = new Weapon(power * 2, 0.25);
    }


    get weaponLoaded(): boolean {
        return this.#weapon.isLoaded();
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        Drawing.drawSpaceship(
            context,
            this.radius,
            this.#thruster.on,
            this.compromised
        );
        context.restore();
    }


    shoot(timeElapsed: number): Projectile {
        const projectile = new Projectile(
            this.x + Math.cos(this.angle) * this.radius,
            this.y + Math.sin(this.angle) * this.radius,
            0.025,
            1,
            {...this.speed},
        );
        projectile.push(this.angle, this.#weapon.power, timeElapsed);
        this.push(this.angle + Math.PI, this.#weapon.power, timeElapsed);
        this.#weapon.reload();
        return projectile;
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
        const direction = +this.#thruster.on- +this.reverse;
        this.push(this.angle, direction * this.#thruster.power, timeElapsed);
        this.twist((+this.#thruster.right - +this.#thruster.left) * this.#steeringPower, timeElapsed);
        this.#weapon.update(timeElapsed);
        this.health.left -= this.compromised ? Math.min(timeElapsed, this.health.left) : 0;
        super.update(context, timeElapsed);
    }


}
