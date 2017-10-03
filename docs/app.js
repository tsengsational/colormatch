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

setRandomColor()

let icon = document.querySelector('.fa')
icon.addEventListener('click', setRandomColor)

document.onmousemove = function(e) {
      var mouseCoords = getMousePos(e);
      // console.log(mouseCoords)
      let h = parseInt((mouseCoords["x"] / width) * 360)
      let l = parseInt((mouseCoords["y"] / height) * (50 - 20) + 20)
      console.log(l)

      document.documentElement.style.setProperty('--base', `hsl(${h}, 50%, ${l}%)`)

      let base = document.documentElement.style.getPropertyValue('--base')
      let target = document.documentElement.style.getPropertyValue('--target')
      console.log(target, base)
      if ( base === target) {
        alert("You matched!")
        setRandomColor()
      }
 };
