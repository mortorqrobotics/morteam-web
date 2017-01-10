import axios from "axios";

let ajax = {};
export default ajax;

export function request(method, path, data) {
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
}

ajax.request = request;
