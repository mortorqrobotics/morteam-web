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
