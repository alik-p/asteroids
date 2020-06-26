import { Drawing } from './drawing';
import { Spaceship } from './spaceship/spaceship.model';
import { NumberIndicator } from './shared/indicators/number-indicator';
import { Asteroid } from './asteroid/asteroid.model';
import { Projectile } from './spaceship/projectile.model';
import { CollisionDetection } from './shared/collision-detection';
import { ProgressIndicator } from './shared/indicators/progress-indicator';
import { MessageBox } from './shared/message-box';

export class AsteroidsGame {
    readonly #canvas: HTMLCanvasElement;
    readonly #context: CanvasRenderingContext2D;
    readonly #massDestroyed = 500;  // mass destroyed on each hit

    #asteroids: Asteroid[];
    #fps: number;
    #fpsIndicator: NumberIndicator;
    #gameOver: boolean;
    #healthIndicator: ProgressIndicator;
    #level: number;
    #levelIndicator: NumberIndicator;
    #messageBox: MessageBox;
    #projectiles: Projectile[];
    #score: number;
    #scoreIndicator: NumberIndicator;
    #spaceship: Spaceship;
    #timestamp: number;


    constructor(canvas: HTMLCanvasElement) {
        const {height, width} = canvas;
        this.#canvas = canvas;
        this.#canvas.focus();
        this.#context = canvas.getContext('2d');
        this.#messageBox = new MessageBox(width / 2, height * 0.4);
        this.#levelIndicator = new NumberIndicator(width / 2, 5, 'level', {align: 'center'});
        this.#fpsIndicator = new NumberIndicator(width - 10, height - 15, 'fps', {digits: 2});
        this.#healthIndicator = new ProgressIndicator(10, 15, 'health', 100, 10);
        this.#scoreIndicator = new NumberIndicator(width - 10, 15, 'score');
        this.initControls();
        requestAnimationFrame(this.frame.bind(this));
        this.restart();
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
        this.#asteroids.forEach(asteroid => {
            asteroid.draw(this.#context);
        });
        if (this.#gameOver) {
            this.#messageBox.draw(this.#context, 'GAME OVER', 'Press Space to play again');
            return;
        }
        this.#projectiles.forEach(projectile => {
            projectile.draw(this.#context);
        });
        this.#spaceship.draw(this.#context);
        this.#levelIndicator.draw(this.#context, this.#level);
        this.#fpsIndicator.draw(this.#context, this.#fps);
        this.#healthIndicator.draw(this.#context, this.#spaceship.health.max, this.#spaceship.health.left);
        this.#scoreIndicator.draw(this.#context, this.#score);
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
                this.#gameOver
                    ? this.restart()
                    : this.#spaceship.weaponTrigger = pressed;
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


    private levelUp(): void {
        this.#level += 1;
        this.initAsteroids(this.#level);
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


    private restart(): void {
        this.#gameOver = false;
        this.#level = 0;
        this.#score = 0;
        this.#spaceship = new Spaceship(
            this.#canvas.width / 2,
            this.#canvas.height / 2,
            100
        );
        this.#projectiles = [];
        this.levelUp();
    }


    private splitAsteroid(asteroid: Asteroid, elapsedTime: number): void {
        asteroid.mass -= this.#massDestroyed;
        this.#score += this.#massDestroyed;
        const split = 0.25 + 0.5 * Math.random();
        const child1 = asteroid.child(asteroid.mass * split);
        const child2 = asteroid.child(asteroid.mass * (1 - split));
        [child1, child2].forEach(child => {
            if (child.mass < this.#massDestroyed) {
                this.#score += child.mass;
            } else {
                this.pushAsteroid(child, elapsedTime);
                this.#asteroids.push(child);
            }
        });
    }


    private update(timeElapsed: number): void {
        if (this.#asteroids.length === 0) {
            this.levelUp();
        }
        this.#spaceship.compromised = false;
        this.#asteroids.forEach(asteroid => {
            asteroid.update(this.#context, timeElapsed);
            if (CollisionDetection.isCollision(asteroid, this.#spaceship)) {
                this.#spaceship.compromised = true;
            }
        });
        if (this.#spaceship.health.left <= 0) {
            this.#gameOver = true;
            return;
        }
        this.#spaceship.update(this.#context, timeElapsed);
        this.#projectiles.forEach((projectile, indexP, projectiles) => {
            projectile.update(this.#context, timeElapsed);
            if (projectile.life <= 0) {
                projectiles.splice(indexP, 1);
            } else {
                this.#asteroids.forEach((asteroid, indexA, asteroids) => {
                    if (CollisionDetection.isCollision(asteroid, projectile)) {
                        projectiles.splice(indexP, 1);
                        asteroids.splice(indexA, 1);
                        this.splitAsteroid(asteroid, timeElapsed);
                    }
                });
            }
        });
        if (this.#spaceship.weaponTrigger && this.#spaceship.weaponLoaded) {
            this.#projectiles.push(this.#spaceship.shoot(timeElapsed));
        }
    }

}
