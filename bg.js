const body = document.querySelector("body");


function handleOnload(){
  image.classList.add("showing")
}
const IMG_NUMBER = 12;
function paintImage(imgNumber){
  const image = new Image();
  image.id = "bg";
  image.src = `images/${imgNumber + 1}.jpg`;
  image.addEventListener("onload", handleOnload)
  image.classList.add('bgImage')
  body.prepend(image);
  
}


function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}


function init(){
  const randomNumber = genRandom();
  paintImage(randomNumber)
}
init();