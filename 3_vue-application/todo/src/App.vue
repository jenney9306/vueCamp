<template>
  <div>
    <todo-header></todo-header>
    <todo-input 
      v-on:show:modal="openModal"
      v-on:add="addTodoItem"></todo-input>
    <todo-list 
      v-bind:listitems="todoItems" v-on:remove="removeTodoImtems">
    </todo-list>
    <todo-footer v-on:clearall="clearAllItems"></todo-footer>
    <base-modal v-on:close="closeModal" v-if="modalStatus"></base-modal>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue'; //vim 단축키! 
import TodoFooter from './components/TodoFooter.vue';
import BaseModal from './components/common/BaseModal.vue';

export default {
  components : {
    'todo-header' : TodoHeader,
    'todo-input' : TodoInput,
    'todo-list' : TodoList,
    'todo-footer' : TodoFooter,
    'base-modal' : BaseModal,
  },
  data() {
    return {
        todoItems: [],
        modalStatus : false,
    }
  },
  created : function() {//컴포넌트 생성되자마자 실행되는 속성 
    this.fetchImtems();
  },
  methods : {
    fetchImtems : function() {
        for(var i = 0; i < localStorage.length; i++){
            if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                var item = localStorage.key(i);
                this.todoItems.push(item);  
            }
        }
    },
    removeTodoImtems: function(todoItem, index) {
        this.todoItems.splice(index, 1);
        localStorage.removeItem(todoItem); //==delete() api 호출한거와 같은것임
    },
    addTodoItem : function(value){
        this.todoItems.push(value);
        localStorage.setItem(value, value); //key:value
    },
    clearAllItems : function(){
       this.todoItems = [];
       localStorage.clear();
    },
    openModal : function() {
      this.modalStatus = true;
    },
    closeModal : function {
      this.modalStatus = false;
    }
  }
}
</script>

<style>

</style>
