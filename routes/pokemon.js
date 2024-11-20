const express = require("express")
const pokemonController = require("../controllers/pokemon")
const pokemonStatusController = require("../controllers/pokemonStatus")
const router = express.Router()

router.get("/hello",pokemonController.saludoEntrenador)
router.post("/",pokemonController.create)
router.get("/",pokemonController.obtenerPokemon)
router.get("/:id_pokemon",pokemonController.obtenerPokemonPorIdPokemon)
router.put("/view/:id_pokemon",pokemonStatusController.avistarPokemonPorId)
router.put("/catch/:id_pokemon",pokemonStatusController.catchPokemonById)
router.put("/in_team/:id_pokemon",pokemonStatusController.inTeamPokemonById)
module.exports = router