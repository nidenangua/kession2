<template>
    <div class="ktj-loading"></div>
</template>
<script>
export default {
    name:'KtjPartLoading',
    data(){
        return {
            visible:false
        }
    }
}
</script>
<style scoped>
.ktj-loading{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background:rgba(255,255,255,0.5) url(./loading.gif) no-repeat 50% 50%;
    z-index: 99;
    background-size: 48px;
}

</style>


