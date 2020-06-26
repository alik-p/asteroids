interface Options {
    align: CanvasTextAlign;
    color: string;
    mainHeight: number;
    subHeight: number;
}

export class MessageBox {
    readonly #x: number;
    readonly #y: number;
    readonly #options: Options;

    constructor(x: number, y: number, options?: Partial<Options>) {
        this.#x = x;
        this.#y = y;
        const {align = 'center', color = 'white', mainHeight = 28, subHeight = 18} = options || {};
        this.#options = {align, color, mainHeight, subHeight};
    }

    draw(context: CanvasRenderingContext2D, main: string, sub: string): void {
        context.save();
        context.fillStyle = this.#options.color;
        context.textAlign = this.#options.align;
        context.font = `${this.#options.mainHeight}pt sans-serif`;
        context.fillText(main, this.#x, this.#y);
        context.font = `${this.#options.subHeight}pt sans-serif`;
        context.fillText(sub, this.#x, this.#y + this.#options.mainHeight);
        context.restore();
    }

}
