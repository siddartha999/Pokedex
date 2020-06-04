import React, { useState, useEffect } from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./Pokedex.css";
import PaginationOutlined from "../PaginationOutlined/PaginationOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import retrievePokemonList from "../services/retrievePokemonList";

const PAGE_POKEMON_COUNT_VALUES = [20, 50, 100];

const Pokedex = (props) => {
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [paginationCount, setPaginationCount] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPagePokemonList, setCurrentPagePokemonList] = useState([]);

  useEffect(() => {
    (async () => {
      if (!pokemonList.length) {
        setIsLoading(true);
        const pokeList = await retrievePokemonList();
        setPokemonList(pokeList);
        setCurrentPagePokemonList(pokeList.slice(0, pokemonsPerPage));
        setPaginationCount(Math.ceil(pokeList.length / pokemonsPerPage));
        setIsLoading(false);
      }
    })();
  }, [pokemonList]);

  const pageChanged = (pageNo) => {
    const rightEnd = pageNo * pokemonsPerPage;
    const leftEnd = pageNo * pokemonsPerPage - pokemonsPerPage;
    const newPokemonListPerPage = pokemonList.slice(leftEnd, rightEnd);
    setCurrentPagePokemonList(newPokemonListPerPage);
  };

  const pokemonsPerPageChanged = (count) => {
    setPokemonsPerPage(count);
    const newPokemonListPerPage = pokemonList.slice(0, count);
    setCurrentPagePokemonList(newPokemonListPerPage);
    setPaginationCount(Math.ceil(pokemonList.length / count));
  };

  const loadingSpinnerJSX = (
    <CircularProgress disableShrink className="loading-spinner" />
  );

  const pokeCardJSX = currentPagePokemonList.map((pokemon) => {
    return <PokeCard data={pokemon} key={pokemon.id} />;
  });

  return (
    <>
      <div className="Pokedex-cards">
        {isLoading && loadingSpinnerJSX}
        {pokeCardJSX}
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
