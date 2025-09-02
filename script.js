const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GRID_SIZE = 20;
const CELL_SIZE = canvas.width / GRID_SIZE;

let snake1 = [{x:10, y:10}], snake2 = [{x:5, y:5}];
let dir1 = {x:1, y:0};
let food = {x:15, y:15};
let score1=0, score2=0;
let multiplayer=false, gameOver=false, speedBoost=false;
let interval, boostTimeout;
let playerName="";

const DIRECTIONS = {
  ArrowUp:{x:0,y:-1}, ArrowDown:{x:0,y:1},
  ArrowLeft:{x:-1,y:0}, ArrowRight:{x:1,y:0}
};

function startGame(ai){
  playerName = document.getElementById('playerName').value || 'Player';
  multiplayer = ai;
  snake1 = [{x:10, y:10}];
  snake2 = [{x:5, y:5}];
  dir1 = {x:1, y:0};
  food = {x:15, y:15};
  score1=0; score2=0;
  gameOver=false;
  document.getElementById('popup').style.display='none';
  updateScore();
  clearInterval(interval);
  interval = setInterval(gameLoop, speedBoost?75:150);
}

function generateFood(snakeA, snakeB){
  let newFood;
  do{
    newFood = {x: Math.floor(Math.random()*GRID_SIZE), y: Math.floor(Math.random()*GRID_SIZE)};
  }while(snakeA.some(s=>s.x===newFood.x && s.y===newFood.y) || (snakeB && snakeB.some(s=>s.x===newFood.x && s.y===newFood.y)));
  return newFood;
}

function changeDir(key){
  const newDir = DIRECTIONS[key];
  if(newDir && (newDir.x !== -dir1.x || newDir.y !== -dir1.y)) dir1=newDir;
}

document.addEventListener('keydown', e => changeDir(e.key));

function toggleBoost(){
  if(!speedBoost){
    speedBoost=true;
    document.getElementById('boostBtn').innerText='Speed Boost Active';
    clearInterval(interval);
    interval = setInterval(gameLoop, 75);
    boostTimeout = setTimeout(()=>{
      speedBoost=false;
      document.getElementById('boostBtn').innerText='Enable Speed Boost';
      clearInterval(interval);
      interval=setInterval(gameLoop,150);
    },10000);
  }
}

// Swipe Controls
let touchStartX=0, touchStartY=0;
canvas.addEventListener('touchstart', e=>{
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});
canvas.addEventListener('touchend', e=>{
  let dx = e.changedTouches[0].clientX - touchStartX;
  let dy = e.changedTouches[0].clientY - touchStartY;
  if(Math.abs(dx) > Math.abs(dy)){
    if(dx>0) changeDir('ArrowRight');
    else changeDir('ArrowLeft');
  } else {
    if(dy>0) changeDir('ArrowDown');
    else changeDir('ArrowUp');
  }
});

function gameLoop(){
  if(gameOver) return;

  let newHead = {x:(snake1[0].x+dir1.x+GRID_SIZE)%GRID_SIZE, y:(snake1[0].y+dir1.y+GRID_SIZE)%GRID_SIZE};
  if(snake1.some(s=>s.x===newHead.x && s.y===newHead.y)) return endGame();
  snake1.unshift(newHead);
  if(newHead.x===food.x && newHead.y===food.y){
    score1++; updateScore();
    food = generateFood(snake1, multiplayer?snake2:[]);
  } else snake1.pop();

  if(multiplayer){
    let head=snake2[0];
    let diffX=food.x-head.x, diffY=food.y-head.y;
    let move={x:0,y:0};
    if(Math.abs(diffX)>Math.abs(diffY)) move.x=diffX>0?1:-1;
    else move.y=diffY>0?1:-1;
    let newHead2={x:(head.x+move.x+GRID_SIZE)%GRID_SIZE, y:(head.y+move.y+GRID_SIZE)%GRID_SIZE};
    if(snake2.some(s=>s.x===newHead2.x && s.y===newHead2.y) || snake1.some(s=>s.x===newHead2.x && s.y===newHead2.y)) return endGame();
    snake2.unshift(newHead2);
    if(newHead2.x===food.x && newHead2.y===food.y){
      score2++; updateScore();
      food = generateFood(snake1,snake2);
    } else snake2.pop();
  }

  draw();
}

function draw(){
  ctx.fillStyle="#1f2937";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="#f87171"; ctx.fillRect(food.x*CELL_SIZE, food.y*CELL_SIZE, CELL_SIZE, CELL_SIZE);

  ctx.fillStyle="#34d399"; snake1.forEach((s,i)=>{ctx.fillRect(s.x*CELL_SIZE, s.y*CELL_SIZE, CELL_SIZE, CELL_SIZE); if(i===0) ctx.fillStyle="#10b981";});

  if(multiplayer){
    ctx.fillStyle="#60a5fa"; snake2.forEach((s,i)=>{ctx.fillRect(s.x*CELL_SIZE, s.y*CELL_SIZE, CELL_SIZE, CELL_SIZE); if(i===0) ctx.fillStyle="#3b82f6";});
  }
}

function updateScore(){
  document.getElementById('scoreDisplay').innerText=playerName+"'s Score: "+score1 + (multiplayer?" | AI Score: "+score2:"");
}

function endGame(){
  gameOver=true;
  document.getElementById('popup').style.display='flex';
}

function restartGame(){
  startGame(multiplayer);
}
