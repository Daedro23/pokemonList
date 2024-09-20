<script setup>
import Button from '@/components/Button.vue';
</script>

<style lang="scss">
    .container {
        text-align: center;
    }
    .img-container {
        margin-top: 32px;
        position: relative;
        max-width: 1256px;
        height: 300px;
        .position {
            position: absolute;
        }
        .pikachu {
            z-index: 1;
            left: 35.5%;
            top: 0%;
            @include mobile {
                left: 5.5%;
                }
            }
        .ellipse {
            left: 39.5%;
            top: 22.3%;
            @include mobile {
                left: 19.5%;
            }
        }
        @include mobile {
            max-width: 100%;
        }
    }
    .welcome {
        font-size: $title;
        color: $black;
        font-weight: bold;
        margin: 50px 0 20px 0;
    }
    .text {
        margin: 20px 0;
        font-size: $med;
        color: $darkGrey;
        line-height: $line-p;
        font-weight: 500;
    }
    .btn-primary {
        font-size: $med;
        margin-top: 50px;
        display: inline;
    }
</style>

<template>
    <div class="container">
        <div class="img-container">
            <img class="position pikachu" src="/src/assets/images/pikachu.png" alt="pikachu">
            <img class="position ellipse" src="/src/assets/images/Ellipse.png" alt="Ellipse">
        </div>
        <div class="welcome">Welcome to Pokédex</div>
        <p class="text">The digital encyclopedia created by Professor Oak is an invaluable tool <br> to Trainers in the Pokémon world.</p>
        <router-link to="/pokedex" v-slot="{ navigate }">
            <Button class="btn-primary" msg="Get started" @fn="navigate()"/>
        </router-link>
    </div>
  
</template>
