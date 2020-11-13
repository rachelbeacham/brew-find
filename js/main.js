var $inputForm = document.querySelector('.city-input-form');
var $cityInput = document.querySelector('.city-input');
var $dataViews = document.querySelectorAll('.data-view');
var $optionList = document.querySelector('.option-list');
var $selectedBreweryName = document.querySelector('.selected-brewery-name');
var $selectedBreweryAddress = document.querySelector('.selected-brewery-address');
var $selectedBreweryWebsite = document.querySelector('.selected-brewery-website');
var $selectedBreweryPhone = document.querySelector('.selected-brewery-phone');
var $footerSearch = document.querySelector('.footer-search');
var $footerStar = document.querySelector('.footer-star');
var $favoritesButton = document.querySelector('.favorites-button');
var $reviewButton = document.querySelector('.review-button')
var $backButton = document.querySelector('.back-button');
var $headerName = document.querySelector('.header-name');
var $favoritesList = document.querySelector('.favorites-list');
var $reviewForm = document.querySelector('.review-form');
var $reviewerName = document.querySelector('#name');
var $reviewText = document.querySelector('#review');
var $numberOfReviews = document.querySelector('.number-of-reviews');

$inputForm.addEventListener('submit', formSubmitted);

$reviewForm.addEventListener('submit', function (e){
  e.preventDefault();
  data.selected.numberOfReviews++
  var newReview = {
    person: $reviewerName.value,
    reviewText: $reviewText.value,
    breweryReviewed: data.selected.name
  };
  data.reviews.push(newReview);
  data.view = 'brewery-details'
  viewSwapping(data);
})

$optionList.addEventListener('click', optionSelected);

$favoritesList.addEventListener ('click', optionSelected);

$footerSearch.addEventListener('click', function() {
  data.view = 'welcome';
  data.brewArray = [];
  data.location = "";
  $optionList.innerHTML = '';
  viewSwapping(data);
});

$favoritesButton.addEventListener('click', function(){
  if ($favoritesButton.textContent === 'Add to favorites') {
    addToFavorites();
  } else {
    removeFromFavorites();
  }
});

$reviewButton.addEventListener('click', function(){
  data.view = 'review-form';
  viewSwapping(data);
  console.log(data.selected.name)
})

$backButton.addEventListener('click', function() {
  data.view = 'brewery-options';
  viewSwapping(data);

});

window.addEventListener('beforeunload', function () {
  var favoritesJson = JSON.stringify(data.favorites);
  localStorage.setItem('favorites', favoritesJson);
});

document.addEventListener('DOMContentLoaded', function () {
  var favoritesData = localStorage.getItem('favorites');
  if (favoritesData !== null) {
    data.favorites = JSON.parse(favoritesData);
  }
});

$footerStar.addEventListener('click', function(){
  data.view = 'favorites';
  viewSwapping(data);
})

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
      $numberOfReviews.textContent = data.selected.numberOfReviews + ' Reviews'
    }
  }
  for (var j = 0; j < data.favorites.length; j++) {
    if (data.favorites[j].name === data.selected.name) {
      data.selected.favorited = true;
      $favoritesButton.textContent = 'Remove from favorites';
      $favoritesButton.className = 'favorites-button added';
      $selectedBreweryName.textContent = data.favorites[j].name;
      $selectedBreweryAddress.textContent = data.favorites[j].address;
      $selectedBreweryWebsite.textContent = data.favorites[j].website;
      $selectedBreweryPhone.textContent = data.favorites[j].phone;
    } else {
      data.selected.favorited = false;
    }
  }
  viewSwapping(data);
  }
}

function addToFavorites() {
  $favoritesButton.textContent = 'Remove from favorites';
  $favoritesButton.className = 'favorites-button added';
  var newFavorite = {};
  newFavorite.name = $selectedBreweryName.textContent;
  newFavorite.address = $selectedBreweryAddress.textContent;
  newFavorite.website = $selectedBreweryWebsite.textContent;
  newFavorite.phone = $selectedBreweryPhone.textContent;
  data.favorites.push(newFavorite);
}

