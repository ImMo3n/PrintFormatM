import { createApp } from 'vue'
import App from './App.vue'
import commonFunctions from './mixins/commonFunctions';

const app = createApp(App);
app.mixin(commonFunctions);

app.mount('#app')
