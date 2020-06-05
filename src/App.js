import React, { useState, useEffect } from "react";
import "./App.css";
import Pokedex from "./Pokedex/Pokedex";
import PokeGame from "./PokeGame/PokeGame";
import { Route, Switch } from "react-router-dom";
import NavBar from "./Navbar/Navbar";
import Compare from "./Compare/Compare";
import retrievePokemonList from "./services/retrievePokemonList";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!pokemonList.length) {
        setIsLoading(true);
        const pokeList = await retrievePokemonList();
        setPokemonList(pokeList);
        setIsLoading(false);
      }
    })();
  }, [pokemonList]);

  const loadingSpinnerJSX = (
    <CircularProgress disableShrink className="loading-spinner" />
  );

  const appBodyJSX = (
    <>
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
        <Route exact path="/compare" render={() => <Compare />} />
      </Switch>
    </>
  );

  return (
    <div className="App">{isLoading ? loadingSpinnerJSX : appBodyJSX}</div>
  );
}

export default App;
