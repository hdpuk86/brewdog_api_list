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
  populateDropdown(beers);
};

var populateDropdown = function(beers){
  var select = document.querySelector('select');
  for(beer of beers){
    var option = document.createElement('option');
    option.innerText = beer.name;
    select.appendChild(option);
  }
  select.addEventListener('change', function(event){
    var target = event.target;
    var index = target.selectedIndex -1;
    var beer = beers[index];
    display(beer);
  })
};

var removeChildElements = function(nodeId){
  var node = document.getElementById(nodeId);
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

var display = function(beer){
  var div = document.getElementById('beers');
  removeChildElements('beers');
  var ul = document.createElement('ul');
  addBeerName(ul, beer);
  addMalts(ul, beer);
  addBeerImage(ul, beer);
  div.appendChild(ul);
};

var generateList = function(beers){
  for(beer of beers){
    var div = document.getElementById('beers');
    var ul = document.createElement('ul');
    addBeerName(ul, beer);
    addMalts(ul, beer);
    addBeerImage(ul, beer);
    div.appendChild(ul);
  }
};

var addBeerName = function(ul, beer){
  var li = document.createElement('li');
  li.id = "beer-name";
  li.innerText = beer.name;
  ul.appendChild(li);
};

var addMalts = function(ul, beer){
  var li = document.createElement('li');
  var malts = beer.ingredients.malt;
  var maltNames = [];
  for(malt of malts){
    maltNames.push(malt.name);
  }
  li.innerText = "Malts: " + maltNames;
  ul.appendChild(li);
}

var addBeerImage = function(ul, beer){
  var li = document.createElement('li');
  var img = document.createElement('img');
  img.classList = "beer-image";
  img.src = beer.image_url;
  li.appendChild(img);
  ul.appendChild(li);
};

var app = function(){
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);
};

window.addEventListener('load', app);
