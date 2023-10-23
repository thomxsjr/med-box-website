window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

function dropMenu() {
  document.getElementById("drop_menu").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches('.right')) {
  var myDropdown = document.getElementById("drop_menu");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}