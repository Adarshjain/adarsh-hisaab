import Vue from 'vue'
import App from './App.vue'
import 'buefy/dist/buefy.css'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
// @ts-ignore
import {Button, Datepicker, Dialog, Field, Icon, Input, Modal, Radio, Table} from "buefy/src/components";
import {ConfigProgrammatic} from "buefy";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Datepicker);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Input);
Vue.use(Modal);
Vue.use(Radio);
Vue.use(Table);
Vue.use(Modal);
Vue.use(Icon);
ConfigProgrammatic.setOptions({})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
