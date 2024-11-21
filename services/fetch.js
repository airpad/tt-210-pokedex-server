exports.fetchPokemon = async (id_pokemon,pokemonStatus)=>{

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id_pokemon}`)
        const pokemon = await response.json()
        pokemonData ={ 
            id_pokemon:pokemonStatus.id_pokemon,
            view:pokemonStatus.view,
            catch:pokemonStatus.catch,
            inTeam:pokemonStatus.in_team,
            name:pokemon.name,
            image:pokemon.sprites.front_default,
            height:pokemon.height,
            weight:pokemon.weight,
            types:pokemon.types.map(p=>p.type.name).join(", ")
        }
        return pokemonData
    } catch (error) {
        return error
    }

}