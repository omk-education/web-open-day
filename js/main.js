'use strict';

const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');
const score = document.querySelector('.score');
const startScreen = document.querySelector('.start-screen');
let point;
let scoringPoints;
let isAlive;

// однократно обрабатываем нажатие клавиш для старта игры
document.addEventListener('keydown', startGame, { once: true });

// старт игры
function startGame() {
  // обнуляем очки
  point = 0;
  // скрываем началную надпись
  startScreen.hidden = true;
  // запускаем анимацию
  cactus.classList.add('motion');
  // начинаем обрабатывать прыжок динозавра
  document.addEventListener('keydown', jump);
  // цикл для подсчета очков
  scoringPoints = setInterval(() => {
    score.innerHTML = point++;
  }, 500);

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

// окончание игры
function gameOver() {
  // останавливам подсчет очков
  clearInterval(scoringPoints);
  // останавливаем обработчик столкновений
  clearInterval(isAlive);
  // alert('Игра окончена!');
  console.log('Игра окончена!');
  // останавливаем кактус
  cactus.classList.remove('motion');
  // показываем надпись для повторной игры
  startScreen.hidden = false;
  // ожидаем нажатие клавиши для старта новой игры
  document.addEventListener('keydown', startGame, { once: true });
}

// прыжок динозавра
function jump() {
  if (!dino.classList.contains('jump')) {
    // прыгаем через добавление класса
    dino.classList.add('jump');

    // удаляем класс через 300 мс
    setTimeout(() => {
      dino.classList.remove('jump');
    }, 300);
  }
}
