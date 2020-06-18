import React, { useContext } from "react";
import "./PokeCard.css";
import retrievePokemonImage from "../services/retrievePokemonImage";
import PokemonAdvancedStats from "../PokemonAdvancedStats/PokemonAdvancedStats";
import { pokemonTypeImageListContext } from "../services/contextInitializers";

const PokeCard = (props) => {
  const name = props.data.name;
  const exp = props.data.experience;
  const types = props.data.types;
  const height = props.data.height;
  const weight = props.data.weight;
  const pokeID = props.data.id;
  const imgSrc = retrievePokemonImage(pokeID);
  const displayAdvancedStats = props.displayAdvancedStats;
  const displayExperienceStat = props.displayExperience;
  const displayPokemonBgImage = props.displayPokemonBgImage;
  const pokeCardStyle = {};
  const pokemonTypeImageList = useContext(pokemonTypeImageListContext);

  const pokemonTypeImages = () => {
    const images = [];
    for (let type of types) {
      images.push(pokemonTypeImageList.get(type.type.name));
    }
    return images;
  };

  if (displayPokemonBgImage) {
    pokeCardStyle["backgroundImage"] = `url(${imgSrc})`;
    pokeCardStyle["backgroundRepeat"] = "no-repeat";
    pokeCardStyle["backgroundSize"] = "cover";
  }

  const imgJSX = (
    <div className="PokeCard-pokemon-image-container">
      <img
        className="PokeCard-pokemon-image"
        src={imgSrc}
        alt={`${name}`}
      ></img>
    </div>
  );

  let advancedStatsJSX;
  if (displayAdvancedStats) {
    advancedStatsJSX = <PokemonAdvancedStats stats={props.data.stats} />;
  }

  const experienceStatJSX = (
    <div className="PokeCard-experience-container">
      <p>Experience: {exp} </p>
    </div>
  );

  return (
    <>
      {!displayPokemonBgImage && imgJSX}
      <div className={`PokeCard `} style={pokeCardStyle}>
        <div className="PokeCard-details-container">
          <div className="PokeCard-title-container">
            <p className="PokeCard-title">{name}</p>
          </div>
          <div className="PokeCard-pokemon-basic-details-container">
            <div className="PokeCard-pokemon-weight-container PokeCard-pokemon-basic-detail-container">
              <p className="PokeCard-pokemon-basic-detail">{weight}</p>
              <p className="PokeCard-pokemon-details-text">Weight</p>
            </div>
            <div className="PokeCard-pokemon-type-container PokeCard-pokemon-basic-detail-container">
              <div className="PokeCard-pokemon-type-image-container">
                {pokemonTypeImages().map((imageSrc) => (
                  <img
                    src={imageSrc}
                    alt={`pokemon`}
                    className="PokeCard-pokemon-type-image"
                    key={imageSrc}
                  />
                ))}
              </div>
              <div className="PokeCard-pokemon-type-text-container">
                {types.map((type) => (
                  <p
                    className="PokeCard-pokemon-details-text PokeCard-pokemon-type-text"
                    key={type.type.name}
                  >
                    {type.type.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="PokeCard-pokemon-height-container PokeCard-pokemon-basic-detail-container">
              <p className="PokeCard-pokemon-basic-detail">{height}</p>
              <p className="PokeCard-pokemon-details-text">Height</p>
            </div>
          </div>
          {displayExperienceStat && experienceStatJSX}
          <div
            className={`PokeCard-pokemon-advanced-stats-container ${
              !displayAdvancedStats && "PokeCard-hide"
            }`}
          >
            {displayAdvancedStats && advancedStatsJSX}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokeCard;
