const express = require("express")
const pokemonController = require("../controllers/pokemon")
const router = express.Router()

router.get("/hello",pokemonController.saludoEntrenador)
router.post("/",pokemonController.create)
router.get("/",pokemonController.obtenerPokemon)
router.get("/:id_pokemon",pokemonController.obtenerPokemonPorIdPokemon)
router.put("/view/:id_pokemon",pokemonController.avistarPokemonPorId)
router.put("/catch/:id_pokemon",pokemonController.catchPokemonById)
router.put("/in_team/:id_pokemon",pokemonController.inTeamPokemonById)
module.exports = router