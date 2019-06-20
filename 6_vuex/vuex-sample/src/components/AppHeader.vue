<template>
    <div>
        <span>App Header</span>
        <span id="user">사용자 아이디는 여기에 ...{{this.$store.state.userId}}</span>
    </div>
</template>

<script>
export default {
    props: ['loginId']
}
</script>

<style>

</style>
