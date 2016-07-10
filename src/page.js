import React from "react";
import ReactDOM from "react-dom";

window.React = React;

ReactDOM.render(<div>hello</div>, document.getElementById("test"));

async function test() {
    await stuff();
    return 4;
}
test();

//global
requireAbs = function(path) {
    if (path[0] != "/") {
        path = "/" + path;
    }
    import thing from "./components" + path;
};
