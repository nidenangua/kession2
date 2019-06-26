import Vue from 'vue'
import Router from 'vue-router'
import examRouters from './exam'
Vue.use(Router)
let _routes = [
  {
    path: '/',
    name: 'Index',
    component: resolve=>{
      require(['@/pages/Index.vue'], resolve)
    }
  },
  {
    path: '/drag',
    name: 'Drag',
    component: resolve=>{
      require(['@/pages/drag/Index.vue'], resolve)
    }
  },
  {
    path: '/store',
    name: 'Store',
    component: resolve=>{
      require(['@/pages/store/StoreIndex.vue'], resolve)
    },
    children:[
      {
        path: '/store/msgtemplate',
        name:'StoreMsgTemplate',
        component: resolve=>{
          require(['@/pages/store/MsgTemplate.vue'], resolve)
        }
      },
      {
        path: '/store/menu',
        name:'StoreMenu',
        component: resolve=>{
          require(['@/pages/store/CustomizeMenu.vue'], resolve)
        }
      },
      {
        path: '/store/autoreply',
        name:'StoreAutoReply',
        component: resolve=>{
          require(['@/pages/store/AutoReply.vue'], resolve)
        }
      },
      {
        path: '/store/material',
        name:'StoreMaterial',
        component: resolve=>{
          require(['@/pages/store/MaterialList.vue'], resolve)
        }
      },
      {
        path: '/store/msgmanage',
        name:'StoreMsgManage',
        component: resolve=>{
          require(['@/pages/store/WxMsgList.vue'], resolve)
        }
      },
      {
        path: '/store/more',
        name:'StoreMore',
        component: resolve=>{
          require(['@/pages/store/More.vue'], resolve)
        }
      }
      
    ]
  },
  {
    path: '/pcStore',
    name: 'PcStore',
    component: resolve=>{
      require(['@/pages/store/PcStore.vue'], resolve)
    }
  },
  {
    path: '/store/setup',
    name: 'StoreSetup',
    component: resolve=>{
      require(['@/pages/store/StoreSetup.vue'], resolve)
    }
  },
  {
    path:'/miniprogram',
    name:'MiniprogramIndex',
    component: resolve=>{
      require(['@/pages/miniprogram/MiniprogramIndex.vue'], resolve)
    }
  },
  {
    path: '/miniprogram/style',
    name: 'MiniprogramStyle',
    component: resolve=>{
      require(['@/pages/miniprogram/MiniprogramStyle.vue'], resolve)
    }
  },
  {
    path:'/group/:id',
    name: 'GroupDetail',
    component: resolve=>{
      require(['@/pages/group/GroupIndex.vue'], resolve)
    }
  },
  {
    path:'/getVodList',
    name: 'GetVodList',
    component: resolve=>{
      require(['@/pages/video/GetVodList.vue'], resolve)
    }
  },
  {
    path:'/uploadVod',
    name: 'UploadVod',
    component: resolve=>{
      require(['@/pages/video/UploadVod.vue'], resolve)
    }
  },
  {
    path:'/data/:id',
    name: 'AddData',
    component: resolve=>{
      require(['@/pages/data/AddData.vue'], resolve)
    }
  },
  {
    path:'/dataLibrary',
    name: 'DataLibrary',
    component: resolve=>{
      require(['@/pages/data/DataLibrary.vue'], resolve)
    }
  },
  //收款设置
  {
    path:'/receipt/set',
    name:'set',
    component:resolve=>{
      require(['@/pages/receipt/ReceiptSet.vue'], resolve)
    }

  },
   //收款要求
  {
    path:'/receipt/ask',
    name:'ask',
    component:resolve=>{
      require(['@/pages/receipt/ReceiptAsk.vue'], resolve)
    }
  },
  //收款设置入口页
  {
    path:'/receipt',
    name:'index',
    component:resolve=>{
      require(['@/pages/receipt/ReceiptIndex.vue'], resolve)
    }
  },
  {
    path:'/course/:id/data',
    name:'CourseData',
    component:resolve=>{
      require(['@/pages/course/CourseData.vue'], resolve)
    }
  }
]
_routes = _routes.concat(examRouters)
export default new Router({
  routes: _routes
})
