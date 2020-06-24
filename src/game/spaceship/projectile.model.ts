import { ProjectileDrawing as Drawing } from './projectile-drawing';
import { Mass, MassSpeed } from '../shared/mass/mass.model';

export class Projectile extends Mass {

    #life: number;

    constructor(
        x: number,
        y: number,
        protected mass: number,
        private lifetime: number,
        protected speed: MassSpeed,
    ) {
        super(x, y, mass, Math.sqrt((mass / 0.001) / Math.PI), 0, speed); // 0.001 - density
        this.#life = 1.0;
    }


    get life(): number {
        return this.#life;
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        Drawing.drawProjectile(context, this.radius, this.#life);
        context.restore();
    }


    update(context: CanvasRenderingContext2D, timeElapsed: number): void {
        this.#life -= (timeElapsed / this.lifetime);
        super.update(context, timeElapsed);
    }

}
