import './index.css';
import {
  resizeCanvas,
  createOrthoCamera,
  createGameLoop,
  loadTexture,
} from 'gdxjs';
import SpriteBatch from './SpriteBatch';

const init = async () => {
  const canvas = document.getElementById('main');
  const pixelRatio = window.devicePixelRatio || 1;
  const [width, height] = resizeCanvas(canvas, pixelRatio);
  const gl = canvas.getContext('webgl');

  const camera = createOrthoCamera(width, height, width, height);
  const batch = new SpriteBatch(gl);
  const texture = await loadTexture(gl, './thach.jpg');
  const mask = await loadTexture(gl, './mask.png');
  batch.setMask(mask);

  gl.clearColor(0, 0, 0, 1);
  const update = delta => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    batch.setProjection(camera.combined);
    batch.begin();
    batch.draw(
      texture,
      0,
      0,
      300,
      400,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      0,
      0.5,
      0.5
    );
    batch.end();
  };
  createGameLoop(update);
};

init();
