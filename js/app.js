
//var initialCats = [


//        {
//            clickCount : 0,
//            name : 'Tabby',
//            imgSrc : 'fatcat.jpg',
//            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568',
//            nicknames: ['JavaScript','KnockoutJS','BackboneJS','EmberJS']
    
//        },
//        {
//            clickCount : 0,
//            name : 'Tiger',
//            imgSrc : 'russian.jpg',
//            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904',
//            nicknames: ['Rolf']
//        }
//]
//var Cat = function(data) {

//    this.clickCount = ko.observable(data.clickCount);
//    this.name = ko.observable(data.name);
    
//    this.imgSrc = ko.observable(data.imgSrc);
//    this.imgAttribution = ko.observable(data.imgAttribution);
//    this.nicknames = ko.observableArray(data.nicknames);

    
    
//    this.level = ko.computed(function () {
//        if (this.clickCount() < 10) return 'Newborn';
//        if (this.clickCount() < 20) return 'kitten';
//        return 'grandmaster';
//    }, this);
    
        
//}

//TODO remove
var locations = [
    {title: 'Vista Valencia Golf Course', location: {lat: 34.3857, lng: -118.5642}},
    {title: 'California Institute of the Arts', location: {lat: 34.3933, lng: -118.5668}},
    {title: 'Six Flags Magic Mountain', location: {lat: 34.4253, lng: -118.5972}},
    {title: 'The Masters University', location: {lat: 34.3825, lng: -118.5193}},
    {title: 'Towsley Canyon Park', location: {lat: 34.3606, lng: -118.5548}}
];

        
var Location = function(title, location) {
        this.title = title;
        this.location = location;
};

let API_KEY = '7eb2739c11560e56f77b4edae27e19b2';

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
       console.log(data["main"]["temp"] + " F");
       $('.weather_field').html(data["main"]["temp"] + " F");
          
    }
  })
}

getWeather(34.3606,-118.5548);

var ViewModel = function() {
    var self = this;
    
    
    
    this.availableLocations = ko.observableArray([
    
          new Location('Vista Valencia Golf Course', {lat: 34.3857, lng: -118.5642}),
          new Location('California Institute of the Arts', {lat: 34.3933, lng: -118.5668}),
          new Location('Six Flags Magic Mountain', {lat: 34.4253, lng: -118.5972}),
          new Location('The Masters University', {lat: 34.3825, lng: -118.5193}),
          new Location('Towsley Canyon Park', {lat: 34.3606, lng: -118.5548})
          
    ]), selectedLocation = ko.observable();
    
    this.durationList = ko.observableArray(["10", "15", "30", "60"]);
    this.modeList = ko.observableArray(["DRIVING", "WALKING", "BICYCLING", "TRANSIT"]);   
    
    
    //this.weather = ko.observable(new Weather().summary);
    
    //this.catList = ko.observableArray([]);

    //initialCats.forEach(function(catItem){
    //    self.catList.push( new Cat(catItem) );
    //});
    
    //this.currentCat = ko.observable(this.catList()[0]);
    
    this.getWeather = function() {
        //$.getJSON("http://api.openweathermap.org/data/2.5/forecast?id=5393049&APPID=7eb2739c11560e56f77b4edae27e19b2",function(json){
        //self.weather =  JSON.stringify(json);
        self.weather = "weather created";
    }   


    
    //this.incrementCounter = function() {
    //    this.clickCount(this.clickCount() + 1);
    
    //};
    
    //this.setCat = function(clickedCat) {
    //    self.currentCat(clickedCat);
    //}
    
   
    
}

ko.applyBindings(new ViewModel());
