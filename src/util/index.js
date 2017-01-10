import React from "react";

export function makeChangeHandlerFactory(ctx) {
    let handlerCache = {};
    return function(name, propName) {
        if (handlerCache[name]) {
            return handlerCache[name];
        } else {
            handlerCache[name] = (event) => {
                let obj = {};
                obj[name] = event.target[propName || "value"];
                this.setState(obj);
            }
            return handlerCache[name];
        }
    }.bind(ctx);
}

export const REDIR_TIME = 700;

export const range = (a, b) => {
    const arr = [];
    while (a < b) arr.push(a++);
    return arr;
}

export const fullName = (user) => {
    return user.firstname + " " + user.lastname;
}

export const otherUser = (users, ownId) => {
    if (users[0]._id == ownId) {
        return users[1]
    } else {
        return users[0]
    }
}

// useful for debugging method chains
Object.defineProperty(Object.prototype, "_tap", {
    value: function(func) {
        func(this);
        return this;
    },
    enumerable: false,
});

export function reverse(arr) {
    const result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    return result;
}

export function last(arr) {
    return arr[arr.length - 1];
}

export function flatMap(arr, func) {
    const result = [];
    for (const elem of arr) {
        Array.prototype.push.apply(result, func(elem));
    }
    return result;
}

export function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

export function getRandomString() {
    return Math.round(Math.random() * 1e10).toString();
}

export function getAudienceIds(audience) {
    return {
        users: audience.users.map(user => user._id),
        groups: audience.groups.map(group => group._id),
    }
}

export function userSearch(search) {
    return (user) => {
        if (search === "") {
            return true;
        }
        const words = search.trim().split(/\s+/);
        const regex = new RegExp(words.join(".*"), "i");
        const name = fullName(user);
        return regex.test(name);
    }
}

export const currentUser = window.__userInfo;
if (currentUser && typeof currentUser === "object") {
    currentUser.isAdmin = () => (
       currentUser.position === "leader" || currentUser.position === "mentor"
    )
}
export const pageOptions = window.__options;
