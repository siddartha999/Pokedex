import React, { useState, useEffect } from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./Pokedex.css";
import axios from "axios";
import PaginationOutlined from "../PaginationOutlined/PaginationOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
const PAGE_POKEMON_COUNT_VALUES = [20, 50, 100];
const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=`;

const Pokedex = (props) => {
  const [perPagePokemonCount, setPerPagePokemonCount] = useState(20);
  const [paginationCount, setPaginationCount] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageURL, setCurrentPageURL] = useState(
    POKEMON_API_URL + perPagePokemonCount
  );

  useEffect(() => {
    (async () => {
      const retrieveData = axios.get(currentPageURL);

      await retrieveData;

      retrieveData.then((res) => {
        setPaginationCount(() =>
          Math.ceil(res.data.count / perPagePokemonCount)
        );
        setPokemonList(res.data.results);
        setIsLoading(false);
      });
    })();
  }, [currentPageURL, perPagePokemonCount]);

  const pageChanged = (pageNo) => {
    const offset = pageNo * perPagePokemonCount - perPagePokemonCount;
    setCurrentPageURL(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${perPagePokemonCount}`
    );
  };

  const loadingSpinnerJSX = <CircularProgress disableShrink />;

  return (
    <>
      <div className="Pokedex-cards">
        {isLoading && loadingSpinnerJSX}
        {pokemonList.map((pokemon) => {
          const urlSplit = pokemon.url.split("/");
          const pokeID = urlSplit[urlSplit.length - 2];
          return <PokeCard pokemon={pokemon} id={pokeID} key={pokeID} />;
        })}
      </div>
      <PaginationOutlined count={paginationCount} pageChanged={pageChanged} />
    </>
  );
};

export default Pokedex;
