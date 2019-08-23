var canvasWidth = document.getElementById("canvas").clientWidth;
var canvasHeight = canvasWidth * 0.75;
//need code to check if it resizes

var context;
var currentSlide = 0;
x1 = 0;
x2 = 640;
xt = 3;
var trns;
var repeat;
var pics = [];
pics[0] = new Image();
pics[1] = new Image();
pics[2] = new Image();
var isPausing = false; //the status of stopping the animation: will be false when animation is running or stopped, and true when in the process of finishing animation
var wait;
var isPlaying; //true when auto playing
var isLoaded; //true when all images are loaded

function load() {
  //get images and check if first is ready
  pics[0].src = "./images/accollo1.jpg";
  pics[1].src = "./images/disagio.jpg";
  pics[2].src = "./images/accollo2.jpg";
  isLoaded = setInterval(loadingCheck, 10);
}

//originally wrote this logic inside load function with onload but it wasn't working as expected
//when all images are loaded, autoplay starts
function loadingCheck() {
  if (pics[0].complete && pics[1].complete && pics[2].complete) {
    clearInterval(isLoaded);
    autoPlay();
  }
}

//auto play through the images
function autoPlay() {
  console.log("autoPlay activated");
  isPlaying = true;
  console.log("inside the picsonload bit");
  context = canvas.getContext("2d");
  context.drawImage(pics[currentSlide], x1, 0, 640, 480);
  repeat = setTimeout(function() {
    if (!isPausing) {
      console.log("starting transition");
      startTrans();
    } else {
      console.log("stopping because isPausing was true ie you hit pause");
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

//increment of repositioning
function changePic() {
  context.clearRect(0, 0, 640, 480);
  var nextSlide = currentSlide == pics.length - 1 ? 0 : currentSlide + 1;
  context.drawImage(pics[currentSlide], x1, 0, 640, 480);
  context.drawImage(pics[nextSlide], x2, 0, 640, 480);
  if (x1 > -640) {
    x1 -= xt;
    x2 -= xt;
  } else {
    console.log("pic has fully arrived at end position");
    x1 = 0;
    x2 = 640;
    if (currentSlide + 1 > pics.length - 1) {
      currentSlide = 0;
      if (!isPausing) {
        console.log("end the trans and start new pic: 1st");
        clearInterval(trns);
        autoPlay();
      } else {
        console.log(
          "ending trans and do nothing because it's been paused: 1st"
        );
        clearInterval(trns);
        isPausing = false;
        isPlaying = false;
      }
    } else {
      currentSlide++;
      if (!isPausing) {
        console.log("end the trans and start new pic: 2nd");
        clearInterval(trns);
        autoPlay();
      } else {
        console.log(
          "ending trans and do nothing because it's been paused: 2nd"
        );
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
  x2 = 640;
  clearTimeout(repeat);
}

//activated when you click dot
function showX(x) {
  stopAuto();
  context.clearRect(0, 0, 640, 480);
  currentSlide = x;
  context.drawImage(pics[currentSlide], 0, 0, 640, 480);
}

//activated when you click next
function next() {
  stopAuto();
  context.clearRect(0, 0, 640, 480);
  if (currentSlide == 2) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  context.drawImage(pics[currentSlide], 0, 0, 640, 480);
}

//activated when you click prev
function previous() {
  stopAuto();
  context.clearRect(0, 0, 640, 480);
  if (currentSlide == 0) {
    currentSlide = 2;
  } else {
    currentSlide--;
  }
  context.drawImage(pics[currentSlide], 0, 0, 640, 480);
}

//load and start carousel when page is ready
window.onload = load();
