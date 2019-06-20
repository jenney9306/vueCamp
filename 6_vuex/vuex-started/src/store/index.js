import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export let store = new Vuex.Store({
    state : {
        num:10,
        user: {},
    },
    getters:{
        doubleNum(state){
            return state.num * 2 ;
        }
    },
    mutations:{//state 값을 바꾸는 method
        changeNumber(state){//무조건 state를 받아야지 쓸수있음 
            state.num = 100;
        },
        setUser(state, user){
            state.user = user;
        }
    },
    actions :{ //비동기 처리 method
        FETCH_USER(context){ //state 접근이 불가임 
            fetch('https://jsonplaceholder.typicode.com/users/1')
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    context.commit('setUser', json); //commit은 mutation 호출 api
                 
                });
        }
    }
})