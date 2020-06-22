export class Drawing {

    static drawGrid(context: CanvasRenderingContext2D): void {
        // Configs:
        const minor = 10;
        const major = minor * 5;
        const stroke = '#00FF00';
        const fill = '#009900';
        // Drawing:
        context.save();
        context.fillStyle = fill;
        context.strokeStyle = stroke;
        const {height, width} = context.canvas;
        // x-axis:
        for (let x = 0; x < width; x += minor) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.lineWidth = (x % major === 0) ? 0.5 : 0.25;
            context.stroke();
            if (x % major === 0) {
                context.fillText(x + '', x, 10);
            }
        }
        // y-axis:
        for (let y = 0; y < height; y += minor) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.lineWidth = (y % major === 0) ? 0.5 : 0.25;
            context.stroke();
            if (y % major === 0) {
                context.fillText(y + '', 0, y + 10);
            }

        }
        context.restore();
    }


    static drawSpaceship(context: CanvasRenderingContext2D, radius: number): void {
        const angle = (0.5 * Math.PI) / 2;
        const curve1 = 0.25;
        const curve2 = 0.75;
        context.save();
        context.translate(context.canvas.width / 2, context.canvas.height / 2);
        context.rotate(-Math.PI / 2);
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
