
const Pokemon = require("../models/pokemon")

exports.avistarPokemonPorId = async (req,res) =>{
    try {
        const id_pokemon = req.params.id_pokemon
        const pokemon_status = req.body.catch
        if(pokemon_status){
            return res.status(400).json({message:"Bad pokemon status"})
        }
        const pokemonNew = {
            id_pokemon:id_pokemon,
            view:true,
            catch:false,
            in_team:false
        }
        const filter ={id_pokemon:id_pokemon}
        const pokemon = await Pokemon.findOneAndReplace(filter,pokemonNew,{new:true})
        if(!pokemon){
            return res.status(404).json({message:"Pokemon no encontrado"})
        }
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.catchPokemonById = async (req,res)=>{
    try {
        const id_pokemon = req.params.id_pokemon
        const pokemonStatusView = req.body.view
        const pokemosStatusInTeam = req.body.in_team
        if(pokemosStatusInTeam){
            return res.status(400).json({message:"Bad pokemon status, pokemon in team"})
        }
        if(!pokemonStatusView){
            const pokemonNew = {
                id_pokemon:id_pokemon,
                view:true,
                catch:true,
                in_team:false
            }
            const filter = {id_pokemon:id_pokemon}
            const pokemon = await Pokemon.findOneAndReplace(filter,pokemonNew,{new:true})
            if(!pokemon){
                return res.status(404).json({message:"Pokemon no encontrado"})
            }
            res.status(200).json(pokemon)
        }else{
            return res.status(400).json({message:"Bad pokemon status"})
        }

    } catch (error) {
        res.status(500).json({error:error.message})
    }

}

exports.inTeamPokemonById = async (req,res)=>{
    try {
        const id_pokemon = req.params.id_pokemon
        const pokemonStatusView = req.body.view
        const pokemonStatusCatch = req.body.catch
        const pokemonStatusInTeam = req.body.in_team
        if(pokemonStatusCatch && pokemonStatusView){
            const pokemonNew = {
                id_pokemon:id_pokemon,
                view:true,
                catch:true,
                in_team:!pokemonStatusInTeam
            }
            const filter ={id_pokemon:id_pokemon}
            const pokemon = await Pokemon.findOne(filter)
            if(!pokemon){
                return res.status(404).json({message:"Pokemon no encontrado"})
            }
            if(pokemon.in_team == pokemonStatusInTeam){
                pokemon.in_team = !pokemonStatusInTeam
                await pokemon.save()
                res.status(200).json(pokemon)
            }else{
                return res.status(400).json({message:"Bad pokemon status"})
            }
        }else{
                return res.status(400).json({message:"Bad pokemon status"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }   
}
