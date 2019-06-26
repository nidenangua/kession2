/**
 * 遍历
 */
function domap(data, callback) {
    for (let i = 0; i < data.length; i++) {
        typeof callback === 'function' && callback(data[i], i)
    }
}
/**
 * 判断数据是数组还是对象
 */
function isArrayOrObject(data) {
    let callType = Object.prototype.toString.call(data)
    let type = false
    if (callType === '[object Array]') {
        type = 'Array'
    } else if (callType === '[object Object]') {
        type = 'Object'
    }
    return type
}
/**
 * 拷贝对象
 * @param {Object} 要拷贝的对象
 */
function cloneObject(obj) {
    let newObj = new Object();
    let keys = Object.keys(obj);
    domap(keys, key => {
        let item = obj[key];
        let itemCallType = isArrayOrObject(item)
        if (itemCallType === 'Array') {
            let arrItem = cloneArray(item)
            newObj[key] = arrItem
        } else if (itemCallType === 'Object') {
            let objItem = cloneObject(item)
            newObj[key] = objItem
        } else {
            newObj[key] = item
        }
    })
    return newObj
}

/**
 * 拷贝数组
 */
function cloneArray(arr) {
    let newArr = new Array();
    domap(arr, item => {
        let itemCallType = isArrayOrObject(item)
        if (itemCallType === 'Array') {
            let arrItem = cloneArray(item)
            newArr.push(arrItem)
        } else if (itemCallType === 'Object') {
            let objItem = cloneObject(item)
            newArr.push(objItem)
        } else {
            newArr.push(item)
        }
    })

    return newArr
}

/**
 * 深度克隆数据
 */
function cloneData(data) {
    let dataCallType = isArrayOrObject(data);
    let newData = dataCallType === 'Array' ? cloneArray(data) : cloneObject(data);
    return newData
}

/**
 * 删除数组
 * @param {Array} 
 * @param {Number}
 */
function deleteArray(data, index) {
    let arr = new Array();
    domap(data, (item, i) => {
        if (i !== index) {
            arr.push(item)
        }
    })
    return arr
}

/**
 * 删除对象
 */
function deleteObject(obj, key) {
    let keys = Object.keys(obj);
    let newObj = {};
    domap(keys, k => {
        if (k !== key) {
            newObj[k] = obj[k]
        }
    })
    return newObj
}

/**
 * 监听是否滚动到底部
 */
function getIsScrolltolower(el) {
    var isScrolltolower = false;

    if (el) {
        if (el.scrollTop + el.offsetHeight >= el.scrollHeight) {
            isScrolltolower = true
        }

    } else {
        if (window.scrollY + window.innerHeight >= document.getElementsByTagName('body')[0].scrollHeight) {
            isScrolltolower = true
        }
    }

    return isScrolltolower
}

/*
 *获取合适的大小
 *containerArea 容器宽高
 *contentArea 内容宽高
 */
function getSuitableArea(containerArea, contentArea) {

    let scale = contentArea.width / contentArea.height,
        w, h,
        containerScale = containerArea.width / containerArea.height;

    if (scale > containerScale) {
        w = containerArea.width;
        h = contentArea.height * (containerArea.width / contentArea.width)

    } else {
        h = containerArea.height;
        w = contentArea.width * (containerArea.height / contentArea.height)
    }

    return {
        width: w,
        height: h
    }
}
/**
 * 过滤html标志
 */
function filterHtml(code) {
    let newCode = code.replace(/style.+?>/g, '>');
    return newCode
}
/**
 * 数字限制
 */
function limitNumber(obj, key, num) {
    let v = obj[key];
    if (!v) {
        return false
    }
    var t = v.toString().match(/\d+/g);
    var nv = '';
    domap(t, s => {
        nv += s
    })

    if (parseInt(nv) > num) {
        nv = num;
    }
    obj[key] = nv
}


function getIdNodeNameByAct(act) {
    let keyName;
    switch (act) {
        case 'appCourse':
            keyName = 'courseid'
            break
        case 'appClass':
            keyName = 'classid'
            break
        case 'appColumn':
            keyName = 'columnid'
            break
        case 'appPaper':
            keyName = 'paperId'
            break
        default:
            keyName = 'id'
    }
    return keyName
}
/**
 * 获取默认值
 */
function getDefaultValue(value, defaultValue = '') {
    return value === undefined ? defaultValue : value
}

export {
    domap,
    getIsScrolltolower,
    isArrayOrObject,
    cloneObject,
    cloneArray,
    cloneData,
    deleteArray,
    deleteObject,
    filterHtml,
    getSuitableArea,
    limitNumber,
    getIdNodeNameByAct,
    getDefaultValue
}