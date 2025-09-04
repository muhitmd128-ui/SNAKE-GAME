const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 20;
let snake1, snake2, food, dx1, dy1, dx2, dy2, score, gameInterval, multiplayer;
let speed = 200, boosted = false;

// Start Game
function startGame(isMultiplayer){
  multiplayer = isMultiplayer;
  snake1 = [{x:5,y:5}];
  snake2 = [{x:15,y:15}];
  food = randomFood();
  dx1 = 1; dy1 = 0;
  dx2 = 0; dy2 = -1;
  score = 0;
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, speed);
}

// Random food
function randomFood(){
  return {
    x: Math.floor(Math.random()*canvas.width/CELL_SIZE),
    y: Math.floor(Math.random()*canvas.height/CELL_SIZE)
  };
}

// Game loop
function gameLoop(){
  update();
  draw();
}

// Update snakes
function update(){
  // Snake1
  let head1 = {x: snake1[0].x+dx1, y: snake1[0].y+dy1};
  if(head1.x<0||head1.y<0||head1.x>=canvas.width/CELL_SIZE||head1.y>=canvas.height/CELL_SIZE){
    gameOver();
    return;
  }
  snake1.unshift(head1);
  if(head1.x===food.x && head1.y===food.y){
    score++;
    document.getElementById('scoreDisplay').innerText = localStorage.getItem('playerName')+"'s Score: "+score;
    food = randomFood();
  } else {
    snake1.pop();
  }

  // Snake2 AI
  if(multiplayer){
    let head2 = {x: snake2[0].x+dx2, y: snake2[0].y+dy2};
    if(head2.x<0||head2.y<0||head2.x>=canvas.width/CELL_SIZE||head2.y>=canvas.height/CELL_SIZE){
      gameOver();
      return;
    }
    snake2.unshift(head2);
    if(head2.x===food.x && head2.y===food.y){
      food = randomFood();
    } else {
      snake2.pop();
    }
  }
}

// Draw grid background
function drawBackground(){
  ctx.fillStyle="#111827";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle="#1f2937";
  for(let x=0; x<canvas.width; x+=CELL_SIZE){
    ctx.beginPath();
    ctx.moveTo(x,0); ctx.lineTo(x,canvas.height);
    ctx.stroke();
  }
  for(let y=0; y<canvas.height; y+=CELL_SIZE){
    ctx.beginPath();
    ctx.moveTo(0,y); ctx.lineTo(canvas.width,y);
    ctx.stroke();
  }
}

// Draw everything
function draw(){
  drawBackground();

  // Food
  const foodGradient = ctx.createLinearGradient(food.x*CELL_SIZE, food.y*CELL_SIZE, (food.x+1)*CELL_SIZE, (food.y+1)*CELL_SIZE);
  foodGradient.addColorStop(0,"#f87171");
  foodGradient.addColorStop(1,"#ef4444");
  ctx.fillStyle = foodGradient;
  ctx.beginPath();
  ctx.arc(food.x*CELL_SIZE + CELL_SIZE/2, food.y*CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2 - 2, 0, Math.PI*2);
  ctx.fill();

  // Snake1
  snake1.forEach((s,i)=>{
    const grad = ctx.createLinearGradient(s.x*CELL_SIZE, s.y*CELL_SIZE, (s.x+1)*CELL_SIZE, (s.y+1)*CELL_SIZE);
    grad.addColorStop(0, i===0?"#10b981":"#34d399");
    grad.addColorStop(1, i===0?"#059669":"#047857");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(s.x*CELL_SIZE, s.y*CELL_SIZE, CELL_SIZE, CELL_SIZE, 6);
    ctx.fill();
    ctx.strokeStyle="#111827"; ctx.lineWidth=2;
    ctx.stroke();

    if(i===0){
      ctx.shadowColor="lime";
      ctx.shadowBlur=20;
      ctx.fill();
      ctx.shadowBlur=0;
    }
  });

  // Snake2
  if(multiplayer){
    snake2.forEach((s,i)=>{
      const grad = ctx.createLinearGradient(s.x*CELL_SIZE, s.y*CELL_SIZE, (s.x+1)*CELL_SIZE, (s.y+1)*CELL_SIZE);
      grad.addColorStop(0, i===0?"#3b82f6":"#60a5fa");
      grad.addColorStop(1, i===0?"#1d4ed8":"#2563eb");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(s.x*CELL_SIZE, s.y*CELL_SIZE, CELL_SIZE, CELL_SIZE, 6);
      ctx.fill();
      ctx.strokeStyle="#111827"; ctx.lineWidth=2;
      ctx.stroke();

      if(i===0){
        ctx.shadowColor="cyan";
        ctx.shadowBlur=20;
        ctx.fill();
        ctx.shadowBlur=0;
      }
    });
  }
}

