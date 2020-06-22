export class SpaceshipDrawing {

    static drawSpaceship(
        context: CanvasRenderingContext2D,
        radius: number,
    ): void {
        const angle = (0.5 * Math.PI) / 2;
        const curve1 = 0.25;
        const curve2 = 0.75;
        context.save();
        context.lineWidth = 2;          // TODO move value to 'options' param?
        context.strokeStyle = 'white';  // TODO move value to 'options' param?
        context.fillStyle = 'black';    // TODO move value to 'options' param?
        context.beginPath();
        context.moveTo(radius, 0);
        // Drawing spaceship using three curves
        // stern:
        context.quadraticCurveTo(
            Math.cos(angle) * radius * curve2,
            Math.sin(angle) * radius * curve2,
            Math.cos(Math.PI - angle) * radius,
            Math.sin(Math.PI - angle) * radius
        );
        // left side:
        context.quadraticCurveTo(
            -radius * curve1,
            0,
            Math.cos(Math.PI + angle) * radius,
            Math.sin(Math.PI + angle) * radius
        );
        // right side:
        context.quadraticCurveTo(
            Math.cos(-angle) * radius * curve2,
            Math.sin(-angle) * radius * curve2,
            radius,
            0
        );
        context.fill();
        context.stroke();
        context.restore();
    }
}
