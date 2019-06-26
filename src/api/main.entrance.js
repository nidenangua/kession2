import axios from 'axios'
import Main from '../main'
function setNoPowerPage() {
    let body = document.getElementsByTagName('body')[0];
    body.innerHTML = `
        <div class="ktj-nopower">
            对不起，您暂无该页面的访问权限
            <div class="ktj-red ktj-mt10 ktj-cursor-pointer" onclick="location.href='/home.php'">点我回首页</div>
        </div>
    `
}

function dellError(data, config) {
    if (data.result === 'error') {
        if (data.code === 'nopower') {
            setNoPowerPage()

        } else if (data.code === 'nologin' && data.url) {
            top.location.href = data.url

        } else if (config.isErrorCall) {
            return true
        } else {
            Main.$msg(data.msg)
        }
    } else {
        return true
    }

}

export function $post(act, params, config = {}) {
    return new Promise(resolve => {
        let url = config.isCompleteRoute ? act : `/Json/index.php?act=${act}`

        axios.post(url, params).then(res => {
            let pathKeys = act.split('.');
            let key = pathKeys[pathKeys.length - 1];
            let data = res.data[key] ? res.data[key] : res.data;

            if (dellError(data, config)) {
                resolve(data)
            }
        })
    })
}

export function $get(act, params, config = {}) {
    return new Promise(resolve => {
        let obj = '';
        if (params) {
            obj = {
                params: params
            }
        }
        let url = config.isCompleteRoute ? act : `/Json/index.php?act=${act}`
        axios.get(url, obj).then(res => {
            let pathKeys = act.split('.');
            let key = pathKeys[pathKeys.length - 1];
            let data = res.data[key] ? res.data[key] : res.data;
            if (dellError(data, config)) {
                resolve(data)
            }
        })
    })
}
