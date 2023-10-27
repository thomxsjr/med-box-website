


Chart.defaults.color = '#000';


// pulse chart




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


// temperature chart


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

first = document.getElementById('first').value
second = document.getElementById('second').value
third = document.getElementById('third').value
fourth = document.getElementById('fourth').value

function reset() {
  first = "";
  second = "";
  third = "";
  fourth = "";
}