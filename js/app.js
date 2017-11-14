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

      
      var wdata;
      var uvdata;
      
      

//non-google third party api
function getWeather(latitude, longitude) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    data: {
      lat: latitude,
      lon: longitude,
      units: 'imperial',
      APPID: API_KEY
    },
    success: data => {
       wdata = data;
       console.log(wdata.main.temp + " F");
    },
    error: function (xhr, ajaxOptions, thrownError) {
        window.alert("The weather info is not available.  Error" + xhr.status);
    }
  });
}

function getUV(latitude, longitude) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/uvi',
    data: {
      lat: latitude,
      lon: longitude,
      units: 'imperial',
      APPID: API_KEY
    },
    success: data => {
       console.log(data.value + " UVI");
       uvdata = data;
    },
    error: function (xhr, ajaxOptions, thrownError) {
        window.alert("The UV info is not available.  Error" + xhr.status);
    
    }
  });
  
}




var ViewModel = function() {
  var self = this;
  
  
  this.availableLocations = ko.observableArray(locations);
  
  
  this.selectedLocation = ko.observable(locations[2]);
  
  this.filter = ko.observable("");
  this.search = ko.observable("");
  
  
  this.showAllMapListings = function(filterList) {
      showFilteredListings(filterList);
  }
  
  //ko.utils.arrayFilter - filter the items using the filter text
  this.filteredLocations = ko.dependentObservable(function() {
    var filter = self.filter().toLowerCase();
    var returnVal;
    if (!filter) {
        returnVal = self.availableLocations();
    } else {
        returnVal =  ko.utils.arrayFilter(self.availableLocations(), function(item) {
            return self.stringStartsWith(item.title.toLowerCase(), filter);
        });
    }
 
     
    if (typeof showAllListings === "function") {     
      self.showAllMapListings(returnVal);
    }
    return returnVal;
  });
  
  this.stringStartsWith = function (string, startsWith) {          
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
  };

  
  //ko.utils.arrayFirst - identify the first matching item by name
  this.firstMatch = ko.dependentObservable(function() {
    var search = self.search().toLowerCase();
    if (!search) {
        return null;
    } else {
        return ko.utils.arrayFirst(this.filteredLocations(), function(item) {
            return ko.utils.stringStartsWith(item.total().toLowerCase(), search);
        });
    }
  });

    
  this.durationList = ko.observableArray(["10", "15", "30", "60"]);
  this.modeList = ko.observableArray(["DRIVING", "WALKING", "BICYCLING", "TRANSIT"]);   
  this.map = ko.observable(document.getElementById("map"));
    
  this.searchMapWithinTime = function() {
    searchWithinTime(self.mapSearchTimeText(), self.selectedMode());
  }
    
  this.showMapListings = function() {
    showListings();
  } 
    
  this.hideMapListings = function() {
    hideMarkers(markers);
  }
  
    
  this.mapZoomToArea = function() {
    zoomToArea(self.mapZoomToAreaText());
  }
  
  self.mapZoomToAreaText = ko.observable("Enter your favorite area!");
  self.mapPlacesSearch = ko.observable("Ex: Pizza delivery in Santa Clarita");
  self.mapSearchTimeText = ko.observable("Ex: Valley Lyons Pet Hospital");
  self.selectedMode = ko.observable();
    
  this.mapTextSearchPlaces = function() {
    textSearchPlaces(self.mapPlacesSearch());
  }
    
  this.toggleMapDrawing = function() {
    toggleDrawing(drawingManager);
  }
    
};

ko.applyBindings(new ViewModel());