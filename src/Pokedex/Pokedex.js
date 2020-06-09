import React, { useState } from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./Pokedex.css";
import PaginationOutlined from "../PaginationOutlined/PaginationOutlined";

const PAGE_POKEMON_COUNT_VALUES = [20, 50, 100];

const Pokedex = (props) => {
  const pokemonList = props.pokemonList;
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const [paginationCount, setPaginationCount] = useState(
    Math.ceil(pokemonList.length / pokemonsPerPage)
  );
  const [currentPagePokemonList, setCurrentPagePokemonList] = useState(
    pokemonList.slice(0, pokemonsPerPage)
  );
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const pageChanged = (pageNo) => {
    const rightEnd = pageNo * pokemonsPerPage;
    const leftEnd = pageNo * pokemonsPerPage - pokemonsPerPage;
    const newPokemonListPerPage = pokemonList.slice(leftEnd, rightEnd);
    setCurrentPagePokemonList(newPokemonListPerPage);
    setCurrentPageNo(pageNo);
  };

  const pokemonsPerPageChanged = (count) => {
    setPokemonsPerPage(count);
    setCurrentPageNo(1);
    const newPokemonListPerPage = pokemonList.slice(0, count);
    setCurrentPagePokemonList(newPokemonListPerPage);
    setPaginationCount(Math.ceil(pokemonList.length / count));
  };

  const pokeCardJSX = currentPagePokemonList.map((pokemon) => {
    return (
      <div className="Pokedex-PokeCard-container" key={pokemon.id}>
        <PokeCard
          data={pokemon}
          displayAdvancedStats
          displayExperience
          pokemonTypeImages={props.pokemonTypeImages}
        />
      </div>
    );
  });

  return (
    <>
      <div className="Pokedex-cards">{pokeCardJSX}</div>
      <PaginationOutlined
        count={paginationCount}
        pageChanged={pageChanged}
        itemsPerPage={pokemonsPerPage}
        menuValues={PAGE_POKEMON_COUNT_VALUES}
        itemsPerPageChanged={pokemonsPerPageChanged}
        menuTitle="Pokemons"
        includeItemsPerPage
        page={currentPageNo}
      />
    </>
  );
};

export default Pokedex;
