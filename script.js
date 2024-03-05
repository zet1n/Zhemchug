window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("back-to-top-btn").style.display = "block";
  } else {
    document.getElementById("back-to-top-btn").style.display = "none";
  }
}

document.getElementById("back-to-top-btn").onclick = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}