const pokemon = require("../models/pokemon")
const Pokemon = require("../models/pokemon")
const {fetchPokemon} = require("../services/fetch")
exports.saludoEntrenador = async (req,res)=>{
    try {
        res.send("Hola entrenador ahora desde el controlador")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.create = async (req,res) =>{
    try {
        console.log(req.body)
        const pokemon = new Pokemon(req.body)
        await pokemon.save()
        res.status(201).json(pokemon)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.obtenerPokemon = async (req,res) =>{
    try {
        const pokemones = await Pokemon.find()
        res.status(200).json(pokemones)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.obtenerPokemonPorIdPokemon = async (req,res)=>{
    try {
        const id_pokemon = req.params.id_pokemon
        let pokemon = await Pokemon.findOne({"id_pokemon":id_pokemon})
        if(!pokemon){
            pokemon = {
                id_pokemon:id_pokemon,
                view:false,
                catch:false,
                in_team:false
            }
            const pokemonData = await fetchPokemon(id_pokemon,pokemon)
            console.log(pokemonData)
            return res.status(200).json(pokemonData)
        }
        const pokemonData = await fetchPokemon(id_pokemon,pokemon)
        if(!pokemonData){
            return res.status(404).json({message:"Pokemon not found"})
        }
        res.status(200).json(pokemonData)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

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
