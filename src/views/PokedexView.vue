<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'; 
import Button from '@/components/Button.vue';
import starOn from '../components/icons/starOn.svg';
import starOff from '../components/icons/starOff.svg';
import { getPokemon, selectPokemon } from '@/services/pokemonService'; 

const store = useStore();
const showLoading = ref(true);

const pokemonList = ref([]);
const pokemonSelect = ref({});
const searchQuery = ref('');
const isModalOpen = ref(false);
let showFavorites = ref(false);

const filteredPokemon = computed(() => {
  return pokemonList.value.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const pokemonTypes = computed(() => {
  if (pokemonSelect.value && pokemonSelect.value.types) {
    return pokemonSelect.value.types
      .map(type => type.type.name)
      .join(', ');
  }
  return '';
});

const loadPokemon = async () => {
  pokemonList.value = await getPokemon(); 
};

const selectPokemonHandler = async (name) => {
  pokemonSelect.value = await selectPokemon(name); 
  isModalOpen.value = true;
};

const toggleFavorite = (pokemon) => {
  const isFavorite = store.state.favorites.some(item => item.name === pokemon.name);
  if (isFavorite) {
    store.dispatch('removeFavorite', pokemon.name);
  } else {
    store.dispatch('addFavorite', pokemon);
  }
};

const toggleShowFavorites = (value) => {
  showFavorites.value = value;
};

const favoritePokemons = computed(() => {
  const favorites = store.getters.allFavorites;
  return favorites;
});

const closeModal = () => {
  isModalOpen.value = false;
};

const copyToClipboard = () => {
  const data = `
    Name: ${pokemonSelect.value.name}
    Weight: ${pokemonSelect.value.weight}
    Height: ${pokemonSelect.value.height}
    Types: ${pokemonTypes.value}
  `;

  navigator.clipboard.writeText(data)
    .then(() => {
      alert('Copied');
    })
    .catch(err => {
      console.error('Error al copiar: ', err);
    });
};

onMounted(() => {
  setTimeout(() => {
    showLoading.value = false;
    loadPokemon(); 
  }, 2000); 
});
</script>


<template>
  <div v-if="showLoading" class="loading">
    <img class="loader" src="../assets/images/Loader.png" alt="Loading..." />
  </div>

  <div class="container">
    <div class="searchField">
      <div class="position">
        <input v-model="searchQuery" placeholder="Search" />
        <div>
            <img class="icon" src="../components/icons/Vector.svg" alt="Search Icon" />
        </div>
      </div>
    </div>
    
    
    <div class="lista" v-for="pokemon in (showFavorites ? favoritePokemons : filteredPokemon)" :key="pokemon.name">
      <li class="pokemon">
        <p @click="selectPokemonHandler(pokemon.name)">{{ pokemon.name }}</p>
        <div class="star" @click="toggleFavorite(pokemon)">
          <img :src="store.state.favorites.find(item => item.name === pokemon.name) ? starOn : starOff" alt="">
        </div>
      </li>
      <div class="footer">
        <Button msg="All" @fn="toggleShowFavorites(false)"/>
        <Button msg="Favorites" @fn="toggleShowFavorites(true)"/>
      </div>
    </div>
    
    <div v-if="(showFavorites && favoritePokemons.length === 0) || (!showFavorites && filteredPokemon.length === 0)">
      <p class="no_data_title">Uh-oh!</p>
      <p class="no_data_subtitle">You look lost on your journey!</p>
      <router-link to="/home" v-slot="{ navigate }">
          <Button class="no_data_btn" msg="Go back home" @fn="navigate()"/>
      </router-link>
    </div>

    <div v-if="isModalOpen" class="modal">
      <div class="modal_content">
        <div class="background-img">
          <span class="close" @click="closeModal">&times;</span>
          <img class="img" :src="pokemonSelect.sprites.front_default" alt="Imagen de Pokémon">
        </div>
        <div class="info_modal">
          <p><span class="detail">Name:</span>{{ pokemonSelect.name }}</p>
          <p><span class="detail">Weight:</span> {{ pokemonSelect.weight }} </p>
          <p><span class="detail">Height:</span> {{ pokemonSelect.height }} </p>
          <p><span class="detail">Types:</span> {{ pokemonTypes }}</p> 
          <div class="modal_footer">
            <Button msg="Share to my friends" @fn="copyToClipboard"/>
            <img 
              v-if="store.state.favorites.find(item => item.name === pokemonSelect.name)" 
              :src="starOn" 
              alt="Stars"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
.container {
  width: 100%;
  margin: 0 auto -50px;
  height: 100vh;
}
.loading {
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  z-index: 1;
  height: 100vh;
}

.loader {
  width: 100px;
  height: auto; 
  animation: wobble 1s infinite; 
}

@keyframes wobble {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.searchField {
  height: 50px;
  width: 100%;
  text-align: center;
  text-align: -webkit-center;
  margin-bottom: 50px;
  .position {
    position: relative;
    width: 570px;
    @include mobile {
      width: 348px;
      }
  }
  input {
    width: 100%;
    height: 50px;
    color: $black;
    font-weight: 500;
    background-color: $white;
    font-size: $small;
    padding-left: 40px;
    border-radius: 10px;
    border: none;
    -webkit-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.5);
    &:focus, &:focus-visible {
      border: none;
      outline: none;
    }
  }
  .icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    pointer-events: none;
  }
}
.modal {
  display: block; 
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  background-color: rgba(0, 0, 0, 0.5); 
  overflow-y: scroll;
  .info_modal {
    margin: 0 40px;
    p {
      padding: 10px 0px;
      border-bottom: 0.5px solid $light-grey;
      font-size: $med;
      font-weight: 500;
      color: $darkGrey;
      text-align: start;
      .detail {
        font-weight: 700;
      }
    }
    .modal_footer {
      justify-content: space-between;
      display: flex;
      margin: 20px 0;
      Button {
        font-size: $med;
        font-weight: 700;
      }
    }
  }
}
.background-img {
  position: relative;
  height: 220px;
  width: 100%;
  background-repeat: no-repeat;
  background-image: url('../assets/images/fondoDesktop.png');
  img {
    position: absolute;
    height: 180px;
    width: 180px;
    left: 194px;
    top: 20px;
    @include mobile {
      left: 67px;
    }
  }
}
.modal_content {
  text-transform: capitalize;
  background-color: $white;
  margin: 10% auto; 
  border: 1px solid $darkGrey;
  width: 570px;
  @include mobile {
    width: 348px;
    }
}

.close {
  color: $darkGrey;
    position: absolute;
    font-size: 28px;
    right: 15px;
    top: 20px;
    width: 25px;
    font-weight: bold;
    background: $white;
    border-radius: 20px;
    height: 25px;
    text-align: center;
    line-height: 0.7;
  &:hover, &:focus {
    color: $black;
    text-decoration: none;
    cursor: pointer;
  }
}
.lista {
  padding: 0;
  width: 100%;
  text-align: -webkit-center;
  
}
.pokemon {
  background-color: $white;
  cursor: pointer;
  display: flex;
  height: 60px;
  justify-content: space-between;
  width: 570px;
  border-radius: 10px;
  border: none;
  align-items: center;
  margin: 15px 0;
  text-align: start;
  padding: 0 3%;
  text-transform: capitalize;
  p {
    color: $black;
    font-weight: 500;
  }
  @include mobile {
    width: 348px;
    }
}
.no_data_title {
  color: $black;
  font-weight: 700;
  font-size: $big;
}
.no_data_subtitle {
  font-weight: 500;
  font-size: $medium;
  margin-top: 10px;
}
.no_data_btn {
  height: 44px;
  font-size: $med;
  font-weight: 700;
  margin-top: 20px;
}
.footer {
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: center;
  left: 0;
  right: 0;
  background-color: white;

  Button {
    width: 275px;
    margin: 30px 15px;
    font-size: $med;
    @include mobile {
      margin: 30px 35px;
    }
  }
}



</style>
