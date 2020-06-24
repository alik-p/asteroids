import { Drawing } from './drawing';
import { Spaceship } from './spaceship/spaceship.model';
import { NumberIndicator } from './shared/number-indicator/number-indicator.model';
import { Asteroid } from './asteroid/asteroid.model';
import { Projectile } from './spaceship/projectile.model';
import { CollisionDetection } from './shared/collision-detection';

export class AsteroidsGame {
    readonly #canvas: HTMLCanvasElement;
    readonly #context: CanvasRenderingContext2D;

    #asteroids: Asteroid[];
    #fps: number;
    #fpsIndicator: NumberIndicator;
    #projectiles: Projectile[] = [];
    #spaceship: Spaceship;
    #timestamp: number;


    constructor(canvas: HTMLCanvasElement) {
        const {height, width} = canvas;
        this.#canvas = canvas;
        this.#canvas.focus();
        this.#context = canvas.getContext('2d');
        this.initAsteroids(3);
        this.#fpsIndicator = new NumberIndicator(width - 10, height - 15, 'fps', {digits: 2});
        this.#spaceship = new Spaceship(width / 2, height / 2, 100);
        this.initControls();
        requestAnimationFrame(this.frame.bind(this));
    }


    frame(timestamp: number): void {
        if (!this.#timestamp) this.#timestamp = timestamp;
        const elapsed = timestamp - this.#timestamp;
        this.#fps = 1000 / elapsed;
        this.update(elapsed / 1000);
        this.draw();
        this.#timestamp = timestamp;
        requestAnimationFrame(this.frame.bind(this));
    }


    private draw(): void {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        Drawing.drawGrid(this.#context);
        this.#fpsIndicator.draw(this.#context, this.#fps);
        this.#asteroids.forEach(asteroid => {
            asteroid.draw(this.#context);
        });
        this.#projectiles.forEach(projectile => {
            projectile.draw(this.#context);
        });
        this.#spaceship.draw(this.#context);
    }


    private initAsteroid(): Asteroid {
        const asteroid = this.newAsteroid();
        this.pushAsteroid(asteroid);
        return asteroid;
    }


    private initAsteroids(count: number): void {
        this.#asteroids = [];
        for (let i = 0; i < count; i++) {
            this.#asteroids[i] = this.initAsteroid();
        }
    }


    private initControls(): void {
        this.#canvas.addEventListener('keydown', this.keyDown.bind(this), true);
        this.#canvas.addEventListener('keyup', this.keyUp.bind(this), true);
    }


    private keyDown(event: KeyboardEvent): void {
        this.keyHandler(event, true);
    }


    private keyHandler(event: KeyboardEvent, pressed: boolean) {
        let handled = true;
        switch (event.key) {
            case 'ArrowUp': {
                this.#spaceship.thrusterOn(pressed);
                break;
            }
            case 'ArrowLeft': {
                this.#spaceship.thrusterLeft(pressed);
                break;
            }
            case 'ArrowRight': {
                this.#spaceship.thrusterRight(pressed);
                break;
            }
            case ' ': {     /* space */
                this.#spaceship.weaponTrigger = pressed;
                break;
            }
            default: {
                handled = false;
                break;
            }
        }

        if (handled) {
            event.preventDefault();
        }
    }


    private keyUp(event: KeyboardEvent): void {
        this.keyHandler(event, false);
    }


    private newAsteroid(): Asteroid {
        return new Asteroid(
            this.#canvas.width * Math.random(),
            this.#canvas.height * Math.random(),
            7000 + Math.random() * 5000,
        );
    }


    private pushAsteroid(asteroid: Asteroid, elapsedTime = 0.015): void {
        const force = 5000000;   // max force to apply in one frame // TODO random?
        asteroid.push(2 * Math.PI * Math.random(), force, elapsedTime);
        asteroid.twist((Math.random() - 0.5) * Math.PI * force * 0.02, elapsedTime);
    }


    private update(timeElapsed: number): void {
        this.#spaceship.compromised = false;
        this.#asteroids.forEach(asteroid => {
            asteroid.update(this.#context, timeElapsed);
            if (CollisionDetection.isCollision(asteroid, this.#spaceship)) {
                this.#spaceship.compromised = true;
            }
        });
        this.#spaceship.update(this.#context, timeElapsed);
        this.#projectiles.forEach((projectile, index, self) => {
            projectile.update(this.#context, timeElapsed);
            if (projectile.life <= 0) {
                self.splice(index, 1);
            }
        });
        if (this.#spaceship.weaponTrigger && this.#spaceship.weaponLoaded) {
            this.#projectiles.push(this.#spaceship.shoot(timeElapsed));
        }
    }


}
