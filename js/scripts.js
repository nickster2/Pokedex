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
   function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailslUrl: item.url
        };
        add(pokemon);
        // console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
      alert("An error occured while fetching data. Please try again.");
    });
   }

   function loadDetails(item){
    let url= item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
    //Add details to item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height; 
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
      alert("Failed to load details for this Pokémon.");
    });
   }

  function showDetails(item){
    pokemonRepository.loadDetails(item).then(function() {
    console.log(item);
    });
  }
  // Calling Function
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});