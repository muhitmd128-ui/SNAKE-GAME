function draw(){
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
