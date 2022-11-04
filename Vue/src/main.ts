import { createApp, VueElement } from "vue";
import App from "./App.vue";
import router from "./router";

import Paginate from "vuejs-paginate-next";
const app = createApp(App);

app.use(router).use(Paginate);

app.mount("#app");
