import axios from 'axios';

export const getPokemon = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=50";
  const response = await axios.get(url);
  return response.data.results; 
};

export const selectPokemon = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const response = await axios.get(url);
  return response.data; 
};
