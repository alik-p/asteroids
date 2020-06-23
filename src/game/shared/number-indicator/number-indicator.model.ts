export interface Options {
    align?: CanvasTextAlign;
    digits?: number;
    pt?: number;
}

export class NumberIndicator {

    readonly #x: number;
    readonly #y: number;
    readonly #label: string;
    readonly #options: Options;

    constructor(x: number, y: number, label: string, options?: Options) {
        const {align = 'end', digits = 0, pt = 10} = options || {};
        this.#options = {align, digits, pt};
        this.#x = x;
        this.#y = y;
        this.#label = label ? `${label}: ` : '';
    }

    draw(context: CanvasRenderingContext2D, value: number): void {
        context.save();
        context.fillStyle = 'white'; // TODO move value to 'options' param?
        context.font = `${this.#options.pt}pt sans-serif`;
        context.textAlign = this.#options.align;
        context.fillText(
            this.#label + value.toFixed(this.#options.digits),
            this.#x - 2,
            this.#y + this.#options.pt - 1
        );
        context.restore();
    }

}
