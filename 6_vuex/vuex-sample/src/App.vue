<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <AppHeader v-bind:login_id="userId"/>
    <AppContent v-on:deliver="loginId"/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppContent from './components/AppContent.vue'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppContent
  },
  data() {
    return {
      userId: '',
    }
  },
  methods:{
    loginId(id){
      this.userId = id;
      console.log(id);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
