<template>
  <ktj-container>
    <ktj-title name="小程序店铺">
      <div class="ktj-fr">
        <el-button @click="diyStore" class="ktj-red-btn">装修店铺</el-button>
      </div>
    </ktj-title>
    <el-card class="ktj-mt20">
      <div slot="header" class="clearfix">
        <span class="ktj-fz16">体验版</span>
        <span class="ktj-tips ktj-ml10">将店铺设置在课堂街平台小程序，无需注册小程序</span>
        <el-button
          class="ktj-fr"
          type="text"
          style="padding: 3px 0"
          @click="$router.push({name:'MiniprogramStyle'})"
        >切换风格</el-button>
      </div>
      <div class="miniprogram-code">
        <el-image
          class="miniprogram-code__image"
          fit="cover"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557579782987&di=84cd2269e538c63a5e52d5b38bd5550e&imgtype=0&src=http%3A%2F%2Fd.youth.cn%2Fshrgch%2F201905%2FW020190506398711756685.jpg"
        />
        <p class="ktj-fz14 ktj-mt10 ktj-color-info">扫码即可查看店铺小程序</p>
      </div>
    </el-card>
    <el-card class="ktj-mt20">
      <div slot="header" class="clearfix">
        <span class="ktj-fz16">升级版</span>
      </div>
      <div class="miniprogram-vesion">
        <strong>开通高级版小程序，您可以：</strong>
        <br>1. 将自己的小程序绑定店铺；
        <br>2. 服务号一经绑定不可更换，绑定后您可以使用自己服务号的微信支付；
        <br>3. 收入直接进入您的微信支付对应的收款账户，且不用经过平台，免去交易手续费；
        <br>4. 您还可以通过此服务号给用户发送服务号通知。
        <br>
        <el-button class="ktj-mt20" type="primary">立即开通</el-button>
      </div>
    </el-card>
  </ktj-container>
</template>
<script>
export default {
  name: "MiniprogramIndex",
  data() {
    return {};
  },
  methods: {
    diyStore() {}
  },
  mounted() {}
};
</script>
<style scoped>
.miniprogram-code {
  text-align: center;
  padding: 15px 0;
}
.miniprogram-code__image {
  width: 200px;
  height: 200px;
}
.miniprogram-vesion strong {
  color: #444;
}
.miniprogram-vesion {
  padding: 15px 30px;
  font-size: 14px;
  line-height: 30px;
  color: #666;
}
</style>

