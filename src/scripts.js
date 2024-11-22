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

let container = document.getElementById('pokemon-container');

// Show skeletons
function showSkeletons(count) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    let skeleton = document.createElement('div');
    skeleton.classList.add('skeleton-card');
    skeleton.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
    `;
    container.appendChild(skeleton);
  }
}

// Fetch Pokémon and replace skeletons
function fetchPokemon() {
  showSkeletons(10); // Show 10 skeleton placeholders

  let url = 'https://pokeapi.co/api/v2/pokemon?limit=10';
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      container.innerHTML = ''; // Clear skeletons

      data.results.forEach(function (pokemon) {
        let id = pokemon.url.split('/')[6]; // Extract Pokémon ID
        let card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `
          <h2>${pokemon.name}</h2>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${pokemon.name}" />
        `;
        container.appendChild(card);
      });
    })
    .catch(function (error) {
      console.error('Error fetching Pokémon:', error);
    });
}

fetchPokemon();

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
        item.types = details.types;
      })

      .catch(function (e) {
        console.error(e);
        alert("Failed to load details for this Pokémon.");
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      // Set content
      document.querySelector("#pokemonModalLabel").innerText = pokemon.name;
      document.querySelector("#pokemonHeight").innerText =
        "Height: " + pokemon.height + "m";
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
