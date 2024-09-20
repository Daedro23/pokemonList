import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axiosInstance from './plugins/axios';
import store from './store/store';
const app = createApp(App).use(store);
app.config.globalProperties.$axios = axiosInstance;
app.use(router)

app.mount('#app')
