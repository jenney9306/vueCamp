<template>
    <div>
        <UserForm v-on:login="passId"/>
    </div>
</template>

<script>

import UserForm from './UserForm.vue';
export default {
    data(){
        return{
            //username,
        }
    },
    components: {
        UserForm,
    },
    methods :{
        passId(id){
            console.log(id)
            this.$emit('deliver', id);
        }
    }
}
</script>

<style>

</style>
