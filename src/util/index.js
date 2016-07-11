export function fixThis(obj) {
    for (let key of Object.getOwnPropertyNames(obj.constructor.prototype)) {
        if (key === "constructor" ||
            key === "render" ||
            typeof obj[key] !== "function") {
            continue;
        }
        obj[key] = obj[key].bind(obj);
    }
}
