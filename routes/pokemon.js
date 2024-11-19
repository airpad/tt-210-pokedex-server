const express = require("express")
const pokemonController = require("../controllers/pokemon")
const router = express.Router()

router.get("/hello",pokemonController.saludoEntrenador)
router.post("/",pokemonController.create)
router.get("/",pokemonController.obtenerPokemon)
router.get("/:id_pokemon",pokemonController.obtenerPokemonPorIdPokemon)
router.put("/view/:id_pokemon",pokemonController.avistarPokemonPorId)
module.exports = router