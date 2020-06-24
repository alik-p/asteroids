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
                context.fillText(x + '', x + 2, 10);
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
                context.fillText(y + '', 2, y + 10);
            }

        }
        context.restore();
    }


}
