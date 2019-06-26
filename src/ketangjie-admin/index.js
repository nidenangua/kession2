import KtjTitle from './KtjTitle'
import KtjContainer from './KtjContainer'
import KtjBox from './KtjBox'
import KtjCreateBg from './KtjCreateBg'
import KtjTableFooter from './KtjTableFooter'
import KtjProgress from './KtjProgress'
import KtjLoading from './ktj-loading/KtjLoading'
import KtjPartLoading from './ktj-loading/KtjPartLoading'
import KtjTipsDialog from './KtjTipsDialog'
import KtjEditor from './KtjEditor'
import KtjInputNumber from './KtjInputNumber'
const components = {
    install(Vue) {
        Vue.component('KtjLoading', KtjPartLoading)
        Vue.component('KtjTitle', KtjTitle)
        Vue.component('KtjContainer', KtjContainer)
        Vue.component('KtjBox', KtjBox)
        Vue.component('KtjCreateBg', KtjCreateBg)
        Vue.component('KtjTableFooter', KtjTableFooter)
        Vue.component('KtjEditor', KtjEditor)
        Vue.component('KtjInputNumber', KtjInputNumber)
        /**
         * loading
         */
        const KtjLoadingConstructor = Vue.extend(KtjLoading);
        const KtjLoadingModel = new KtjLoadingConstructor();
        KtjLoadingModel.$mount(document.createElement('div'));
        document.body.appendChild(KtjLoadingModel.$el);
        Vue.prototype.$showLoading = function () {
            KtjLoadingModel.visible = true
        }
        Vue.prototype.$hideLoading = function () {
            KtjLoadingModel.visible = false
        }

        /**
         * 进度条
         */
        const KtjProgressConstructor = Vue.extend(KtjProgress);
        const KtjProgressModel = new KtjProgressConstructor();
        KtjProgressModel.$mount(document.createElement('div'));
        document.body.appendChild(KtjProgressModel.$el);
        Vue.prototype.$showProgress = function (title, percentage) {
            KtjProgressModel.title = title
            KtjProgressModel.percentage = percentage
            KtjProgressModel.visible = true
        }
        Vue.prototype.$hideProgress = function () {
            KtjProgressModel.visible = false
            KtjProgressModel.percentage = 0
        }

        /**
         * 消息提示框
         */
        const KtjTipsDialogConstructor = Vue.extend(KtjTipsDialog);
        const KtjTipsDialogModel = new KtjTipsDialogConstructor();
        KtjTipsDialogModel.$mount(document.createElement('div'));
        document.body.appendChild(KtjTipsDialogModel.$el);

        Vue.prototype.$tipsDialog = function (content, params = {}) {
            KtjTipsDialogModel.visible = true
            KtjTipsDialogModel.content = content
            KtjTipsDialogModel.params = params
        }

    }
}

export default components