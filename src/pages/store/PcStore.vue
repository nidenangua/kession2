<template>
  <ktj-container>
    <ktj-title name="公众号店铺" border="none">
      <div class="ktj-fr pcstore-help">
        <a target="_blank" href="http://www.zuojy.com/home/help#anchor32">？</a>
      </div>
    </ktj-title>
    <el-alert type="warning" :closable="false">
      <span class="ktj-fz14">您暂未开通电脑端编辑功能</span>
      <el-button type="primary" class="ktj-ml20" @click="diyStore">立即试用</el-button>
    </el-alert>
    <el-card class="ktj-mt20">
      <div slot="header" class="clearfix">
        <span class="ktj-fz16">电脑端店铺信息</span>
        <el-button
          class="ktj-fr"
          type="text"
          style="padding: 3px 0"
          @click="$router.push('/?url=/home.html/default/Website/websitetemplate/2')"
        >切换风格</el-button>
      </div>
      <div class="pcstore-main">
        <div class="pcstore-main__list">
          <span class="ktj-fz14 ktj-mr30">网站开通状态</span>
          <el-radio v-model="status" label="1">正常</el-radio>
          <el-radio v-model="status" label="0">关闭</el-radio>
        </div>
        <div class="pcstore-main__list">
          <span class="ktj-fz14 ktj-mr30">网站二级域名：</span>
          <div class="pcstore-main__list-url ktj-mr20 ktj-fz16">{{detail.domain}}</div>
          <el-button
            type="primary"
            class="ktj-blue-btn ktj-normal-btn"
            @click="openNew(detail.domain)"
          >访问网站</el-button>
        </div>
        <!-- 独立域名权限 -->
        <div class="pcstore-main__list">
          <span class="ktj-fz14 ktj-mr30 ktj-fl" style="line-height: 44px;">独立域名</span>
          <!-- 无权限显示 -->
          <div v-if="detail.is_vip==false">
            <el-radio v-model="auth" label="1">无权限</el-radio>
            <el-radio v-model="auth" label="2" disabled>有权限</el-radio>
            <div class="pcstore-main__alert ktj-fz14">
              <i>当前套餐不支持独立域名</i>
              <el-button
                type="primary"
                class="ktj-normal-btn"
                @click="open('/?url=%2Fhome.html%2Fdefault%2FService%2Fupgrade')"
              >马上升级套餐</el-button>
            </div>
          </div>
          <!-- 有权限显示 -->
          <div class="pcstore-main__auth ktj-mt5" v-if="detail.is_vip==true">
            <div class="pcstore-main__auth-top">
              <p class="ktj-fz16">https://</p>
              <el-input
                v-model="detail.predomain"
                size="medium"
                placeholder="请设置域名"
                v-if="detail.check==-1"
              ></el-input>
              <el-input
                v-model="detail.predomain"
                disabled
                size="medium"
                placeholder="请设置域名"
                v-else
              ></el-input>
              <div style="display: inline-block;" v-if="detail.check==1">
                <i class="ktj-ml15 ktj-color-primary ktj-mr15">已审核</i>
                <el-button
                  type="primary"
                  class="ktj-blue-btn ktj-normal-btn"
                  @click="openNew(detail.predomain)"
                >访问网站</el-button>
              </div>
              <div style="display: inline-block;" v-else-if="detail.check==0">
                <i class="ktj-ml15 ktj-color-red">审核中</i>
              </div>
            </div>
            <div class="pcstore-main__auth-bottom ktj-mt20">
              <p>设置说明：</p>
              <p>1、先到您的域名控制面板，将您的域名做CNAME解释到： cname.kesion.com</p>
              <p>2、所绑定的域名，必须先做好备案工作。具体备案流程，请联系您的业务代表；</p>
            </div>
          </div>
        </div>
        <div class="pcstore-main__list">
          <span class="ktj-fz14 ktj-mr30 ktj-fl">版权信息</span>
          <el-input
            type="textarea"
            class="pcstore-main__textarea"
            :rows="2"
            placeholder
            v-model="detail.copyright"
          ></el-input>
        </div>
        <div class="pcstore-main__list ktj-mb0">
          <span class="ktj-fz14 ktj-mr30 ktj-fl">SEO选项</span>
          <div class="pcstore-main__seo">
            <div class="pcstore-main__box">
              <h2>站点标题</h2>
              <el-input v-model="detail.seotitle" size="medium" placeholder="请输入标题"></el-input>
            </div>
            <div class="pcstore-main__box">
              <h2>
                网站 META 关键词 （
                <i>针对搜索引擎设置的网页关键词，多个关键词请用,号分隔</i>）
              </h2>
              <el-input
                type="textarea"
                class="pcstore-main__textarea"
                :rows="2"
                placeholder
                v-model="detail.metakeywords"
              ></el-input>
            </div>
            <div class="pcstore-main__box">
              <h2>
                网站 META 网页描述 （
                <i>针对搜索引擎设置的网页描述，多个描述请用,号分隔</i>）
              </h2>
              <el-input
                type="textarea"
                class="pcstore-main__textarea"
                :rows="2"
                placeholder
                v-model="detail.metadescription"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="pcstore-main__line"></div>
        <div class="pcstore-main__btn">
          <el-button type="primary" class="ktj-normal-btn" @click="save">保存设置</el-button>
          <!-- <el-button class="ktj-normal-btn">取消</el-button> -->
        </div>
      </div>
    </el-card>
  </ktj-container>
