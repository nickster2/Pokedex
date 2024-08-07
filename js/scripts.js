// IIFE to encapsulate the pokemonList array to ensure it does not get accessed by global state.
let pokemonRepository = (function () {
  pokemonList = [
    {
      name: 'Bulbasaur',
      height: 2.04,
      type: ['grass', 'poison']
    },
    {
      name: 'Ivysaur',
      height: 3.03,
      type: ['grass', 'poison']
    },
    {
      name: 'Venusaur',
      height: 6.07,
      type: ['grass', 'poison'],
    },
    {
      name: 'Charmander',
      height: 2.00,
      type: ['fire'],
    },
    {
      name: 'Charmeleon',
      height: 3.07,
      type: ['fire'],
    },
    {
      name: 'Charizard',
      height: 5.07,
      type: ['fire', 'flying'],
    },

    {
      name: 'Squirtle',
      height: 1.08,
      type: ['water']
    },
    {
      name: 'Wartortle',
      height: 3.03,
      type: ['water']
    },
    {
      name: 'Blastoise',
      height: 5.03,
      type: ['water'],
    },
    {
      name: 'Caterpie',
      height: 1.00,
      type: ['bug'],
    },
    {
      name: 'Metapod',
      height: 2.04,
      type: ['bug'],
    },
    {
      name: 'Butterfree',
      height: 3.07,
      type: ['bug', 'flying']
    },
  ];


  // Grabs Pokemon
  function getAll() {
    return pokemonList;
  }

  // Adds new Pokemon to function
  function add(pokemon) {
    if (isValidPokemon(pokemon)) {
      pokemonList.push(pokemon);
    }
     else {
      console.log("Not Valid Pokemon!");
    }
  }
  // Function checks if Pokemon objects have the correct attributes (keys)
  function isValidPokemon(pokemon) {
    let requiredKeys = ['name', 'height', 'type'];
    return requiredKeys.every(function(key) {
      return key in pokemon;
    });
  }

  function showDetails(pokemon) {
    document.write("<p>" + pokemon.name + " (Height: " + pokemon.height + ")</p>");
    if (pokemon.height > 6) {
      document.write("<p> That is a big pokemon! </p>");
    }
    else if  (pokemon.height >= 3 && pokemon.height <=6) {
      document.write("<p> That is an average pokemon. </p>")
    }
    else {
      document.write("<p> That is a tiny pokemon!</p>");
    }
  }


  pokemonList.forEach (function (pokemon) {
    showDetails(pokemon);
  });

  // Calling Function
  return {
    getAll: getAll,
    add: add
  };

})();
pokemonRepository.getAll();
pokemonRepository.add({ name: 'Pikachu', height: 1.04, type: ['electric'] });
