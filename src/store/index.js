import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getWxDetail } from '@/api/store'
import { getUserInfo } from '@/api/user'
const store = new Vuex.Store({
    state: {
        storeReady: false,
        userReady: false,
        switch_on: '#13ce66',
        switch_off: '#cccccc',
        info: {},
        /**
         * 应用开关信息
         */
        appInfo: [],
        isLogin: -1,
        userInfo: {}
    },
    mutations: {
        /**
         * 设置State
         */
        setStoreState(state, data) {
            state.info = data.websiteInfo;
            state.appInfo = data.getAppInfo.list;
            state.storeReady = true
        },
        /**
         * 设置会员state
         */
        setUserState(state, res) {
            if (res.result === 'success') {
                state.isLogin = 1
                state.userInfo = res.memberinfo

            } else {
                state.isLogin = 0
                state.userInfo = {}
            }
            state.userReady = true
        }
    },
    actions: {
        /**
         * 更新机构State
         */
        updateStoreState(store, params) {
            return new Promise(resolve => {
                getWxDetail(params).then(res => {
                    store.commit('setStoreState', res)
                    resolve(store.state)
                })
            })
        },
        /**
         * 更新会员信息
         */
        updateUserState(store) {
            return new Promise(resolve => {
                getUserInfo().then(res => {
                    let rand = Math.ceil(Math.random() * 10000000000);
                    res.memberinfo.headimg = `${res.memberinfo.headimg}?${rand}`;
                    store.commit('setUserState', res)
                    resolve(store.state.userInfo)
                })
            })
        }
    }
})

/**
 * 添加ready事件
 */
store.ready = function (callback) {
    if (this.state.storeReady && this.state.userReady) {
        callback(this.state);
    } else {
        setTimeout(() => {
            this.ready(callback)
        }, 100)
    }
}
store.dispatch('updateStoreState')
store.dispatch('updateUserState')
export default store
