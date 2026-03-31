const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

let currentTool = 'pencil';
let brushColor = '#ff85a1';
let brushSize = 8;
let isDrawing = false;

/* INIT */
ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0,canvas.width,canvas.height);

/* TOOL SWITCH */
function setTool(tool){
  currentTool = tool;
}

/* COLOR */
function onColorChange(color){
  brushColor = color;
}

/* DRAW EVENTS */
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', draw);

function draw(e){
  if(!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = brushSize;

  if(currentTool === 'eraser'){
    ctx.globalCompositeOperation = 'destination-out';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = brushColor;
  }

  ctx.lineTo(x,y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x,y);
}

/* CLEAR */
function clearCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

/* SAVE */
function saveImage(type){
  const link = document.createElement('a');
  link.download = "drawing." + type;
  link.href = canvas.toDataURL();
  link.click();
}

/* UNDO/REDO (basic) */
let history = [];
function saveState(){
  history.push(canvas.toDataURL());
}
function undo(){
  if(history.length === 0) return;
  const img = new Image();
  img.src = history.pop();
  img.onload = ()=>ctx.drawImage(img,0,0);
}
function redo(){}

/* NEW */
function newCanvas(){
  clearCanvas();
}