// Boost toggle
function toggleBoost(){
  if(boosted){
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
    boosted = false;
  } else {
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed/2);
    boosted = true;
  }
}

// Game over
function gameOver(){
  clearInterval(gameInterval);
  document.getElementById("popup").style.display="flex";
}

// Restart
function restartGame(){
  document.getElementById("popup").style.display="none";
  startGame(multiplayer);
}

// Keyboard controls
document.addEventListener("keydown", e=>{
  if(e.key==="ArrowUp" && dy1===0){dx1=0; dy1=-1;}
  else if(e.key==="ArrowDown" && dy1===0){dx1=0; dy1=1;}
  else if(e.key==="ArrowLeft" && dx1===0){dx1=-1; dy1=0;}
  else if(e.key==="ArrowRight" && dx1===0){dx1=1; dy1=0;}
});  }

  // Snake2 AI
  if(multiplayer){
    let head2 = {x: snake2[0].x+dx2, y: snake2[0].y+dy2};
    if(head2.x<0||head2.y<0||head2.x>=canvas.width/CELL_SIZE||head2.y>=canvas.height/CELL_SIZE){
      gameOver();
      return;
    }
    snake2.unshift(head2);
    if(head2.x===food.x && head2.y===food.y){
      food = randomFood();
    } else {
      snake2.pop();
    }
  }
}

// Draw grid background
function drawBackground(){
  ctx.fillStyle="#111827";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.strokeStyle="#1f2937";
  for(let x=0; x<canvas.width; x+=CELL_SIZE){
    ctx.beginPath();
    ctx.moveTo(x,0); ctx.lineTo(x,canvas.height);
    ctx.stroke();
  }
  for(let y=0; y<canvas.height; y+=CELL_SIZE){
    ctx.beginPath();
    ctx.moveTo(0,y); ctx.lineTo(canvas.width,y);
    ctx.stroke();
  }
}

// Draw everything
function draw(){
  drawBackground();

  // Food
  const foodGradient = ctx.createLinearGradient(food.x*CELL_SIZE, food.y*CELL_SIZE, (food.x+1)*CELL_SIZE, (food.y+1)*CELL_SIZE);
  foodGradient.addColorStop(0,"#f87171");
  foodGradient.addColorStop(1,"#ef4444");
  ctx.fillStyle = foodGradient;
  ctx.beginPath();
  ctx.arc(food.x*CELL_SIZE + CELL_SIZE/2, food.y*CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2 - 2, 0, Math.PI*2);
  ctx.fill();

  // Snake1
  snake1.forEach((s,i)=>{
    const grad = ctx.createLinearGradient(s.x*CELL_SIZE, s.y*CELL_SIZE, (s.x+1)*CELL_SIZE, (s.y+1)*CELL_SIZE);
    grad.addColorStop(0, i===0?"#10b981":"#34d399");
    grad.addColorStop(1, i===0?"#059669":"#047857");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(s.x*CELL_SIZE, s.y*CELL_SIZE, CELL_SIZE, CELL_SIZE, 6);
    ctx.fill();
    ctx.strokeStyle="#111827"; ctx.lineWidth=2;
    ctx.stroke();

    if(i===0){
      ctx.shadowColor="lime";
      ctx.shadowBlur=20;
      ctx.fill();
      ctx.shadowBlur=0;
    }
  });

  // Snake2
  if(multiplayer){
    snake2.forEach((s,i)=>{
      const grad = ctx.createLinearGradient(s.x*CELL_SIZE, s.y*CELL_SIZE, (s.x+1)*CELL_SIZE, (s.y+1)*CELL_SIZE);
      grad.addColorStop(0, i===0?"#3b82f6":"#60a5fa");
      grad.addColorStop(1, i===0?"#1d4ed8":"#2563eb");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(s.x*CELL_SIZE, s.y*CELL_SIZE, CELL_SIZE, CELL_SIZE, 6);
      ctx.fill();
      ctx.strokeStyle="#111827"; ctx.lineWidth=2;
      ctx.stroke();

      if(i===0){
        ctx.shadowColor="cyan";
        ctx.shadowBlur=20;
        ctx.fill();
        ctx.shadowBlur=0;
      }
    });
  }
}

