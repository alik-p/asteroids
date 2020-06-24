export interface MassSpeed {
    x: number;
    y: number;
    rotation: number;
}


export class Mass {

    constructor(
        protected x: number,
        protected y: number,
        protected mass: number,     // TODO private?
        protected readonly radius: number,
        protected angle: number = 0,
        protected speed?: MassSpeed,
    ) {
        const {x: speedX = 0, y: speedY = 0, rotation = 0} = this.speed || {};
        this.speed = {x: speedX, y: speedY, rotation};
    }


    draw(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.strokeStyle = 'white';
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.lineTo(0, 0);
        context.stroke();
        context.restore();
    }


    getMovementAngle(): number {
        return Math.atan2(this.speed.y, this.speed.x);
    }


    getSpeed(): number {
        return Math.sqrt(this.speed.x ** 2 + this.speed.y ** 2);
    }


    push(angle: number, force: number, timeElapsed: number): void {
        // Newton's 2nd Law of Motion
        this.speed.x += timeElapsed * (Math.cos(angle) * force) / this.mass;
        this.speed.y += timeElapsed * (Math.sin(angle) * force) / this.mass;
    }


    twist(force: number, timeElapsed: number): void {
        // Newton's 2nd Law of Motion
        this.speed.rotation += timeElapsed * force / this.mass;
    }


    update(context: CanvasRenderingContext2D, timeElapsed: number): void {
        const {height, width} = context.canvas;
        // Position:
        this.x += this.speed.x * timeElapsed;
        this.y += this.speed.y * timeElapsed;
        // Rotation:
        this.angle = (this.angle + this.speed.rotation * timeElapsed) % (2 * Math.PI);
        // Right border:
        if (this.x - this.radius > width) {
            this.x = -this.radius;
        }
        // Left border:
        if (this.x + this.radius < 0) {
            this.x = width + this.radius;
        }
        // Top border:
        if (this.y + this.radius < 0) {
            this.y = height + this.radius;
        }
        // Bottom border:
        if (this.y - this.radius > height) {
            this.y = -this.radius;
        }
    }

}
