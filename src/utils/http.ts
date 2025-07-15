import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "@/store";
import type { StateAll } from "@/store";

// dev/
// http://api.h5ke.top/
const instance = axios.create({
    baseURL: 'dev/',
    timeout: 5000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.headers) {
        config.headers["Authorization"] = (store.state as StateAll).users.token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

interface Data {
    [index: string]: unknown
}
interface Http {
    get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
    delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: Http = {
    get(url, data, config) {
        return instance.get(url, {
            params: data,
            ...config
        });
    },
    post(url, data, config) {
        return instance.post(url, data, config);
    },
    put(url, data, config) {
        return instance.put(url, data, config);
    },
    patch(url, data, config) {
        return instance.patch(url, data, config);
    },
    delete(url, data, config) {
        return instance.delete(url, {
            data,
            ...config
        });
    }
}

export default http;