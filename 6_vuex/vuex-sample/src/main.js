import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
 
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    userId: '',
  },
  mutations : {
    setUserId(state, id){
      state.userId = id;
    }
  }
})

Vue.config.productionTip = false

new Vue({
  store : store,
  render: h => h(App),
}).$mount('#app')
