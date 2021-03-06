import './styles.css';
import { AsteroidsGame } from './game/game';

function initCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.id = 'asteroids-game';
    canvas.height = 600;
    canvas.width = 600;
    canvas.tabIndex = 1;
    return canvas;
}

function renderGameArea(): void {
    const title: HTMLHeadingElement = document.createElement('h1');
    title.innerText = 'Asteroids Game';
    const canvas = initCanvas();
    document.body.appendChild(title);
    document.body.appendChild(canvas);
    const game = new AsteroidsGame(canvas);
}

renderGameArea();
