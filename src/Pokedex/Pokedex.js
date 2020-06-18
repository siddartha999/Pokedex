import React, { useState, useRef } from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./Pokedex.css";
import PaginationOutlined from "../PaginationOutlined/PaginationOutlined";

const PAGE_POKEMON_COUNT_VALUES = [20, 50, 100];

const Pokedex = (props) => {
  const pokemonList = props.pokemonList;
  const pokemonsPerPage = useRef(20);
  const paginationCount = useRef(
    Math.ceil(pokemonList.length / pokemonsPerPage.current)
  );
  const [currentPagePokemonList, setCurrentPagePokemonList] = useState(
    pokemonList.slice(0, pokemonsPerPage.current)
  );
  const currentPageNo = useRef(1);

  const pageChanged = (pageNo) => {
    const rightEnd = pageNo * pokemonsPerPage.current;
    const leftEnd = pageNo * pokemonsPerPage.current - pokemonsPerPage.current;
    const newPokemonListPerPage = pokemonList.slice(leftEnd, rightEnd);
    setCurrentPagePokemonList(newPokemonListPerPage);
    currentPageNo.current = pageNo;
  };

  const pokemonsPerPageChanged = (count) => {
    pokemonsPerPage.current = count;
    currentPageNo.current = 1;
    const newPokemonListPerPage = pokemonList.slice(0, count);
    setCurrentPagePokemonList(newPokemonListPerPage);
    paginationCount.current = Math.ceil(pokemonList.length / count);
  };

  const pokeCardJSX = currentPagePokemonList.map((pokemon) => {
    return (
      <div className="Pokedex-PokeCard-container" key={pokemon.id}>
        <PokeCard data={pokemon} displayAdvancedStats displayExperience />
      </div>
    );
  });

  return (
    <>
      <div className="Pokedex-cards">{pokeCardJSX}</div>
      <PaginationOutlined
        count={paginationCount.current}
        pageChanged={pageChanged}
        itemsPerPage={pokemonsPerPage.current}
        menuValues={PAGE_POKEMON_COUNT_VALUES}
        itemsPerPageChanged={pokemonsPerPageChanged}
        menuTitle="Pokemons"
        includeItemsPerPage
        page={currentPageNo.current}
      />
    </>
  );
};

export default Pokedex;
