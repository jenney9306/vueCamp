<template>
   <div>
       <input type="text" v-model="inputText" v-on:keyup.enter="addTodo">
       <button v-on:click="addTodo">add</button>
    </div> 
</template>

<script>
export default {
    data : function() {
        return {
            inputText : '',
        }
    },
    methods : {
        addTodo : function() {
            var value = this.inputText.trim();
            if(value === ''){
                this.$emit('show:modal');
                return;
            }
           // localStorage.setItem(value, value); //key:value
            this.$emit('add', value);
            this.initForm();
        },
        initForm : function () {
            this.inputText = '';
        }
    }
}
</script>

<style>
</style>