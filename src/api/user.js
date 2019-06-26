import { $post } from './main.entrance'

/**
 * 获取基本信息
 */
export function getUserInfo(params) {
    return new Promise((resolve) => {
        $post(`Users.Common.getUserInfo`, params, {
            isErrorCall: true
        }).then(data => {
            resolve(data)
        })

    })
}
/**
 * 获取机构消息数量
 */
export function getMsgNum(params) {
    return new Promise((resolve) => {
        $post(`Users.Store.getMsgNum`, params, {
            isErrorCall: true
        }).then(data => {
            resolve(data)
        })

    })
}
