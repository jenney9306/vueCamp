<template>
    <div>
        <div>
            <label for="">id : </label>
            <input v-model="username" type="text">
        </div>
        <div>
            <label for="">pw : </label>
            <input v-model="password" type="text">
        </div>
        <button v-on:click="doLogin()">login</button>
    </div>

</template>

<script>
export default {
    data(){
        return{
            username : '',
            password : ''
        }
    },
    methods:{
        doLogin() {
            //console.log(this.userId)
            //this.$emit('login',this.username)
            const value = this.username;
            this.$store.commit('setUserId', value);
        }
    }

}
</script>

<style>

</style>
