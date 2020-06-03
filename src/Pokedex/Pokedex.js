import React, { useState } from "react";
import PokeCard from "../PokeCard/PokeCard";
import "./Pokedex.css";
import axios from "axios";
import PaginationOutlined from "../PaginationOutlined/PaginationOutlined";
const PAGE_POKEMON_COUNT_VALUES = [20, 50, 100];

const Pokedex = (props) => {
  const [perPagePokemonCount, setPerPagePokemonCount] = useState(20);
  const [currentPageURL, setCurrentPageURL] = useState("");
  const [paginationCount, setPaginationCount] = useState(0);
  const renderList = () => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${perPagePokemonCount}`
      )
      .then((res) => {
        console.log(res.data);
        setPaginationCount(Math.ceil(res.data.count / perPagePokemonCount));
      });
  };
  renderList();
  return (
    <>
      <div className="Pokedex-cards">
        {props.pokemonList.map((pokemon) => (
          <PokeCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
      <PaginationOutlined count={paginationCount} />
    </>
  );
};

export default Pokedex;
