import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PokedexView from '../views/PokedexView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokedexView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home'
    }
  ]
});

export default router;
