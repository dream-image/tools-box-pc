import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
//@ts-ignore
import Aura from '@primevue/themes/aura';
import App from './App.vue'
const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app')

