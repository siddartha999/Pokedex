import React from "react";
import "./PokeCard.css";
const POKE_IMG_API =
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

/**
 *The URl needs the Id's of Pokemons to be of length 3. Eg: 001, 123, 049 etc..
 * @param {*} id -> Id of the Pokemon.
 * @param {*} precision -> The length of the digits to which the Id needs to be padded.
 */
const getPaddedId = (id, precision) => {
  id = "" + id;
  while (id.length < precision) {
    id = "0" + id;
  }

  return id;
};

const PokeCard = (props) => {
  const pokemon = props.pokemon;
  const pokeID = props.id;
  const imgSrc = `${POKE_IMG_API}${getPaddedId(pokeID, 3)}.png`;
  return (
    <div className="PokeCard">
      <p className="PokeCard-title">{pokemon.name}</p>
      <img
        className="PokeCard-pokemon"
        src={imgSrc}
        alt={`Pokemon: ${pokemon.name}`}
      ></img>
      <p>Type: {pokemon.type}</p>
      <p>EXP: {pokemon.base_experience} </p>
    </div>
  );
};

export default PokeCard;
