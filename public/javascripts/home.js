


Chart.defaults.color = '#fff';

// pulse chart

const pulsexValues = [50,60,70,80,90,100,110,120,130,140,150];
const pulseyValues = [7,8,8,9,9,9,10,11,14,14,15];


new Chart("pulseChart", {
  type: "line",
  data: {
    labels: pulsexValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      color: "rgba(255, 255, 255, 1.0)",
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.4)",
      data: pulseyValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});


// pulse chart

const temperaturexValues = [50,60,70,80,90,100,110,120,130,140,150];
const temperatureyValues = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("temperatureChart", {
  type: "line",
  data: {
    labels: temperaturexValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.4)",
      data: temperatureyValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});

// navbar


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