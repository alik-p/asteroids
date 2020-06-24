export class SpaceshipDrawing {

    static drawSpaceship(
        context: CanvasRenderingContext2D,
        radius: number,
        thruster: boolean,
        compromised = false,
    ): void {
        const angle = (0.5 * Math.PI) / 2;
        const curve1 = 0.25;
        const curve2 = 0.75;

        if (thruster) {
            this.drawThrusterBurn(context, radius);
        }

        context.save();
        context.lineWidth = 2;          // TODO move value to 'options' param?
        context.strokeStyle = 'white';  // TODO move value to 'options' param?
        context.fillStyle = compromised ? 'red' : 'black';    // TODO move value to 'options' param?
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



    private static drawThrusterBurn(context: CanvasRenderingContext2D, radius: number): void {
        context.save();
        context.strokeStyle = 'yellow';
        context.fillStyle = 'red';
        context.lineWidth = 3;
        const angle = Math.PI / 5;
        context.beginPath();
        context.moveTo(
            Math.cos(Math.PI + angle) * radius / 2,
            Math.sin(Math.PI + angle) * radius / 2
        );
        context.quadraticCurveTo(
            -radius * 2,
            0,
            Math.cos(Math.PI - angle) * radius / 2,
            Math.sin(Math.PI - angle) * radius / 2
        );
        context.fill();
        context.stroke();
        context.restore();
    }


}
