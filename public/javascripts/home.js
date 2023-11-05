


function showChart(pulsexValues, pulseyValues, temperaturexValues, temperatureyValues) {
  Chart.defaults.color = '#000';
  pulsexValues = pulsexValues.slice(1,pulsexValues.length-1)
  pulsexValues = pulsexValues.split(',')
  pulseyValues = pulseyValues.slice(1,pulseyValues.length-1)
  pulseyValues = pulseyValues.split(',');
  temperaturexValues = temperaturexValues.slice(1, temperaturexValues.length-1);
  temperaturexValues = temperaturexValues.split(',');
  temperatureyValues = temperatureyValues.slice(1,temperatureyValues.length-1);
  temperatureyValues = temperatureyValues.split(',');

new Chart("pulseChart", {
  type: "line",
  data: {
    labels: pulsexValues,
    datasets: [{
      label : 'BPM', 
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
      y : {
        type : 'linear'
      },
    }
  }
});


// temperature chart


new Chart("temperatureChart", {
  type: "line",
  data: {
    labels: temperaturexValues,
    datasets: [{
      label : 'Fahrenheit',
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
      y : {
        type : 'linear'
      }
    }
  }
});
}



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
