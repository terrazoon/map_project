var locations = [
  {title: 'Castaic Lagoon', location: {lat: 34.5052, lng: -118.6104}},
  {title: 'College of the Canyons, Canyon Country Campus', location: {lat: 34.4358, lng: -118.4294}},
  {title: 'Six Flags Magic Mountain', location: {lat: 34.4253, lng: -118.5972}},
  {title: 'Towsley Canyon Park', location: {lat: 34.3606, lng: -118.5548}},
  {title: 'Vasquez Rocks', location: {lat: 34.4885, lng: -118.3207}}
];

        
var Location = function(title, location) {
  this.title = title;
  this.location = location;
};

let API_KEY = '7eb2739c11560e56f77b4edae27e19b2';



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