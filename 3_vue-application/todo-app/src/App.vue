<template>
    <div>
        <div>App</div>
        {{message}}
        <todo-header></todo-header>
    </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';


export default {

    components : {
        'todo-header' : TodoHeader,
    },
    data : function(){
        return {
            message : 'hello', 
        };
    } 
}
</script>

<style>

</style>
