import axios from 'axios';// 引 入 axios
import router from "@/router";//引入路由
import Vue from 'vue'//引入 Vue
let V = new Vue();

//http request 请求拦截器
axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("token"); //从本地获取 token
        const rank = window.localStorage.getItem("rank");//从本地获取 rank
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json',
            "rank": rank,
            'token': token
        }//设置请求头信息 return config;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);



//http response 响应拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.code == 505){
            router.push({
                path:"/",
                query:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
            })
            V.$message.error('登录失效>.<,请重新登录');
        }
        if(response.data.errCode ==2){
            router.push({
                path:"/login",
                query:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
            })
        }
        return response;
    },

    error => {
        return Promise.reject(error)
    }
)


/**
 *封装 get 方法
 *@param url
 *@param data
 *@returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err  => {
                reject(err)
            })
    })
}


/**
 *封装 post 请求
 *@param url
 *@param data
 *@returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.post(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })

}

/**
 *封装 patch 请求
 *@param url
 *@param data
 *@returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 *封装 put 请求
 *@param url
 *@param data
 *@returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}