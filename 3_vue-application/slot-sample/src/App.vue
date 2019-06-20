<template>
  <div>
    <ul>
      <!-- <list-item v-bind:item="num1"></list-item>
      <list-item v-bind:item="num2"></list-item>
      <list-item v-bind:item="num3"></list-item> -->

      <list-item color="blueText">1</list-item>
      <list-item >2
        <button>remove</button>
      </list-item>
      <list-item> 3
        <img src="https://www.google.com/imgres?imgurl=http%3A%2F%2Fblogthumb2.naver.net%2F20140926_176%2Fredslate_1411741830380j5Kou_PNG%2F1.png%3Ftype%3Dw2&imgrefurl=http%3A%2F%2Fblog.naver.com%2FPostView.nhn%3FblogId%3Dredslate%26logNo%3D220125504342%26categoryNo%3D0%26parentCategoryNo%3D0&docid=diT81RFgL-y1fM&tbnid=G9cvYZlA8Cdc0M%3A&vet=10ahUKEwjN6ZqE3qTiAhVvG6YKHduUDEgQMwjxASgGMAY..i&w=300&h=300&bih=712&biw=1440&q=%ED%94%BC%EC%B9%B4%EC%B8%84&ved=0ahUKEwjN6ZqE3qTiAhVvG6YKHduUDEgQMwjxASgGMAY&iact=mrc&uact=8"
        />
      </list-item>
    </ul>
  </div>
</template>

<script>
import ListItem from './components/ListItem.vue';
export default {
  // data() {
  //   return {
  //     num1 : 1,
  //     num2 : 2,
  //     num3 : 3,
  //   }
  // },
  components : {
    'list-item' : ListItem,
  }
}
</script>

<style>
.blueText {
  color : blue
}
</style>
