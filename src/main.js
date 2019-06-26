
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
/**
 * 阿里图片上传
 */
import AliOSS from '@/plugins/alioss'
import SelectLink from '@/pages/drag/SelectLink'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import KetangjieAdmin from './ketangjie-admin'
/**
 * 瀑布流
 */
import { VueMasonryPlugin } from 'vue-masonry'
Vue.config.productionTip = true
Vue.use(ElementUI)
Vue.use(KetangjieAdmin)
Vue.use(AliOSS)
Vue.use(VueMasonryPlugin)
/**
 * 消息提示
 */
Vue.prototype.$msg = function (msg, _type) {
  return new Promise(resolve => {
    if (_type) {
      this.$message({
        message: msg,
        type: _type
      })
    } else {
      this.$message.error(msg)
    }
    setTimeout(() => {
      resolve()
    }, 1500)
  })
}
/**
 * 图片上传
 */
Vue.prototype.$uploadImages = function (data, key = 'src') {
  this.$store.ready(state => {
    this.$aliUpload({
      wxid: state.info.wxid,
      uploaded: info => {
        if (typeof data === 'function') {
          data(info)
        } else {
          data[key] = info.defaultpic
        }
      }
    })
  })
}


/**
 * 复制链接
 */
Vue.prototype.$copyUrl = function (id) {
  var Url = document.getElementById(id);
  Url.select(); //选择对象
  document.execCommand("Copy"); //执行浏览器复制命令
  this.$msg("复制成功！您可在微信或浏览器打开", 'success')

}

/**
 * 设置链接
 */
const selectLinkConstructor = Vue.extend(SelectLink);
const selectLinkModel = new selectLinkConstructor();
selectLinkModel.$mount(document.createElement('div'));
document.body.appendChild(selectLinkModel.$el);
Vue.prototype.$selectLink = function (data, key = 'url') {
  selectLinkModel.visible = true;
  if (typeof data === 'function') {
    selectLinkModel.callback = data
  } else {
    selectLinkModel.callback = function (title, url) {
      data.title = title;
      data[key] = url
    }
  }
}

/**
 * 创建vue对象
 */

const Main = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

/**
 * 添加全局方法 
 */
window.KTJ_RouteJump = (url) => {
  if (url.indexOf('/home.html') !== -1) {
    KTJ_FrameRouteJump(url)
  } else {
    Main.$router.push(url)
  }
}
window.KTJ_FrameRouteJump = (_url) => {
  Main.$router.push({
    path: '/',
    query: {
      url: _url
    }
  })
}

window.KTJ_TipsDialog = Main.$tipsDialog

export default Main