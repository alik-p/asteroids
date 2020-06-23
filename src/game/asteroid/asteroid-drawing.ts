export class AsteroidDrawing {

    static drawAsteroid(
        context: CanvasRenderingContext2D,
        radius: number,
        shape: number[],
        noise: number,
    ) {
        context.save();
        context.strokeStyle = 'white';  // TODO move value to 'options' param?
        context.fillStyle = 'black';    // TODO move value to 'options' param?
        context.beginPath();
        shape.forEach(item => {
            context.rotate(2 * Math.PI / shape.length);
            context.lineTo(radius + radius * noise * item, 0);
        });
        context.closePath();
        context.fill();
        context.stroke();
        context.restore();
    }

}
