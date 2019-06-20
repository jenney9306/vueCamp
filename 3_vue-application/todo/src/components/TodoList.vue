<template>
    <div>
        <ul>
            <li v-for="(todoItem, index) in listitems" v-bind:key="index">
                <span>{{ todoItem }}</span>
                <button v-on:click="removeItem(todoItem, index)">remove</button>
                <!-- removeItem() == removeItem -->
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props : ['listitems'],
    //vda 자동완성
    // data() {
    //     return {
    //         todoItems: []
    //     }
    // },
    methods : {
        // inspectElemtent: function(value){
        //     debugger;
        //     console.log(value);
            
        // },
        // fetchImtems : function() {
        //     for(var i = 0; i < localStorage.length; i++){
        //         if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
        //             var item = localStorage.key(i);
        //             this.todoItems.push(item);  
        //         }
        //     }
        // },
        removeItem : function(todoItem, index) {
            //뷰데이터 속성제거
            //this.todoItems.splice(index, 1);
            this.$emit('remove', todoItem, index);
            
        }
    },
    // created : function() {//컴포넌트 생성되자마자 실행되는 속성 
    //     this.fetchImtems();
    // }
}
</script>

<style>

</style>
