import React, { useState } from "react";
import "./PokeCard.css";
import PokeCardDialog from "../PokeCardDialog/PokeCardDialog";
const POKE_IMG_API = "https://pokeres.bastionbot.org/images/pokemon/";

const PokeCard = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleToggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const imgJSX = (
    <img
      className="PokeCard-pokemon"
      src={imgSrc}
      alt={`${name}`}
      onClick={handleToggleDialog}
    ></img>
  );

  return (
    <div className={`PokeCard ${type}`}>
      <p className="PokeCard-title">{name}</p>
      {imgJSX}
      <p>Type: {type}</p>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <p>Experience: {exp} </p>
      <PokeCardDialog
        open={isDialogOpen}
        closeDialog={handleToggleDialog}
        data={props.data}
        imgJSX={imgJSX}
      />
    </div>
  );
};

export default PokeCard;
