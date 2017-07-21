'use strict';

var fetchOption = {
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'cors'
};

$('form').on('submit', function (e) {
  e.preventDefault();

  var types = $('input[type=text]').val().replace(/\s/g, '');
  types = types.split(',');

  var trainerTypeCalls = types.map(function (elem) {
    return fetch('http://pokeapi.co/api/v2/type/' + elem + '/', fetchOption);
  });

  Promise.all(trainerTypeCalls).then(function (data) {
    console.log(data);
  });
});