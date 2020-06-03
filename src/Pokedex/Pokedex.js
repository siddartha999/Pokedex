import React, { useState, useEffect } from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./Pokedex.css";
import axios from "axios";
import PaginationOutlined from "../PaginationOutlined/PaginationOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
const PAGE_POKEMON_COUNT_VALUES = [20, 50, 100];
const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=`;

const Pokedex = (props) => {
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [paginationCount, setPaginationCount] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageURL, setCurrentPageURL] = useState(
    POKEMON_API_URL + pokemonsPerPage
  );

  useEffect(() => {
    (async () => {
      const retrieveData = axios.get(currentPageURL);

      await retrieveData;

      let pokemons = [];

      await retrieveData.then((res) => {
        pokemons = res.data.results;
        setPaginationCount(() => Math.ceil(res.data.count / pokemonsPerPage));
        setIsLoading(false);
      });

      const individualPokemonDetails = [];
      for (let pokemon of pokemons) {
        individualPokemonDetails.push(axios.get(pokemon.url));
      }

      Promise.all(individualPokemonDetails).then((res) => {
        const pokeList = [];
        for (let pokemon of res) {
          const urlSplit = pokemon.config.url.split("/");
          const pokeID = urlSplit[urlSplit.length - 2];
          pokeList.push(
            <PokeCard data={pokemon.data} id={pokeID} key={pokeID} />
          );
        }
        setPokemonList(pokeList);
      });
    })();
  }, [currentPageURL, pokemonsPerPage]);

  const pageChanged = (pageNo) => {
    const offset = pageNo * pokemonsPerPage - pokemonsPerPage;
    const newURL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pokemonsPerPage}`;
    setCurrentPageURL(() => newURL);
  };

  const pokemonsPerPageChanged = (count) => {
    const newURL = `${POKEMON_API_URL}${count}`;
    setCurrentPageURL(() => newURL);
    setPokemonsPerPage(count);
  };

  const loadingSpinnerJSX = <CircularProgress disableShrink />;

  return (
    <>
      <div className="Pokedex-cards">
        {isLoading && loadingSpinnerJSX}
        {pokemonList}
      </div>
      <PaginationOutlined
        count={paginationCount}
        pageChanged={pageChanged}
        itemsPerPage={pokemonsPerPage}
        menuValues={PAGE_POKEMON_COUNT_VALUES}
        itemsPerPageChanged={pokemonsPerPageChanged}
        menuTitle="Pokemons"
        includeItemsPerPage
      />
    </>
  );
};

export default Pokedex;
