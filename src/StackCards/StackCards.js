import React from "react";
import "./StackCards.css";
import PokeCard from "../PokeCard/PokeCard";
import pokeCardBack from "../images/pokeCardBack-2.jpg";

const StackCards = (props) => {
  const card = props.card;
  const displayFrontOfCard = props.displayFrontOfCard;

  const frontOfCardJSX = (
    <div className="StackCards-PokeCard-container">
      <PokeCard
        data={card}
        displayAdvancedStats
        displayPokemonBgImage
        statSelected={props.statSelected}
        isStatSelected={props.isStatSelected}
      />
    </div>
  );

  const backOfCardJSX = <img src={pokeCardBack} alt="poke-card-back-side" />;

  return (
    <div className="StackCards-card-container">
      {displayFrontOfCard ? frontOfCardJSX : backOfCardJSX}
    </div>
  );
};

export default StackCards;