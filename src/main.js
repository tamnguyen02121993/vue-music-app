import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import PrimeVue from "primevue/config";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import FileUpload from "primevue/fileupload";
import Card from "primevue/card";
import Listbox from "primevue/listbox";
import Button from "primevue/button";
import Slider from "primevue/slider";
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Tooltip from 'primevue/tooltip';
import ScrollTop from 'primevue/scrolltop';
// Css
import "primevue/resources/themes/bootstrap4-light-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/assets/scss/custom.scss";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue, { ripple: true })
  .use(ToastService)
  .component("toast", Toast)
  .component("file-upload", FileUpload)
  .component("card", Card)
  .component("list-box", Listbox)
  .component("p-button", Button)
  .component("slider", Slider)
  .component("p-dialog", Dialog)
  .component("avatar", Avatar)
  .component("scroll-top", ScrollTop)
  .directive('tooltip', Tooltip)
  .mount("#app");
