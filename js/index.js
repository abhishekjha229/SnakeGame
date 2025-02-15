// Game constant and variables
let inputDir = {
  x: 0,
  y: 0
};

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

let speed = 6;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [{
  x: 13,
  y: 15
}];
let food = {
  x: 6,
  y: 7
};

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  } else {
    //console.log(ctime);
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // if you bump into yourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // If you bump into the head
  if (snake[0].x >= 19 || snake[0].x <= 0 || snake[0].y >= 19 || snake[0].y <= 0)
    return true;
  else
    return false;

}

function gameEngine() {
  // Part 1: Updating the snake array and the food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = {
      x: 0,
      y: 0
    };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{
      x: 13,
      y: 15
    }];
    //musicSound.play();
    score = 0;
    scoreBox.innerText='Score:'+score;
  }

  //if you have eaten the food, increment the score and regenrate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score+=1;
    if(score>hiscoreval){
      hiscoreval = score;
      localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = 'High Score:'+hiscoreval;
    }
    scoreBox.innerText='Score:'+score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y
    })
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()+0),
      y: Math.round(a + (b - a) * Math.random()+0)
    }
  }


  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = {
      ...snakeArr[i]
    };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  snakeArr[0].x += 0;
  snakeArr[0].y += 0
  
  // Part 2: Display the snake and food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    SnakeElement = document.createElement('div');
    SnakeElement.style.gridRowStart = e.y;
    SnakeElement.style.gridColumnStart = e.x;
    if (index === 0)
      SnakeElement.classList.add('head');
    else
      SnakeElement.classList.add('snake');
    board.appendChild(SnakeElement);
  });

  // Display the food
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);


}


// Main logic starts here

let hiscore= localStorage.getItem('hiscore');
if(hiscore===null){
  hiscoreval = 0;
  localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
}
else{
  hiscoreval=JSON.parse(hiscore);
  hiscoreBox.innerHTML = 'High Score:'+hiscoreval;
}

window.requestAnimationFrame(main);
// if the user presses any key on the keyboard 
// the this action will be fired
window.addEventListener('keydown', e => {
  inputDir = {
    x: 0,
    y: 1
  } //start the game
  moveSound.play();
  musicSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }

 
});

