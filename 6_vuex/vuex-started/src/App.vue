<template>
  <div>
    <h1>App logic</h1>
    <p>data : {{num}}</p>
    <button v-on:click="changeNumber">change</button>
    <div>
      {{doubleNum}}
    </div>
    <button v-on:click="fetchUser">get user</button>
    <div>
      {{this.$store.state.user}}
    </div>
    <hr>
    <h1>store logic</h1>
    <p>state : {{this.$store.state.num}}</p>
    <button v-on:click="changeState">change state</button>
    <div>
      {{this.$store.getters.doubleNum}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 10,
      user: {},
    }
  },

  //getters
  computed:{
    doubleNum(){
      return this.num * 2;
    }
  },
  methods:{
    changeNumber(){
      this.num = 100;
    },
    changeState(){
      this.$store.commit('changeNumber');
    },
    fetchUser(){
       this.$store.dispatch('FETCH_USER');
      // fetch('https://jsonplaceholder.typicode.com/users/1')
      //   .then(response => response.json())
      //   .then(json => {
      //     console.log(json)
      //     this.user = json;
      //   });
    }
  },
  created(){
    console.log(this.$store);
  }
}
</script>

<style>

</style>
