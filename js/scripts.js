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
    return requiredKeys.every(function (key) {
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
    showDetails(pokemon);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

   function loadList() {
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);

      });
    }).catch(function (e) {
      console.error(e);
      alert("An error occured while fetching data. Please try again.");
    });
  }

   function loadDetails(item){
    let url= item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
    // Add details to item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height; 
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
      alert("Failed to load details for this Pokémon.");
    });
   }

   // Show modal and pokemon details
  function showModal (title, text, img) {
    let modalTitle = document.querySelector("#pokemonModalLabel");
    let pokemonHeight = document.querySelector("#pokemonHeight");
    let pokemonImage = document.querySelector("#pokemonImage");
    let modalContainer = document.querySelector("#modal-container");
    let closeModalButton = document.querySelector(".close-modal");
  // Set Content of Modal
    modalTitle.innerText = title;
    pokemonHeight.innerText = text;
    pokemonImage.setAttribute('src', img);

  // Show Content
    modalContainer.classList.add("is-visible");
    
  // Hide modal when clicked out of it
    modalContainer.addEventListener('click', (e) => {
     let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
       if (target === closeModalButton) {
         hideModal();
       }
     });
     document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') { // ESC key
        hideModal();
      }
    });
  }

 function hideModal() {
  let modalContainer = document.querySelector("#modal-container");
  modalContainer.classList.remove("is-visible");
}

  function showDetails(item){
    pokemonRepository.loadDetails(item).then(function() {
      showModal(
        item.name, 
        'Height: ' + item.height, 
        item.imageUrl
      );
    });
  }
  // Calling Function
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };

})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});