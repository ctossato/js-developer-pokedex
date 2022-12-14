const poke_api = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.type = type
    pokemon.types = types

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

poke_api.getPokemon = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)

}

poke_api.getPokemons = (offset = 0, limit = 10) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(poke_api.getPokemon))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))

}

poke_api.getPokemonDetailById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => {
            const pokemonDetails =  new PokemonDetails();
            pokemonDetails.number = id;
            pokemonDetails.name = jsonBody.name;
            pokemonDetails.height = jsonBody.height;
            pokemonDetails.species = jsonBody.species.name;
            pokemonDetails.weight = jsonBody.weight;
            pokemonDetails.photo = jsonBody.sprites.other.dream_world.front_default

            const types = jsonBody.types.map((typeSlot) => typeSlot.type.name)
            const [type] = types
            pokemonDetails.type = type
            pokemonDetails.types = types

            pokemonDetails.abilities = jsonBody.abilities.map((abilitySlot) => abilitySlot.ability.name)            
            return pokemonDetails
        })
        .catch((error) => console.error(error))
}