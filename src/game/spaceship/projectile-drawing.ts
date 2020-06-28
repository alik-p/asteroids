export class ProjectileDrawing {

    static drawProjectile(
        context: CanvasRenderingContext2D,
        radius: number,
        lifetime: number,
    ): void {
        context.save();
        context.beginPath();
        context.fillStyle = `rgb(100%, 100%, ${100 * lifetime}%)`;
        context.arc(0, 0, radius, 0, 2 * Math.PI);
        context.fill();
        context.restore();
    }

}
