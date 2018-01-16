var width = window.innerWidth
var height = window.innerHeight

function setRandomColor() {
  let randomH = (parseInt(Math.random() * 360))
  let randomL = (parseInt(Math.random() * (50 - 20) + 20))
  let randomColor = `hsl(${randomH}, 50%, ${randomL}%)`
  document.documentElement.style.setProperty('--target', randomColor)
}

function getMousePos(e) {
  return { x: e.clientX, y: e.clientY };
}

function getTouchPos(e) {
  return { x: e.touches[0].clientX, y: e.touches[0].clientY}
}

setRandomColor()

let icon = document.querySelector('.fa')
icon.addEventListener('click', setRandomColor)


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

function onTouchMove(e) {
  console.log("moving", e)
}

document.onmousemove = onMove
document.ontouchmove = onMove
