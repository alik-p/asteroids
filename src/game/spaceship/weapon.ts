export class Weapon {

    #loaded = true;
    #timeUntilReloaded: number;

    constructor(
        private _power: number,
        private reloadTime: number,
    ) {
        this.#timeUntilReloaded = reloadTime;
    }

    get power(): number {
        return this._power;
    }

    isLoaded(): boolean {
        return this.#loaded;
    }

    reload(): void {
        this.#timeUntilReloaded = this.reloadTime;
    }

    update(timeElapsed: number): void {
        this.#loaded = this.#timeUntilReloaded === 0;
        if (!this.isLoaded()) {
            this.#timeUntilReloaded -= Math.min(timeElapsed, this.#timeUntilReloaded);
        }
    }

}
