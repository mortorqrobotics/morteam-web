import axios from "axios";

let ajax = {};
export default ajax;

export function request(method, path, data) {
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
}
ajax.request = request;

