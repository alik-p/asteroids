export interface Options {
    align?: CanvasTextAlign;
    color?: string;
    digits?: number;
    height?: number;
}

export class NumberIndicator {

    readonly #x: number;
    readonly #y: number;
    readonly #label: string;
    readonly #options: Options;

    constructor(x: number, y: number, label: string, options?: Options) {
        const {align = 'end', color = 'white', digits = 0, height = 10} = options || {};
        this.#options = {align, color, digits, height};
        this.#x = x;
        this.#y = y;
        this.#label = label ? `${label}: ` : '';
    }

    draw(context: CanvasRenderingContext2D, value: number): void {
        context.save();
        context.fillStyle = this.#options.color;
        context.font = `${this.#options.height}pt sans-serif`;
        context.textAlign = this.#options.align;
        context.fillText(
            this.#label + value.toFixed(this.#options.digits),
            this.#x - 2,
            this.#y + this.#options.height - 1
        );
        context.restore();
    }

}