// Boost toggle
function toggleBoost(){
  if(boosted){
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
    boosted = false;
  } else {
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed/2);
    boosted = true;
  }
}

// Game over
function gameOver(){
  clearInterval(gameInterval);
  document.getElementById("popup").style.display="flex";
}

// Restart
function restartGame(){
  document.getElementById("popup").style.display="none";
  startGame(multiplayer);
}

// Keyboard controls
document.addEventListener("keydown", e=>{
  if(e.key==="ArrowUp" && dy1===0){dx1=0; dy1=-1;}
  else if(e.key==="ArrowDown" && dy1===0){dx1=0; dy1=1;}
  else if(e.key==="ArrowLeft" && dx1===0){dx1=-1; dy1=0;}
  else if(e.key==="ArrowRight" && dx1===0){dx1=1; dy1=0;}
});    snake2.forEach((s,i)=>{
      const grad = ctx.createLinearGradient(s.x*CELL_SIZE, s.y*CELL_SIZE, (s.x+1)*CELL_SIZE, (s.y+1)*CELL_SIZE);
      grad.addColorStop(0, i===0?"#3b82f6":"#60a5fa");
      grad.addColorStop(1, i===0?"#1d4ed8":"#2563eb");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(s.x*CELL_SIZE, s.y*CELL_SIZE, CELL_SIZE, CELL_SIZE, 6);
      ctx.fill();
      ctx.strokeStyle="#111827"; ctx.lineWidth=2;
      ctx.stroke();

      // AI head glow
      if(i===0){
        ctx.shadowColor="cyan";
        ctx.shadowBlur=20;
        ctx.fill();
        ctx.shadowBlur=0;
      }
    });
  }
      }function draw(){
  ctx.fillStyle="#1f2937";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Food
  const foodGradient = ctx.createLinearGradient(food.x*CELL_SIZE, food.y*CELL_SIZE, (food.x+1)*CELL_SIZE, (food.y+1)*CELL_SIZE);
  foodGradient.addColorStop(0,"#f87171");
  foodGradient.addColorStop(1,"#ef4444");
  ctx.fillStyle = foodGradient;
  ctx.beginPath();
  ctx.arc(food.x*CELL_SIZE + CELL_SIZE/2, food.y*CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2 - 2, 0, Math.PI*2);
  ctx.fill();

  // Snake1
  snake1.forEach((s,i)=>{
    const grad = ctx.createLinearGradient(s.x*CELL_SIZE, s.y*CELL_SIZE, (s.x+1)*CELL_SIZE, (s.y+1)*CELL_SIZE);
    grad.addColorStop(0, i===0?"#10b981":"#34d399");
    grad.addColorStop(1, i===0?"#059669":"#047857");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(s.x*CELL_SIZE, s.y*CELL_SIZE, CELL_SIZE, CELL_SIZE, 6);
    ctx.fill();
    ctx.strokeStyle="#111827"; ctx.lineWidth=2;
    ctx.stroke();

    // Head glow
    if(i===0){
      ctx.shadowColor="lime";
      ctx.shadowBlur=20;
      ctx.fill();
      ctx.shadowBlur=0; // reset
    }
  });

  // Snake2
  if(multiplayer){
    snake2.forEach((s,i)=>{
      const grad = ctx.createLinearGradient(s.x*CELL_SIZE, s.y*CELL_SIZE, (s.x+1)*CELL_SIZE, (s.y+1)*CELL_SIZE);
      grad.addColorStop(0, i===0?"#3b82f6":"#60a5fa");
      grad.addColorStop(1, i===0?"#1d4ed8":"#2563eb");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(s.x*CELL_SIZE, s.y*CELL_SIZE, CELL_SIZE, CELL_SIZE, 6);
      ctx.fill();
      ctx.strokeStyle="#111827"; ctx.lineWidth=2;
      ctx.stroke();

      // AI head glow
      if(i===0){
        ctx.shadowColor="cyan";
        ctx.shadowBlur=20;
        ctx.fill();
        ctx.shadowBlur=0;
      }
    });
  }
                                            }
