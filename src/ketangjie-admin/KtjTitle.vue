<template>
    <div class="ktj-title" :class="border === 'none' && 'ktj-title-noborder'">
        {{name}}
        <slot />
    </div>
</template>
<script>
export default {
    name:'KtjTitle',
    props:['name','border']
}
</script>
<style scoped>
.ktj-title{
    padding-bottom: 20px;
    font-size: 18px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
}
.ktj-title-noborder{
    border-bottom: 0px;
}
</style>

