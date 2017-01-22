import axios, { CancelToken } from "axios";

let ajax = {};
export default ajax;

export function request(method, path, data, cancellable) {
    if (arguments.length === 3) {
        cancellable = data;
        data = undefined;
    }
    if (!cancellable) {
        if (method === "GET" && data) {
            return axios.get("/api" + path, {
                params: data,
            });
        }
        return axios({
            method: method,
            url: "/api" + path,
            data: data,
        });
    } else {
        let cancel;
        return {
            req:  
                method === "GET" && data ? 
                axios.get("/api" + path, {
                    params: data,
                    cancelToken: new CancelToken(c => cancel = c)
                }) : 
                axios({
                    method: method,
                    url: "/api" + path,
                    data: data,
                    cancelToken: new CancelToken (c => cancel = c)  
                }),
            cancel: () => cancel(),
        }
    }
}

ajax.request = request;