function removeFromFavorites() {
  $favoritesButton.textContent = 'Add to favorites';
  $favoritesButton.className = 'favorites-button';
  for (var i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i].name === data.selected.name) {
      data.favorites.splice(i, 1);
      data.selected.favorited = false;
    }
  }
}
/*
function viewSwapping(data) {
   if (data.view === 'welcome') {
     $headerName.textContent = 'Brew Find';
     $dataViews[0].className = 'data-view';
     $dataViews[1].className = 'data-view hidden';
     $dataViews[2].className = 'data-view hidden';
     $dataViews[3].className = 'data-view hidden';
     $dataViews[4].className = 'data-view hidden';
   }
   if (data.view === 'brewery-options') {
    $headerName.textContent = 'Breweries in '+ data.location;
    $dataViews[0].className = 'data-view hidden';
    $dataViews[1].className = 'data-view';
    $dataViews[2].className = 'data-view hidden';
    $dataViews[3].className = 'data-view hidden';
    $dataViews[4].className = 'data-view hidden';
   }
  if (data.view === 'brewery-details') {
    $headerName.textContent = 'Brew Find';
    $dataViews[0].className = 'data-view hidden';
    $dataViews[1].className = 'data-view hidden';
    $dataViews[2].className = 'data-view';
    $dataViews[3].className = 'data-view hidden'
    $dataViews[4].className = 'data-view hidden';
  }
  if (data.view === 'favorites') {
    $headerName.textContent = 'Favorites';
    $favoritesList.innerHTML = '';
    $dataViews[0].className = 'data-view hidden';
    $dataViews[1].className = 'data-view hidden';
    $dataViews[2].className = 'data-view hidden';
    $dataViews[3].className = 'data-view';
    $dataViews[4].className = 'data-view hidden';
    for (var i = 0; i < data.favorites.length; i++) {
      $favoritesList.appendChild(renderFavorites(data.favorites[i]))
    }
  }
  if (data.view === 'review-form') {
    $dataViews[0].className = 'data-view hidden';
    $dataViews[1].className = 'data-view hidden';
    $dataViews[2].className = 'data-view hidden';
    $dataViews[3].className = 'data-view hidden';
    $dataViews[4].className = 'data-view';
  }
}
*/

function viewSwapping(data) {
  var view = data.view;
  for (var i = 0; i < $dataViews.length; i++) {
    $dataViews[i].className = 'data-view hidden';
    if (view === $dataViews[i].getAttribute('data-view')) {
      $dataViews[i].className = 'data-view';
      if ($dataViews[i].getAttribute('data-view') === 'favorites') {
      $headerName.textContent = 'Favorites';
      $favoritesList.innerHTML = '';
      for (var i = 0; i < data.favorites.length; i++) {
        $favoritesList.appendChild(renderFavorites(data.favorites[i]))
        }
      } else if ($dataViews[i].getAttribute('data-view') === 'brewery-options') {
        $headerName.textContent = 'Breweries in ' + data.location;
      } else {
        $headerName.textContent = 'Brew Find';
        }
      }
    }
  }
function renderOptions(data) {
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

function renderFavorites(data) {
  var $favorieColHalfDiv = document.createElement('div');
  $favorieColHalfDiv.className = 'col-half';

  var $favoriteImageDiv = document.createElement('div');
  $favoriteImageDiv.className = 'image-div';

  var $favoriteBrewInfoCol = document.createElement('div');
  $favoriteBrewInfoCol.className = 'column brew-info text-center';

  var $favoriteBrewName = document.createElement('p');
  $favoriteBrewName.textContent = data.name;
  $favoriteBrewName.className = 'brewName';

  var $favoriteBrewAddress = document.createElement('p');
  $favoriteBrewAddress.textContent = data.address
  $favoriteBrewAddress.className = 'brewAddress';

  $favorieColHalfDiv.appendChild($favoriteImageDiv);
  $favoriteImageDiv.appendChild($favoriteBrewInfoCol);
  $favoriteBrewInfoCol.appendChild($favoriteBrewName);
  $favoriteBrewInfoCol.appendChild($favoriteBrewAddress);

  return $favorieColHalfDiv;
}
