//function for navbar resize when user begins to scroll down
window.onscroll = function() {
  scrollFunction();
  progressBar();
};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.getElementById("navbarbuttons").style.padding = "15px 10px";
  } else {
    document.getElementById("navbarbuttons").style.padding = "60px 10px";
  }
}

function progressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
