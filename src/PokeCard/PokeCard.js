import React from "react";
import "./PokeCard.css";
const POKE_IMG_API = "https://pokeres.bastionbot.org/images/pokemon/";

const PokeCard = (props) => {
  const name = props.data.name;
  const exp = props.data.base_experience;
  let type = "normal";
  if (props.data.types && props.data.types.length) {
    type = props.data.types[0].type.name;
  }
  const height = props.data.height;
  const weight = props.data.weight;
  const pokeID = props.id;
  const imgSrc = `${POKE_IMG_API}${pokeID}.png`;
  return (
    <div className={`PokeCard ${type}`}>
      <p className="PokeCard-title">{name}</p>
      <img
        className="PokeCard-pokemon"
        src={imgSrc}
        alt={`Pokemon: ${name}`}
      ></img>
      <p>Type: {type}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <p>Experience: {exp} </p>
    </div>
  );
};

export default PokeCard;
