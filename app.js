let width = window.innerWidth;
let height = window.innerHeight;
let closeBtn = document.querySelector(".close-btn");
let icon = document.querySelector('.fa')
let title = document.querySelector('.title')
let help = document.querySelector('.help')
let timer = document.querySelector('#timer')
let scoreCount = document.querySelector('#score')
let playing = false
let score = 0
let time = 60
let reset = false

function getMousePos(e) {
  return { x: e.clientX, y: e.clientY };
}

function getTouchPos(e) {
  return { x: e.touches[0].clientX, y: e.touches[0].clientY};
}

function onMove(e) {
  if (!playing) {
    return null
  }
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
    score++
    scoreCount.innerText = score
  }
 };

function parseTime(time) {
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60
  let ret = ''
  ret += (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds
  return ret
}

function setTime(t) {
  timer.innerText = parseTime(t)
}

function depracateTime(t) {
  time -= t
  setTime(time)
}

function startTimer(){
  setTime(time)
  let x = setInterval(function () {
      depracateTime(1)
      if (time <= 0) {
        clearInterval(x)
        // playing = !playing
      }
      if (reset) {
        clearInterval(x)
      }
    }, 1000);
}

function resetTimer(t){
  reset = true
  setTimeout(function () {
    reset = false
  }, 1000);
  time = 60
  setTime(time)
}

function toggleTitle() {
   title.classList.toggle('hide')
   help.classList.toggle('hide')
   timer.classList.toggle('hide')
   scoreCount.classList.toggle('hide')
   time <= 120 ? resetTimer() : null
   startTimer()
   score = 0
   scoreCount.innerText = score
   playing = !playing
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
