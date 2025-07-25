import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { VIcon } from 'vuetify/components'

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount("#app" );
