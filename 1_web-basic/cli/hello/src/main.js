import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// var App = {
//   template : '<p>app</p>'
// }

// new Vue({
//   el: '#app',
//   components: {
//     'app' : App
//   }
// })