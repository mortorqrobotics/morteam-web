import axios from "axios";
import cancelAdapter from "axios-cancel";
import { Cancellation } from "axios-cancel/cancel";

let ajax = {};
export default ajax;

export function request(method, path, data) {
    return axios({
        method: method,
        url: path,
        data: data,
    });
}
ajax.request = request;

export function cancellableRequestFactory() {
    let cancellation = null;
    let reqFactory = (method, path, data) => {
        if (cancellation) {
            cancellation.cancel();
        }
        cancellation = new Cancellation();
        return axios({
            method: method,
            url: path,
            data: data,
            adapter: cancelAdapter,
            cancellation: cancellation,
        }).then(x => {
            cancellation = null;
            return x;
        });
    };
    reqFactory.cancel = () => {
        if (cancellation) {
            cancellation.cancel();
        }
    };
    return reqFactory;
}

/* usage:

   this.makeReq = cancellableRequestFactory();
   ...
   let { data } = yield this.makeReq("GET", "/stuff");

   to cancel use
   this.makeReq.cancel();

*/