</template>

<script>
import { editWxDomain, getWxDomainInfo } from "@/api/home";
export default {
  name: "PcStore",
  data() {
    return {
      /*用户数据详情*/
      detail: {},
      /*用户是否开通,除了0都是开通*/
      status: null,
      /*用户是否拥有权限,1无权限,2有权限*/
      auth: "1"
    };
  },
  methods: {
    /*
     * 提交保存用户设置
     *
     * */
    editWxDomain() {
      this.detail.status = this.status;
      editWxDomain(
       this.detail
      ).then(res => {
        if (res.result == "success") {
          this.$msg("保存成功", "success");
        } else {
          this.$msg("保存失败请重试");
        }
        console.log(res);
      });
    },
    /*
     * 获取用户设置信息
     * */
    getWxDomainInfo() {
      getWxDomainInfo({}).then(res => {
        console.log(res);
        this.detail = res.detail;
        this.status = this.detail.status != 0 ? "1" : "0";
      });
    },
    /*
     * 跳转页面
     *
     * */
    open(url) {
      this.$router.push(url);
    },
    /*
     * 跳转外部链接
     *
     * */
    openNew(url) {
      window.location.href = url;
    },
    diyStore() {},
    /*
     * 保存
     *
     * */
    save() {
      this.editWxDomain();
    }
  },
  created() {
    this.getWxDomainInfo();
  }
};
</script>

<style scoped>
.pcstore-help {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
}
.pcstore-help a {
  color: #606266;
  font-size: 14px;
  font-family: MicrosoftYaHei;
}
.pcstore-help a:hover {
  color: #488bff;
}
.pcstore-main {
  padding-top: 15px;
}
.pcstore-main__list {
  margin-bottom: 45px;
}
.pcstore-main__list span {
  display: inline-block;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #666;
  width: 165px;
  text-align: right;
}
.pcstore-main__list-url {
  display: inline-block;
  color: #929292;
}

.pcstore-main__alert {
  display: inline-block;
  width: 285px;
  height: 44px;
  line-height: 44px;
  background: #fdf6ec;
  border-radius: 4px;
  padding: 0 20px 0 24px;
}
.pcstore-main__alert i {
  font-style: normal;
  color: #e6a23c;
  display: inline-block;
  margin-right: 20px;
}
.pcstore-main__auth {
  display: inline-block;
}
.pcstore-main__auth-top {
}
.pcstore-main__auth-top p {
  display: inline-block;
  color: #929292;
}
.pcstore-main__auth-top i {
  font-style: normal;
  font-size: 16px;
}
.pcstore-main__auth-top .el-input {
  display: inline-block;
  width: 300px;
}
.pcstore-main__auth-bottom {
  font-size: 14px;
  color: #e6a23c;
}
.pcstore-main__textarea {
  width: 720px !important;
}
.pcstore-main__seo {
  display: inline-block;
}
.pcstore-main__box {
  width: 500px;
  margin-bottom: 40px;
}
.pcstore-main__box h2 {
  font-weight: 400;
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}
.pcstore-main__box h2 i {
  font-style: normal;
  color: #488bff;
}
.pcstore-main__line {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #e6e6e6;
}
.pcstore-main__btn {
  text-align: center;
  padding-top: 20px;
}
</style>
