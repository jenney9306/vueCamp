<template>
  <div>
    <app-header></app-header>
    <!-- HTML -->
    {{ message }}
    <button v-on:click="showAlert">click</button>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    'app-header' : AppHeader
  },
  //javascript
  data : function() {
    return {
      message : 'hi~~~~~~'
    }
  },
  methods : {
    showAlert : function() {
      alert('hhhhhi');
    }
  }
}
</script>

<style>

</style>
