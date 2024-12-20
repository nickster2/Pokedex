// Shortcuts
// Shift + TAB = Unindent code blocks
// Ctrl + / = Comment out code
// IIFE to encapsulate the pokemonList array to ensure it does not get accessed by global state.
let pokemonRepository = (function () {
  pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Grabs Pokemon
  function getAll() {
    return pokemonList;
  }

  // Adds new Pokemon to function
  function add(pokemon) {
    if (isValidPokemon(pokemon)) {
      pokemonList.push(pokemon);
    } else {
      console.log("Not Valid Pokemon!");
    }
  }
  // Function checks if Pokemon objects have the correct attributes (keys)
  function isValidPokemon(pokemon) {
    let requiredKeys = ["name"];
    return requiredKeys.every(function (key) {
      return key in pokemon;
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.classList = "list-group-item";

    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#myModal");
    button.classList = "btn btn-secondary btn-sm btn-block";

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
        alert("An error occured while fetching data. Please try again.");
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Add details to item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map(typeObj => typeObj.type.name); // Extract names from API
      })
        .catch(function (e) {
        console.error(e);
        alert("Failed to load details for this Pokémon.");
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      // Set content
      let heightText = "Height: " + pokemon.height + "m"; // Height in meters
      let weightText = "Weight: " + pokemon.weight + "kg"; // Weight in kilograms
      let typesText = "Type(s): " + pokemon.types.join(", ") // Types seperated with commas in a list
      document.querySelector("#pokemonModalLabel").innerText = pokemon.name;
      document.querySelector("#pokemonHeight").innerText = heightText;
      document.querySelector("#pokemonWeight").innerText = weightText;
      document.querySelector("#pokemonTypes").innerText = typesText;
      document
        .querySelector("#pokemonImage")
        .setAttribute("src", pokemon.imageUrl);

      // Show the modal using Bootstrap
      $("#pokemonModal").modal("show");
    });
  }
  
  $(document).ready(function() {
    $('#pokemonModal').on('click', function (e) {
        // Close the modal if the click was on the backdrop (outside the modal content)
        if ($(e.target).hasClass('modal-backdrop')) {
            $('#pokemonModal').modal('hide');
        }
    });
});
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
