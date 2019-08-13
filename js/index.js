window.onscroll = function() {
  scrollFunction();
  progressBar();
  navLinkActivate();
};

//function for navbar resize when user begins to scroll down
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

//functions for map
function initMap() {
  var rome = { lat: 41.906314, lng: 12.496595 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: rome
  });

  var marker = new google.maps.Marker({
    position: rome,
    map: map,
    icon: "./images/marker.gif",
    optimization: false
  });
}
