import axios, { CancelToken } from "axios";

let ajax = {};
export default ajax;

export function request(method, path, data, cancellable) {
    if (arguments.length === 3 && typeof data === "boolean") {
        cancellable = data;
        data = undefined;
    }
    if (!cancellable) {
        if (method === "GET" && data) {
            return axios.get("/api" + path, {
                params: data,
            }).catch(err => {
                console.log(err.response);
                throw err;
            });
        }
        return axios({
            method: method,
            url: "/api" + path,
            data: data,
        }).catch(err => {
            console.log(err.response);
            throw err;
        });
    } else {
        let cancel;
        return {
            req:
                method === "GET" && data ?
                axios.get("/api" + path, {
                    params: data,
                    cancelToken: new CancelToken(c => cancel = c)
                }).catch(err => {
                    console.log(err.response);
                    throw err;
                }) :
                axios({
                    method: method,
                    url: "/api" + path,
                    data: data,
                    cancelToken: new CancelToken (c => cancel = c)
                }).catch(err => {
                    console.log(err.response);
                    throw err;
                }),
            cancel: () => cancel(),
        }
    }
}

ajax.request = request;
