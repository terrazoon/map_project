var initialCats = [


        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'fatcat.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568',
            nicknames: ['JavaScript','KnockoutJS','BackboneJS','EmberJS']
    
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'russian.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904',
            nicknames: ['Rolf']
        }
]
var Cat = function(data) {

    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.nicknames = ko.observableArray(data.nicknames);

    
    
    this.level = ko.computed(function () {
        if (this.clickCount() < 10) return 'Newborn';
        if (this.clickCount() < 20) return 'kitten';
        return 'grandmaster';
    }, this);
    
        
}

var ViewModel = function() {
    var self = this;
    
    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem){
        self.catList.push( new Cat(catItem) );
    });
    
    this.currentCat = ko.observable(this.catList()[0]);
    
    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    
    };
    
    this.setCat = function(clickedCat) {
        self.currentCat(clickedCat);
    }
       
    
}

ko.applyBindings(new ViewModel());
