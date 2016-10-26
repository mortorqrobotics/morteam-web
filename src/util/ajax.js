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

export function tbaRequest(path) {
	return axios({
        method: "get",
        url: "https://www.thebluealliance.com/api/v2" + path,
		headers : {"X-TBA-App-Id" : "frc1515:MorTeam:1"}
    });
}
ajax.request = request;

