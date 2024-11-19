const pokemon = require("../models/pokemon")
const Pokemon = require("../models/pokemon")

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
        const pokemon = await Pokemon.findOne({"id_pokemon":id_pokemon})
        if(!pokemon){
            return res.status(404).json({"message":"Pokemon no encontrado"})
        }
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

exports.avistarPokemonPorId = async (req,res) =>{
    try {
        const id_pokemon = req.params.id_pokemon
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