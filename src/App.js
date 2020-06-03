import React from "react";
import "./App.css";
import Pokedex from "./Pokedex/Pokedex";
import PokeGame from "./PokeGame/PokeGame";
import { Route, Switch } from "react-router-dom";
import NavBar from "./Navbar/Navbar";

function App() {
  const pokemonList = [
    { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
    { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
    { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
    { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
    { id: 25, name: "Pikachu", type: "electric", base_experience: 112 },
    { id: 39, name: "Jigglypuff", type: "normal", base_experience: 95 },
    { id: 94, name: "Gengar", type: "poison", base_experience: 225 },
    { id: 133, name: "Eevee", type: "normal", base_experience: 65 },
  ];

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Pokedex pokemonList={pokemonList} />}
        />
        <Route
          exact
          path="/pokegame"
          render={() => <PokeGame pokemonList={pokemonList} />}
        />
      </Switch>
    </div>
  );
}

export default App;
