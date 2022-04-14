'use strict';

const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');
const ground = document.querySelector('.ground');
const score = document.querySelector('.score');
const startScreen = document.querySelector('.start-screen');
let point;
let scoringPoints;
let isAlive;

// однократно обрабатываем нажатие клавиш для старта игры
document.addEventListener('click', startGame, { once: true });

/**
 * Старт игры
 *
 * @return {undefined}
 */
function startGame(event) {
  // обрабатываем только клики внутри игрового поля
  if (event.target.closest('.game')) {
    // обнуляем очки
    point = 0;
    // скрываем началную надпись
    startScreen.hidden = true;
    // запускаем анимацию кактуса
    cactus.classList.add('motion');
    // запускаем анимацию земли
    ground.classList.add('slide');
    // меняем изображение на бегущего динозвра
    dino.src = 'images/dino-run.gif';
    // начинаем обрабатывать прыжок динозавра
    document.addEventListener('click', jump);
    // цикл для подсчета очков
    scoringPoints = setInterval(() => {
      score.innerHTML = point++;
    }, 200);

    // запускам цикл для обработки столкновений
    isAlive = setInterval(() => {
      // получаем координаты динозавра
      let dinoTop = parseInt(
        window.getComputedStyle(dino).getPropertyValue('top')
      );
      //  получаем координаты кактуса
      let cactusLeft = parseInt(
        window.getComputedStyle(cactus).getPropertyValue('left')
      );

      // условие столкновения кактуса и динозвра
      let isCollision = cactusLeft > 0 && cactusLeft < 50 && dinoTop >= 140;

      // проверка на столкновение
      if (isCollision) {
        gameOver();
      }
    }, 10);
  }
}

/**
 * Окончание игры
 *
 * @return {undefined}
 */
function gameOver() {
  // останавливам подсчет очков
  clearInterval(scoringPoints);
  // останавливаем обработчик столкновений
  clearInterval(isAlive);
  // отладочная информация
  console.log('Игра окончена!');
  // останавливаем кактус
  cactus.classList.remove('motion');
  // останавливаем землю
  ground.classList.remove('slide');
  // меняем изображение на стоящего динозвра
  dino.src = 'images/dino-stationary.png';
  // показываем надпись для повторной игры
  startScreen.hidden = false;
  // ожидаем нажатие клавиши для старта новой игры
  document.addEventListener('click', startGame, { once: true });
}

// прыжок динозавра
function jump(event) {
  // обрабатываем только клики внутри игрового поля
  if (event.target.closest('.game')) {
    // проверяем наличие класса jump
    if (!dino.classList.contains('jump')) {
      // прыгаем через добавление класса
      dino.classList.add('jump');

      // удаляем класс через 300 мс
      setTimeout(() => {
        dino.classList.remove('jump');
      }, 300);
    }
  }
}
