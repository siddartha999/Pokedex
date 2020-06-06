import React, { useState } from "react";
import "./PokeCard.css";
import PokeCardDialog from "../PokeCardDialog/PokeCardDialog";
import retrievePokemonImage from "../services/retrievePokemonImage";
import PokemonAdvancedStats from "../PokemonAdvancedStats/PokemonAdvancedStats";

const PokeCard = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const name = props.data.name;
  const exp = props.data.experience;
  const type = props.data.type;
  const height = props.data.height;
  const weight = props.data.weight;
  const pokeID = props.data.id;
  const imgSrc = retrievePokemonImage(pokeID);
  const displayAdvancedStats = props.displayAdvancedStats;
  const displayExperienceStat = props.displayExperience;
  const displayPokemonBgImage = props.displayPokemonBgImage;
  const pokeCardStyle = {};

  if (displayPokemonBgImage) {
    pokeCardStyle["backgroundImage"] = `url(${imgSrc})`;
    pokeCardStyle["backgroundRepeat"] = "no-repeat";
    pokeCardStyle["backgroundSize"] = "cover";
  }

  const handleToggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const imgJSX = (
    <div className="PokeCard-pokemon-image-container">
      <img
        className="PokeCard-pokemon-image"
        src={imgSrc}
        alt={`${name}`}
        onClick={handleToggleDialog}
      ></img>
    </div>
  );

  const pokeCardDialogJSX = (
    <PokeCardDialog
      open={isDialogOpen}
      closeDialog={handleToggleDialog}
      data={props.data}
      imgSrc={imgSrc}
      invertedChart={props.invertedChart}
    />
  );

  let advancedStatsJSX;
  if (displayAdvancedStats) {
    advancedStatsJSX = (
      <PokemonAdvancedStats
        stats={props.data.stats}
        invertedChart={props.invertedChart}
        statSelected={props.statSelected}
        isStatSelected={props.isStatSelected}
      />
    );
  }

  const experienceStatJSX = (
    <div className="PokeCard-experience-container">
      <p>Experience: {exp} </p>
    </div>
  );

  return (
    <div className={`PokeCard ${type}`} style={pokeCardStyle}>
      <div className="PokeCard-details-container">
        <div className="PokeCard-title-container">
          <p className="PokeCard-title">{name}</p>
        </div>
        {!displayPokemonBgImage && imgJSX}
        <div className="PokeCard-pokemon-basic-details-container">
          <div className="PokeCard-pokemon-type-container PokeCard-pokemon-basic-detail-container">
            <p>Type</p>
            <p className="PokeCard-pokemon-basic-detail">{type}</p>
          </div>
          <div className="PokeCard-pokemon-height-container PokeCard-pokemon-basic-detail-container">
            <p>Height</p>
            <p className="PokeCard-pokemon-basic-detail">{height}</p>
          </div>
          <div className="PokeCard-pokemon-weight-container PokeCard-pokemon-basic-detail-container">
            <p>Weight</p>
            <p className="PokeCard-pokemon-basic-detail">{weight}</p>
          </div>
        </div>
        {displayExperienceStat && experienceStatJSX}
        <div
          className={`PokeCard-pokemon-advanced-stats-container ${
            !displayAdvancedStats && "PokeCard-hide"
          }`}
        >
          {displayAdvancedStats ? advancedStatsJSX : pokeCardDialogJSX}
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
