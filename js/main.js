var $inputForm = document.querySelector('.city-input-form');
var $cityInput = document.querySelector('.city-input');
var $dataViews = document.querySelectorAll('.data-view');
var $resultsText = document.querySelector('.results-text');
var $optionList = document.querySelector('.option-list');
var $selectedBreweryName = document.querySelector('.selected-brewery-name');
var $selectedBreweryAddress = document.querySelector('.selected-brewery-address');
var $selectedBreweryWebsite = document.querySelector('.selected-brewery-website');
var $selectedBreweryPhone = document.querySelector('.selected-brewery-phone');
var $footerSearch = document.querySelector('.footer-search');
var $footerStar = document.querySelector('.footer-star');
var $favoritesButton = document.querySelector('.favorites-button');
var $backButton = document.querySelector('.back-button');
var $headerName = document.querySelector('.header-name');
var $favoritesList = document.querySelector('.favorites-list')

$inputForm.addEventListener('submit', formSubmitted);

$optionList.addEventListener('click', optionSelected);

$footerSearch.addEventListener('click', function() {
  data.view = 'welcome';
  data.brewArray = [];
  data.location = "";
  location.reload();
  viewSwapping(data);
});

$favoritesButton.addEventListener('click', addToFavorites);

$backButton.addEventListener('click', function() {
  data.view = 'brewery-options';
  viewSwapping(data);
})

window.addEventListener('beforeunload', function () {
  var favoritesJson = JSON.stringify(data.favorties);
  localStorage.setItem('favorites', favoritesJson);
});

document.addEventListener('DOMContentLoaded', function () {
  var favoritesData = localStorage.getItem('favorites');
  if (favoritesData !== null) {
    data.favorties = JSON.parse(favoritesData);
  }
});

function formSubmitted(e) {
  e.preventDefault();
  data.location = $cityInput.value
  data.view = 'brewery-options';
  viewSwapping(data);
  $inputForm.reset();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.openbrewerydb.org/breweries?by_city=' + data.location, true);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.brewArray = xhr.response;
    for (var i = 0; i < data.brewArray.length; i++) {
      if (data.brewArray[i].street !== '' && data.brewArray[i].phone !== '' && data.brewArray[i].website_url !== '' && data.brewArray[i].name !== '')
      $optionList.appendChild(renderOptions(data.brewArray[i]))
    }
  });
  xhr.send();
}

function optionSelected(e) {
  $favoritesButton.textContent = 'Add to favorites';
  $favoritesButton.className = 'favorites-button';
  if (e.target.className === 'brewName') {
  data.view = 'brewery-details';
  data.selected.name = e.target.textContent
  for (var i = 0; i < data.brewArray.length; i++) {
    if (data.brewArray[i].name === data.selected.name) {
      $selectedBreweryName.textContent = data.brewArray[i].name;
      $selectedBreweryAddress.textContent = data.brewArray[i].street + ', ' + data.brewArray[i].city + ', ' + data.brewArray[i].state + ' ' + data.brewArray[i].postal_code;
      $selectedBreweryWebsite.textContent = data.brewArray[i].website_url;
      $selectedBreweryWebsite.setAttribute('href', data.brewArray[i].website_url);
      $selectedBreweryPhone.textContent = 'Phone number: ' + data.brewArray[i].phone;
    }
  }
  for (var j = 0; j < data.favorties.length; j++) {
    if (data.favorties[j].name === data.selected.name) {
      $favoritesButton.textContent = 'Added to favorites!';
      $favoritesButton.className = 'favorites-button added';
    }
  }
  viewSwapping(data);
  }
}

function addToFavorites() {
  $favoritesButton.textContent = 'Added to favorites!';
  $favoritesButton.className = 'favorites-button added';
  var newFavorite = {};
  newFavorite.name = $selectedBreweryName.textContent;
  newFavorite.address = $selectedBreweryAddress.textContent;
  data.favorties.push(newFavorite)
}

function viewSwapping(data) {
   if (data.view === 'welcome') {
     $headerName.textContent = 'Favorites';
     $dataViews[0].className = 'data-view';
     $dataViews[1].className = 'data-view hidden';
     $dataViews[2].className = 'data-view hidden';
     $dataViews[3].className = 'data-view hidden'
   }
   if (data.view === 'brewery-options') {
    $headerName.textContent = 'Favorites';
    $dataViews[0].className = 'data-view hidden';
    $dataViews[1].className = 'data-view';
    $dataViews[2].className = 'data-view hidden';
    $dataViews[3].className = 'data-view hidden'
   }
  if (data.view === 'brewery-details') {
    $headerName.textContent = 'Favorites';
    $dataViews[0].className = 'data-view hidden';
    $dataViews[1].className = 'data-view hidden';
    $dataViews[2].className = 'data-view';
    $dataViews[3].className = 'data-view hidden'
  }
  if (data.view === 'favorites') {
    $headerName.textContent = 'Favorites';
    $dataViews[0].className = 'data-view hidden';
    $dataViews[1].className = 'data-view hidden';
    $dataViews[2].className = 'data-view hidden';
    $dataViews[3].className = 'data-view';
    for (var i = 0; i < data.favorites.length; i++) {
    $favoritesList.appendChild(renderOptions(data.favorites[i]))
    }
  }
}

function renderOptions(data) {
   $resultsText.textContent = 'Results in ' + data.city;

    var $colHalfDiv = document.createElement('div');
    $colHalfDiv.className = 'col-half';

    var $imageDiv = document.createElement('div');
    $imageDiv.className = 'image-div';

    var $brewInfoCol = document.createElement('div');
    $brewInfoCol.className = 'column brew-info text-center';

    var $brewName = document.createElement('p');
    $brewName.textContent = data.name;
    $brewName.className = 'brewName';

    var $brewAddress = document.createElement('p');
    $brewAddress.textContent = data.street + ', ' + data.city + ' ' + data.state + ' ' + data.postal_code;
    $brewAddress.className = 'brewAddress';

    $colHalfDiv.appendChild($imageDiv);
    $imageDiv.appendChild($brewInfoCol);
    $brewInfoCol.appendChild($brewName);
    $brewInfoCol.appendChild($brewAddress);

    return $colHalfDiv;
}
