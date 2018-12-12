// 引入jsonp 模块
import Commonjsonp from 'jsonp';

// 自定义 jsonp
export default function jsonp(url, data, option) {
    url += (url.indexOf("?") < 0 ? "?": "&") + getUrl(data);
    url.replace("?&", "?");
    return new Promise((resolve, reject) => {
        Commonjsonp(url, option, (err, data) => {
            if(!err) {
                resolve(data);
            } else {
                reject(err)
            }
        })
    })
}

// 定义拼接字符串函数
function getUrl(data) {
    let url = '';
    for(let i in data) {
        let val = data[i] != undefined ? data[i] : '';
        url += `${i}=${encodeURIComponent(val)}`
    }
    return url ? url.substring(1) : '';
}