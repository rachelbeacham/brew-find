var $zipInput = document.querySelector('.zip-input')

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/openbrewerydb/openbrewerydb/master/breweries.json');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log('xhr status:', xhr.status);
  console.log('xhr response:', xhr.response);
});
xhr.send();

$zipInput.addEventListener('input', renderOptions)

function renderOptions(e) {

}
