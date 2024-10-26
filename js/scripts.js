// Shortcuts
// Shift + TAB = Unindent code blocks
// Ctrl + / = Comment out code
// IIFE to encapsulate the pokemonList array to ensure it does not get accessed by global state.
let pokemonRepository = (function () {
  pokemonList = [];

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    let requiredKeys = ['name'];
    return requiredKeys.every(function(key) {
      return key in pokemon;
    });
  }


  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name
    button.classList.add("button-class");

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', function(event) {
    showDetails(pokemon);
    });
   }
  }
  // Calling Function
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };

})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});