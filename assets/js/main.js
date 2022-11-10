const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonDetailDiv = document.getElementById('pokemonDetail');

const limit = 12;
let offset = 0;
const maxPokemons = 151

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="showDetails(this.id)" id="${pokemon.number}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="basic-info">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" 
        alt="${pokemon.name}">
        </div>
        
    </li>
    `;
}

function getHtmlPokemonDetail(pokemonDetail){

        return `<div class="details ${pokemonDetail.type}" onclick="showDetails(this.id)" id="${pokemonDetail.number}">
                    <div class="detailsHeader" >
                        <div class="detailHeaderContent">
                            <div class="pokemon"> 
                                <span class="detName">${pokemonDetail.name}</span>
                                <div class="basic-info">
                                    <ol class="types">
                                        ${pokemonDetail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                    </ol>
                                    
                                </div>
                            </div>
                            <span class="number">#${pokemonDetail.number}</span>
                        </div>
                        
                        <img src="${pokemonDetail.photo}" 
                        alt="${pokemonDetail.name}">
                        
                    </div>
                    <div class="content-details">
                    species: ${pokemonDetail.species} <br>
                    height: ${pokemonDetail.height} <br>
                    weight: ${pokemonDetail.weight} <br>
                    abilities: <br>
                    <ol>
                        ${pokemonDetail.abilities.map((ability) => `<li class="type ${ability}">${ability}</li>`).join('')}
                    </ol>
                    </div>
                </div>`
        
        
        
        {/* `<div class="pokemon ${pokemonDetail.type}" onclick="showDetails(this.id)" id="${pokemonDetail.number}">
                <span class="number">#${pokemonDetail.number}</span>
                <span class="name">${pokemonDetail.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemonDetail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemonDetail.photo}" 
                alt="${pokemonDetail.name}">
                </div>
            </div>
        `; */}
}

function showDetails(id) {

    if (pokemonDetailDiv.style.visibility == "visible") {
        pokemonDetailDiv.style.visibility = "hidden"
    } else {
        const pokemonDetailContent = document.getElementById('pokemonDetail');

        poke_api.getPokemonDetailById(id).then((pokemonDetail) => {
            
            pokemonDetailContent.innerHTML = getHtmlPokemonDetail(pokemonDetail);
            pokemonDetailDiv.style.visibility = "visible"

        })

        
    }
    

}

function loadPokemons(offset, limit) {

    poke_api.getPokemons(offset, limit)
        .then((pokemons = []) => {
            pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');}
        )
        .catch((error) => console.error(error))
}

loadPokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset = offset + limit;

    if (offset + limit >= maxPokemons) {
        loadMoreButton.parentElement.removeChild(loadMoreButton)
        const newLimit = maxPokemons - offset
        loadPokemons(offset, newLimit);
    }else {
        loadPokemons(offset, limit);
    }

    
})


