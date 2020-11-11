var $inputForm = document.querySelector('.city-input-form');
var $cityInput = document.querySelector('.city-input');
var $dataViews = document.querySelectorAll('.data-view');
var $resultsText = document.querySelector('.results-text');
var $optionList = document.querySelector('.option-list');

$inputForm.addEventListener('submit', formSubmitted);

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
      $optionList.appendChild(renderOptions(data.brewArray[i]))
    }
  });
  xhr.send();
}

function viewSwapping(data) {
   if (data.view === 'welcome') {
     $dataViews[0].className = 'data-view';
     $dataViews[1].className = 'data-view hidden'
   }
   if (data.view === 'brewery-options') {
    $dataViews[0].className = 'data-view hidden';
    $dataViews[1].className = 'data-view';
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

    var $brewAddress = document.createElement('p');
    $brewAddress.textContent = data.street + ', ' + data.city + ' ' + data.state + ' ' + data.postal_code;

    var $addToFavorites = document.createElement('p');
    $addToFavorites.textContent = 'Add to favorites';
    $addToFavorites.className = 'add-favorites-link';

    $colHalfDiv.appendChild($imageDiv);
    $imageDiv.appendChild($brewInfoCol);
    $brewInfoCol.appendChild($brewName);
    $brewInfoCol.appendChild($brewAddress);
    $brewInfoCol.appendChild($addToFavorites);

    return $colHalfDiv;
}
