var $inputForm = document.querySelector('.city-input-form')
var $cityInput = document.querySelector('.city-input')
var $optionRow = document.querySelector('.option-row')
var $dataViews = document.querySelectorAll('.data-view')


$inputForm.addEventListener('submit', formSubmitted);

function formSubmitted(e) {
  var brewArray = [];
  e.preventDefault();
  data.location = $cityInput.value
  data.view = 'brewery-options';
  viewSwapping(data);
  $inputForm.reset();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.openbrewerydb.org/breweries?by_city=' + data.location, true);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    brewArray = xhr.response;
    // brewArray is filled with correct data
    console.log('brewArray:', brewArray);
    console.log($dataViews[1])
    for (var i = 0; i < brewArray.length; i++) {
      $dataViews[1].appendChild(renderOptions(data))
    }

  });
  //brewArray is now empty
  console.log(brewArray)
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
    var $rowDiv = document.createElement('div');
    $rowDiv.className = 'row';

    var $resultsCol = document.createElement('div');
    $resultsCol.className = 'col results text-center';

    var $resultsText = document.createElement('h3');
    $resultsText.textContent = 'Results in ' + data.location;

    var $colHalfDiv = document.createElement('div');
    $colHalfDiv.className = 'col-half';

    var $imageDiv = document.createElement('div');
    $imageDiv.className = 'image-div';

    var $brewInfoCol = document.createElement('div');
    $brewInfoCol.className = 'column brew-info text-center';

    var $brewName = document.createElement('p');
    $brewName.textContent = brewArray[i].name;

    var $brewAddress = document.createElement('p');
    $brewAddress.textContent = brewArray[i].street + ', ' + brewArray[i].city + ' ' + brewArray[i].state + ' ' + brewArray[i].postal_code

    var $addToFavorites = document.createElement('p');
    $addToFavorites.textContent = 'Add to favorites';
    $addToFavorites.className = 'add-to-favorites-link';

    $rowDiv.appendChild($resultsCol);
    $resultsCol.appendChild($resultsText);
    $rowDiv.appendChild($colHalfDiv)
    $colHalfDiv.appendChild($imageDiv);
    $imageDiv.appendChild($brewInfoCol);
    $brewInfoCol.appendChild($brewName);
    $brewInfoCol.appendChild($brewAddress);
    $brewInfoCol.appendChild($addToFavorites);
    //not showing up
    console.log($rowDiv);
    return $rowDiv;
}
