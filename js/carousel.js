var context;
var currentSlide = 0;
var trns;
var repeat;
var pics = [];
pics[0] = new Image();
pics[1] = new Image();
pics[2] = new Image();
pics[3] = new Image();
pics[4] = new Image();
var isPausing = false; //the status of stopping the animation: will be false when animation is running or stopped, and true when in the process of finishing animation
var wait;
var isPlaying; //true when auto playing
var isLoaded; //true when all images are loaded

//set initial size
var w = window.innerWidth;
var canvasWidth = w / 2;
var aspectRatio = 4 / 3;
var canvasHeight = canvasWidth / aspectRatio;

//function to resize
function setSize() {
  w = window.innerWidth;
  canvasWidth = w / 2;
  canvasHeight = canvasWidth / aspectRatio;
  canvas.setAttribute("width", canvasWidth);
  canvas.setAttribute("height", canvasHeight);
}

//resize if window resizes
window.addEventListener("resize", setSize());

function load() {
  //get images and check if first is ready
  setSize();
  pics[0].src = "./images/accollo1.jpg";
  pics[1].src = "./images/disagio.jpg";
  pics[2].src = "./images/bagels.jpg";
  pics[3].src = "./images/lesson.jpg";
  pics[4].src = "./images/mosaic.jpg";
  isLoaded = setInterval(loadingCheck, 10);
}

//originally wrote this logic inside load function with onload but it wasn't working as expected
//when all images are loaded, autoplay starts
function loadingCheck() {
  if (
    pics[0].complete &&
    pics[1].complete &&
    pics[2].complete &&
    pics[3].complete
  ) {
    clearInterval(isLoaded);
    autoPlay();
  }
}

//auto play through the images
function autoPlay() {
  isPlaying = true;
  context = canvas.getContext("2d");
  setSize();
  context.drawImage(pics[currentSlide], x1, 0, canvasWidth, canvasHeight);
  repeat = setTimeout(function() {
    if (!isPausing) {
      startTrans();
    } else {
      isPausing = false; //because now it's fully paused
      isPlaying = false;
    }
  }, 3000);
}

//cycle through reposition increments
function startTrans() {
  trns = setInterval(function() {
    changePic();
  }, 10);
}

x1 = 0;
x2 = canvasWidth;
xt = Math.floor(canvasWidth * 0.005);

//increment of repositioning
function changePic() {
  setSize();
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  var nextSlide = currentSlide == pics.length - 1 ? 0 : currentSlide + 1;
  context.drawImage(pics[currentSlide], x1, 0, canvasWidth, canvasHeight);
  context.drawImage(pics[nextSlide], x2, 0, canvasWidth, canvasHeight);
  if (x1 > -canvasWidth) {
    x1 -= xt;
    x2 -= xt;
  } else {
    x1 = 0;
    x2 = canvasWidth;
    if (currentSlide + 1 > pics.length - 1) {
      currentSlide = 0;
      if (!isPausing) {
        clearInterval(trns);
        autoPlay();
      } else {
        clearInterval(trns);
        isPausing = false;
        isPlaying = false;
      }
    } else {
      currentSlide++;
      if (!isPausing) {
        clearInterval(trns);
        autoPlay();
      } else {
        clearInterval(trns);
        isPausing = false;
        isPlaying = false;
      }
    }
  }
}

function restartAuto() {
  if (isPlaying) {
    return; //to avoid re-running autoPlay if it's already running
  } else {
    autoPlay();
  }
}

//activated by clicking pause: allows current tranisition to finish (if it's transitioning) doesn't do anything if show is already stopped
function pauseAuto() {
  if (isPlaying) {
    isPausing = true;
  }
}

//activated by clicking next/previous/dots (sudden change: doesn't wait for transition if in progress)
function stopAuto() {
  isPlaying = false;
  clearInterval(trns);
  //need to reset initial x values for transition so it's not in the middle if it starts again
  x1 = 0;
  x2 = canvasWidth;
  clearTimeout(repeat);
}

//activated when you click dot
function showX(x) {
  stopAuto();
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  currentSlide = x;
  context.drawImage(pics[currentSlide], 0, 0, 640, 480);
}

//activated when you click next
function next() {
  stopAuto();
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  if (currentSlide == pics.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  context.drawImage(pics[currentSlide], 0, 0, canvasWidth, canvasHeight);
}

//activated when you click prev
function previous() {
  stopAuto();
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  if (currentSlide == 0) {
    currentSlide = pics.length - 1;
  } else {
    currentSlide--;
  }
  context.drawImage(pics[currentSlide], 0, 0, canvasWidth, canvasHeight);
}

//load and start carousel when page is ready
window.onload = load();
