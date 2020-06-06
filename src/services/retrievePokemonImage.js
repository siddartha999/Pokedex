const POKE_IMG_API = "https://pokeres.bastionbot.org/images/pokemon/";
const IMAGE_TYPE = ".png";

const retrievePokemonImage = (pokemonID) => {
  return POKE_IMG_API + pokemonID + IMAGE_TYPE;
};

export default retrievePokemonImage;
