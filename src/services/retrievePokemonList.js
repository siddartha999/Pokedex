import axios from "axios";
const POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon?offset=`;

const retrieveData = async (list) => {
  let max_requests_made = 10;
  let offset = 0;
  const pokemonPromisesList = [];
  do {
    let next = null;
    let pokemonData = null;
    let prom = axios.get(POKEMON_API_URL + offset + "&limit=100");

    await prom;

    await prom.then((res) => {
      next = res.data.next;
      pokemonData = res.data.results;
    });

    for (let dataPoint of pokemonData) {
      pokemonPromisesList.push(axios.get(dataPoint.url));
    }

    if (!next) {
      break;
    }

    offset += 100;
    max_requests_made--;
  } while (max_requests_made);

  if (pokemonPromisesList) {
    await Promise.all(pokemonPromisesList).then((res) => {
      for (let pokemon of res) {
        const urlSplit = pokemon.config.url.split("/");
        const pokeID = urlSplit[urlSplit.length - 2];
        const data = pokemon.data;
        let type = "normal";
        if (data.types && data.types.length) {
          type = data.types[0].type.name;
        }
        list.push({
          id: pokeID,
          name: data.name,
          height: data.height,
          weight: data.weight,
          experience: data.base_experience,
          type: type,
          stats: data.stats,
        });
      }
    });
  }

  return list;
};

const retrievePokemonList = async () => {
  const cachedPokemonList = sessionStorage.getItem("pokemonList");
  const pokemonList = cachedPokemonList ? JSON.parse(cachedPokemonList) : [];

  if (!pokemonList.length) {
    await retrieveData(pokemonList);
    sessionStorage.setItem("pokemonList", JSON.stringify(pokemonList));
    console.log("Retrieving pokemon list from scratch");
  }

  return pokemonList;
};

export default retrievePokemonList;
