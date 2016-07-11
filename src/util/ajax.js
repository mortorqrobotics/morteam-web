//import axios from "axios";

export default async function request(method, path, data) {
    return await axios({
        method: method,
        url: path,
        data: data
    });
};
