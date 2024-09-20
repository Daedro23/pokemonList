// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    favorites: [],
  },
  mutations: {
    ADD_FAVORITE(state, pokemon) {
      state.favorites.push(pokemon);
    },
    REMOVE_FAVORITE(state, pokemonName) {
      state.favorites = state.favorites.filter(pokemon => pokemon.name !== pokemonName);
    },
  },
  actions: {
    addFavorite({ commit }, pokemon) {
      commit('ADD_FAVORITE', pokemon);
    },
    removeFavorite({ commit }, pokemonName) {
      commit('REMOVE_FAVORITE', pokemonName);
    },
  },
  getters: {
    allFavorites(state) {
      return state.favorites;
    },
  },
});

export default store;
