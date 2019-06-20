<template>
    <div>
        <button v-on:click="allRemove">clear All</button>
    </div>
</template>

<script>
export default {
    methods : {
        allRemove : function(){
           // localStorage.clear();
            this.$emit('clearall')
        }
    }
}
</script>

<style>

</style>
