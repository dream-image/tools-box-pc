import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';
//@ts-ignore
import Aura from '@primevue/themes/aura';
import App from './App.vue'
const app = createApp(App);
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app')

