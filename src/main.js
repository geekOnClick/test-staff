import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.config.devtools = true
