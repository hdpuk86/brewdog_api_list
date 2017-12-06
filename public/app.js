var makeRequest = function(url, callback){
  var req = new XMLHttpRequest();
  req.open('GET', url);
  req.addEventListener('load', callback);
  req.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  generateList(beers);
};

var generateList = function(beers){
  for(beer of beers){
    var div = document.getElementById('beers');
    var ul = document.createElement('ul');
    addBeerName(ul, beer);
    addBeerImage(ul, beer);
    div.appendChild(ul);
  }
};

var addBeerName = function(ul, beer){
  var li = document.createElement('li');
  li.innerText = beer.name;
  ul.appendChild(li);
};

var addBeerImage = function(ul, beer){
  var li = document.createElement('li');
  var img = document.createElement('img');
  img.classList = "beer-image";
  img.src = beer.image_url;
  li.appendChild(img);
  ul.appendChild(li);
}

var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
