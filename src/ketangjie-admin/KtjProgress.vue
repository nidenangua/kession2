<template>
    <div>
        <div class="ktj-progress" v-if="visible">
            <div class="ktj-progress__title">
                {{title}}
            </div>
            <el-progress :percentage="percentage" v-if="percentage < 100"></el-progress>
            <el-progress :percentage="percentage" status="success" v-else></el-progress>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'KtjProgress',
    data(){
        return {
            title:'',
            visible:false,
            percentage:0
        }
    }
}
</script>
<style scoped>
.ktj-progress{
    width: 400px;
    padding: 20px;
    background: #fff;
    top: 20px;
    position: fixed;
    left: 50%;
    top:20px;
    margin-left:-150px;
    z-index: 2020;
    border-radius: 4px;
    box-shadow: 0 1px 10px rgba(0,0,0,0.1)
}
.ktj-progress__title{
    font-size: 16px;
    padding-bottom: 10px;
}
</style>


