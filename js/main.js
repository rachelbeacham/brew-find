var $inputForm = document.querySelector('.city-input-form')
var $cityInput = document.querySelector('.city-input')
var $optionRow = document.querySelector('.option-row')
var $dataViews = document.querySelectorAll('.data-view')
var dataArray = [];

$inputForm.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  data.location = $cityInput.value
  $inputForm.reset();
  viewSwapping('brewery-options');
}

function viewSwapping(currentValue) {
   if (currentValue === 'welcome') {
     $dataViews[0].className = 'data-view';
     $dataViews[1].className = 'data-view hidden'
   }
   if (currentValue === 'brewery-options') {
     $dataViews[0].className = 'data-view hidden'
     $dataViews[1].classList = 'data-view'
     renderOptions();
   }
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.openbrewerydb.org/breweries?by_city=' + data.location);
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  dataArray = xhr.response;
  console.log('dataArray:', dataArray);
});
xhr.send();

function renderOptions(data) {
  var $colHalfDiv = document.createElement('div');
  $colHalfDiv.className = 'col-half';

  var $imageDiv = document.createElement('div');
  $imageDiv.className = 'image-div';

  var $brewInfoCol = document.createElement('div');
  $brewInfoCol.className = 'column brew-info text-center';

  var $brewName = document.createElement('p');
  $brewName.textContent = dataArray[i].name;

  var $brewAddress = document.createElement('p');
  $brewAddress.textContent = dataArray[i].street + ', ' + dataArray[i].city + ' ' + dataArray[i].state + ' ' + dataArray[i].postal_code

  var $addToFavorites = document.createElement('p');
  $addToFavorites.textContent = 'Add to favorites';
  $addToFavorites.className = 'add-to-favorites-link';


  $colHalfDiv.appendChild($imageDiv);
  $imageDiv.appendChild($brewInfoCol);
  $brewInfoCol.appendChild($brewName);
  $brewInfoCol.appendChild($brewAddress);
  $brewInfoCol.appendChild($addToFavorites);

  return $colHalfDiv;
  }
