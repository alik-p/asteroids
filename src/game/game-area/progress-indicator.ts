export class ProgressIndicator {
    readonly #x: number;
    readonly #y: number;
    readonly #label: string;
    readonly #width: number;
    readonly #height: number;

    constructor(x: number, y: number, label: string, width: number, height: number) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
        this.#label = label ? `${label}: ` : '';
    }

    draw(context: CanvasRenderingContext2D, max: number, progress: number,): void {
        context.save();
        context.fillStyle = 'white';
        context.strokeStyle = 'white';
        context.font = `${this.#height}pt sans-serif`;
        const offset = context.measureText(this.#label).width;
        context.fillText(this.#label, this.#x, this.#y + this.#height - 1);
        context.beginPath();
        context.rect(offset + this.#x, this.#y, this.#width, this.#height);
        context.stroke();
        context.beginPath();
        context.rect(offset + this.#x, this.#y, this.#width * (progress / max), this.#height);
        context.fill();
        context.restore();
    }


}
