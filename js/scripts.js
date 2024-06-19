  let pokemonList = [
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
  // Update list as you increase pokedex
];

  // For Loop of PokemonList
for (let i = 0; i < pokemonList.length; i++)
  {
    let pokemon = pokemonList[i];

  // List Pokemon with Name and Height attribute
    document.write(pokemon.name + ' (Height): ' + pokemon.height);

  // Highlight if the Pokemon is small, average, or large
  if (pokemon.height >= 6) 
    document.write(' That is a big Pokemon! ' + '<p>');
  
  else if (pokemon.height >= 3 && pokemon.height < 6) 
    document.write(' That is an average Pokemon. ' + '<p>');
  
  else 
    document.write(' That is a tiny Pokemon! ' + '<p>');
}