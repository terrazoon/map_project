var locations = [
  {title: 'Vista Valencia Golf Course', location: {lat: 34.3857, lng: -118.5642}},
  {title: 'California Institute of the Arts', location: {lat: 34.3933, lng: -118.5668}},
  {title: 'College of the Canyons, Canyon Country Campus', location: {lat: 34.4358, lng: -118.4294}},
  {title: 'Saugus High School', location: {lat: 34.3844, lng: -118.5189}}, 
  {title: 'Saugus Speedway', location: {lat: 34.4163, lng: -118.5279}},
  {title: 'Six Flags Magic Mountain', location: {lat: 34.4253, lng: -118.5972}},
  {title: 'The Masters University', location: {lat: 34.3825, lng: -118.5193}},
  {title: 'Towsley Canyon Park', location: {lat: 34.3606, lng: -118.5548}},
  {title: 'Valley View Elementary School', location: {lat: 34.3974, lng: -118.4750}},
  {title: 'Westfield Valencia Town Center', location: {lat: 34.4157, lng: -118.5578}}
];

        
var Location = function(title, location) {
  this.title = title;
  this.location = location;
};

let API_KEY = '7eb2739c11560e56f77b4edae27e19b2';

//non-google third party api
function getWeather(latitude, longtitude) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    data: {
      lat: latitude,
      lon: longtitude,
      units: 'imperial',
      APPID: API_KEY
    },
    success: data => {
       console.log(data.main.temp + " F");
       $('.weather_field').html("<BR>From openweathermap.org:<BR><BR>Current temperature:" + data.main.temp + " F");
          
    }
  });
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/uvi',
    data: {
      lat: latitude,
      lon: longtitude,
      units: 'imperial',
      APPID: API_KEY
    },
    success: data => {
       console.log(data.value + " UVI");
       $('.latlng_field').html("Latitute:" + data.lat.toFixed(4) + "<BR>Longitude: " + data.lon.toFixed(4));
       $('.uv_field').html("Current UV Index: " + data.value + "<BR>");
          
    }
  });
  
}


var ViewModel = function() {
  var self = this;
      
  this.availableLocations = ko.observableArray(locations), selectedLocation = ko.observable();
    
  this.durationList = ko.observableArray(["10", "15", "30", "60"]);
  this.modeList = ko.observableArray(["DRIVING", "WALKING", "BICYCLING", "TRANSIT"]);   
  this.map = ko.observable(document.getElementById("map"));
    
  this.searchMapWithinTime = function() {
    searchWithinTime();
  }
    
  this.showMapListings = function() {
    showListings();
  } 
    
  this.hideMapListings = function() {
    hideMarkers(markers);
  }
    
  this.mapZoomToArea = function() {
    zoomToArea();
  }
    
  this.mapTextSearchPlaces = function() {
    textSearchPlaces();
  }
    
  this.toggleMapDrawing = function() {
    toggleDrawing(drawingManager);
  }
    
};

ko.applyBindings(new ViewModel());