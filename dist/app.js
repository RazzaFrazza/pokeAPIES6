'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fetchOptions = {
	headers: {
		'Content-Type': 'application/json'
	},
	mode: 'cors'
};
$('form').on('submit', function (e) {
	e.preventDefault();

	var types = $('input[type=text]').val().replace(/\s/g, '');
	types = types.split(',');
	console.log(types);

	var trainerTypeCalls = types.map(function (elem) {
		return fetch('http://pokeapi.co/api/v2/type/' + elem + '/', fetchOptions);
	});

	getPromiseData(trainerTypeCalls).then(function (res) {
		console.log(res);
		getDoubleDamagePokemon(res);
	});
});

function getPromiseData(promises) {
	return new Promise(function (resolve, reject) {
		Promise.all(promises).then(function (res) {
			return res.map(function (type) {
				return type.json();
			});
		}).then(function (res) {
			Promise.all(res).then(resolve);
		}).catch(reject);
	});
}

function getDoubleDamagePokemon(types) {
	var doubleDamage = types.map(function (type) {
		return type.damage_relations.double_damage_from;
	}).reduce(flatten, []).map(function (type) {
		return fetch(type.url, fetchOptions);
	});

	getPromiseData(doubleDamage).then(function (pokemon) {
		pokemon = pokemon.map(function (poke) {
			return poke.pokemon;
		}).reduce(flatten, []).map(function (poke) {
			return poke.pokemon;
		});

		buildPokemon(pokemon);
	});
}

function buildPokemon(ogPokemon) {
	var team = [];
	console.log(ogPokemon);
	for (var i = 0; i < 6; i++) {
		team.push(getRandomPokemon(ogPokemon));
	}
	var teamCalls = team.map(function (pokemon) {
		return fetch(pokemon.url, fetchOptions);
	});

	getPromiseData(teamCalls).then(function (res) {
		displayPokemon(res);
	});
}

// A function to return a random pokemon
function getRandomPokemon(pokemonArray) {
	//using Math.floor and Math.random we can return a random pokemon
	var randomIndex = Math.floor(Math.random() * pokemonArray.length);
	// Return just the pokemon!
	return pokemonArray[randomIndex];
}

function displayPokemon(pokemon) {
	// loop through and display the pokemon!
	pokemon.forEach(function (poke) {
		var $container = $('<div>').addClass('pokemon');
		var $image = $('<img>').attr('src', 'http://pokeapi.co/media/img/' + poke.id + '.png');
		var $title = $('<h2>').text(poke.name);
		$container.append($image, $title);
		$('.poke-container').append($container);
	});
}

var flatten = function flatten(a, b) {
	return [].concat(_toConsumableArray(a), _toConsumableArray(b));
};