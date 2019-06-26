<template>
    <div class="ktj-box">
        <div class="ktj-box__head" v-if="title">
            <span class="ktj-box__more ktj-color-link" v-if="typeof more === 'object'" @click="goMore">{{more.text || '更多'}}</span>
            {{title}}
        </div>
        <div class="ktj-box__body">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name:'KtjBox',
    props:[
        'title',
        'more'
    ],
    methods:{
        goMore(){
            if(this.more.url){
                if(this.more.target === '_blank'){
                    window.open(this.more.url)
                }else{
                    location.href = this.more.url
                }
            }
        }
    }
}
</script>

<style scoped>
.ktj-box{
    background: #fff;
}

.ktj-box{
    padding: 5px 15px;
    border-radius: 4px;
}
.ktj-box__body{
    padding: 15px 0;
    
}
.ktj-box__head{
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    font-size: 14px;
    border-bottom: 1px solid #eee;
}
.ktj-box__more{
    float: right;
    font-size: 12px;
    cursor: pointer;
}

</style>

