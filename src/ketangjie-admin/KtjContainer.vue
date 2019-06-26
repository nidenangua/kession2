<template>
    <div class="ktj-container">
        <div class="ktj-container__box">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name:'KtjContainer'
}
</script>

<style scoped>

.ktj-container{
    padding: 25px;
    position: relative;
    overflow-y: auto;
}
.ktj-container__box{
    padding: 25px;
    background: #fff;
    border-radius: 10px;
}
</style>

