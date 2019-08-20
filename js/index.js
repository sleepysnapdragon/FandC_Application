window.onscroll = function() {
  scrollFunction();
  progressBar();
  navLinkActivate();
};

//function for navbar resize when user begins to scroll down
/*
function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.getElementById("navbarbuttons").style.padding = "10px 10px";
  } else {
    document.getElementById("navbarbuttons").style.padding = "60px 10px";
  }
}
*/

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.getElementById("navbarbuttons").style.padding = "10px 10px";
  } else {
    document.getElementById("navbarbuttons").style.padding = "60px 10px";
  }
}

//function for progress bar when scrolling
function progressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

//functions to set active class for nav bar sections
function isElemInView(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) / 2 &&
    rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) / 2
  );
}

const sections = document.getElementsByClassName("background");
const links = document.getElementById("navbarbuttons").children;
function navLinkActivate() {
  for (var i = 0; i < sections.length; i++) {
    if (isElemInView(sections[i])) {
      links[i].classList.add("active");
    } else {
      links[i].classList.remove("active");
    }
  }
}

//name typing thing
var add;
var messageFinished = ["H", "i", ",", " ", "I", "'", "m", " "];
var message = [];
var nameField = document.getElementById("myname");
var letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
var nameArr = [];
var change;
var changeLettersActive = 0;
var finishedName = ["G", "i", "l", "l", "i", "a", "n"];

function showName() {
  if (changeLettersActive == 0) {
    add = setTimeout(addLetters, 100);
  } else {
    change = setTimeout(changeLetters, 100);
  }
}

function addLetters() {
  if (message.length < messageFinished.length) {
    message.push(messageFinished[message.length]);
    nameField.innerText = message.join("") + nameArr.join("");
    showName();
  } else if (nameArr.length < 7) {
    nameArr.push(letters[Math.floor(Math.random() * letters.length)]);
    nameField.innerText = message.join("") + nameArr.join("");
    showName();
  } else {
    changeLettersActive = 1;
    clearTimeout(add);
    showName();
  }
}

var changeCount = 0;
var j = 1;

function changeLetters() {
  if (changeCount < 10) {
    for (var i = 0; i < 7; i++) {
      nameArr[i] = letters[Math.floor(Math.random() * letters.length)];
    }
    nameField.innerText = message.join("") + nameArr.join("");
    changeCount++;
    showName();
  } else {
    nameArr = ["G", "i", "l", "l", "i", "a", "n"];
    for (var i = j; i < 7; i++) {
      nameArr[i] = letters[Math.floor(Math.random() * letters.length)];
    }
    nameField.innerText = message.join("") + nameArr.join("");
    j++;
    if (j < 9) {
      showName();
    } else {
      clearTimeout(change);
    }
  }
}

//functions for map
function initMap() {
  var rome = { lat: 41.906314, lng: 12.496595 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: rome,
    streetViewControl: false,
    mapTypeControl: false
  });

  var marker = new google.maps.Marker({
    position: rome,
    map: map,
    icon: "./images/marker.gif",
    optimization: false
  });
}

window.onload = showName();
