import './styles.css';
import { AsteroidsGame } from './game/game';

function initCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.height = 600;
    canvas.width = 600;
    return canvas;
}

function renderGameArea(): void {
    const title: HTMLHeadingElement = document.createElement('h1');
    title.innerText = 'Asteroids Game';
    const canvas = initCanvas();
    const game = new AsteroidsGame(canvas);
    document.body.appendChild(title);
    document.body.appendChild(canvas);
}

renderGameArea();
