$(document).ready(function() {
  var locationApi = 'http://ipinfo.io';
  var weatherApi = 'http://api.openweathermap.org/data/2.5/weather'; 
  var testBox = $('#test');
  var locationBox = $('#location');
  var conditionsBox = $('#conditions');
  var windBox = $('#wind');
  var tempIcon = $('#icon');
  var temperature = $('#temperature');
  
  function getDirection(degrees) {
    console.log('degrees', degrees);
    var direction = '';
    if (degrees < 23 || degrees > 347) {
      direction = 'N';
    } else if (degrees < 68) {
      direction = 'NE';
    } else if (degrees < 113) {
      direction = 'E';
    } else if (degrees < 158) {
      direction = 'SE';
    } else if (degrees < 203) {
      direction = 'S';
    } else if (degrees < 248) {
      direction = 'SW';
    } else if (degrees < 303) {
      direction = 'W';
    } else if (degrees < 348) {
      direction = 'NW';
    }
    return direction;
  }
  
  function updateTemperature(data) {
      temperature.text(data.main.temp)
      locationBox.text('Houston, TX');
      conditionsBox.text(data.weather[0].description);
      windBox.text(getDirection(data.wind.deg) + ' ' + data.wind.speed + ' knots');
  }
  
  $.getJSON(locationApi, function(data) {
      var loc = data.loc;
      console.log('loc', loc);
      var parts = loc.split(',');
      var lat = parts[0];
      var lon = parts[1];
    
      var weatherParams = {
        lat: lat,
        lon: lon,
        units: 'imperial'
      };
      
      console.log('weatherParams', weatherParams);
      $.getJSON(weatherApi, weatherParams, updateTemperature);
    });
});




