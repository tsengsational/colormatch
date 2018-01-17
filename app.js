let width = window.innerWidth;
let height = window.innerHeight;
let closeBtn = document.querySelector(".close-btn");
let icon = document.querySelector('.fa')
let title = document.querySelector('.title')
let help = document.querySelector('.help')

function getMousePos(e) {
  return { x: e.clientX, y: e.clientY };
}

function getTouchPos(e) {
  return { x: e.touches[0].clientX, y: e.touches[0].clientY};
}

function onMove(e) {
  if ( e.touches ) {
    var coords = getTouchPos(e);
  } else {
    var coords = getMousePos(e);
  }

  let h = parseInt((coords["x"] / width) * 360)
  let l = parseInt((coords["y"] / height) * (50 - 20) + 20)
  document.documentElement.style.setProperty('--base', `hsl(${h}, 50%, ${l}%)`)

  let base = document.documentElement.style.getPropertyValue('--base')
  let target = document.documentElement.style.getPropertyValue('--target')
  if ( base === target) {
    alert("You matched!")
    setRandomColor()
  }
 };

 function toggleTitle() {
   title.classList.toggle('hide')
   help.classList.toggle('hide')
 }

function setRandomColor() {
 let randomH = (parseInt(Math.random() * 360));
 let randomL = (parseInt(Math.random() * (50 - 20) + 20));
 let randomColor = `hsl(${randomH}, 50%, ${randomL}%)`;
 document.documentElement.style.setProperty('--target', randomColor);
}

function onTouchMove(e) {
  console.log("moving", e)
}

setRandomColor()
icon.addEventListener('click', setRandomColor);
icon.ontouchstart = setRandomColor
closeBtn.addEventListener('click', toggleTitle);
closeBtn.ontouchstart = toggleTitle;
help.addEventListener('click', toggleTitle);
help.ontouchstart = toggleTitle;
document.onmousemove = onMove;
document.ontouchmove = onMove;
