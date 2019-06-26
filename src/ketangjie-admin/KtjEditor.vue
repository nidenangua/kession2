<template>
    <div :id="`KtjEditor${id}`">

    </div>
</template>
<script>
let editorIndex = 0;
export default {
    name:'KtjEditor',
    data(){
        return {
            id:0
        }
    },
    created(){
        editorIndex ++
        this.id = editorIndex
        console.log(editorIndex)
        this.$nextTick(()=>{
            let editor = UE.getEditor(`KtjEditor${editorIndex}`,{initialFrameWidth : "100%",toolbars: [['fullscreen','myinsertimage','undo', 'redo' ,'|', 'fontsize', 'forecolor', 'bold', 'italic', 'underline', 'strikethrough','|', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall','cleardoc']],});
        })
    }
}
</script>
