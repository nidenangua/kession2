<template>
  <div>
    <el-dialog title="选择图标" :visible.sync="visible" width="880px">
      <select-icon @sure="selectIconSure" @cancel="visible = false"/>
    </el-dialog>
    <div class="nav">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div class="icon">
            <img :src="item.icon">
            <div class="select-img" @click="selectImg(item)">替换图标</div>
          </div>
          <div class="op">
            <span>导航名称：</span>
            <input class="form-textbox" type="text" v-model="item.name">
          </div>
          <div class="op clearfix">
            <span>设置链接：</span>
            <input class="form-textbox ktj-fl" type="text" v-model="item.url" style="width:140px;">
            <div class="ks-bt ktj-fl ks-link-bt ktj-ml5" @click="$selectLink(item)"></div>
          </div>
          <div class="ks-delete" @click="deleteData(index)"></div>
        </li>
      </ul>
    </div>
    <div align="center">
      <div class="ks-bt ks-bt-pur fn" @click="addData()">添加导航</div>
    </div>
  </div>
</template>
<script>
import SelectIcon from "../SelectIcon";
import { deleteArray, cloneArray } from "@/utils";
export default {
  name: "Nav",
  props: ["list"],
  data() {
    return {
      visible: false,
      selectItem: {}
    };
  },
  methods: {
    /**
     * 选择图片
     */
    selectImg(item) {
      this.visible = true;
      this.selectItem = item;
    },
    selectIconSure(src) {
      this.selectItem.icon = src;
      this.visible = false;
    },
    /**
     * 删除
     */
    deleteData(index) {
      if (this.list.length <= 2) {
        this.$alert("至少保留2条");
        return false;
      }
      let arr = cloneArray(this.list);
      arr.splice(index, 1);
      this.$emit("update:list", arr);
    },
    /**
     * 添加导航
     */
    addData() {
      if (this.list.length >= 5) {
        this.$alert("您最多可添加5个导航");
        return false;
      }
      let arr = cloneArray(this.list);
      arr.push({
        name: "导航",
        icon: `/Public/wechat/images/microportal/nopic.png`,
        url: "#"
      });
      this.$emit("update:list", arr);
    }
  },
  components: {
    SelectIcon
  }
};
</script>
<style scoped>
/*导航*/
.nav {
  padding-bottom: 15px;
}
.nav li {
  padding: 10px 10px 10px 76px;
  position: relative;
  min-height: 66px;
}
.nav .icon {
  width: 64px;
  height: 64px;
  position: absolute;
  left: 0;
  top: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
}
.nav .icon img {
  height: 48px;
  display: block;
  margin: 0 auto;
  margin-top: 8px;
}
.nav li {
  border-bottom: 1px solid #eee;
}
.nav .op {
  position: relative;
  line-height: 36px;
  padding: 0 25px 0 70px;
  margin-top: 5px;
}
.nav .op span {
  position: absolute;
  left: 0;
  top: 0;
  color: #999;
}
.nav .select-img {
  height: 20px;
  line-height: 20px;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>
