import React from "react";
import Radium from "radium";

const ErrorMsg = (props) => {
    let { message, ...rest } = props;
    return React.createElement("span", {
        children: message,
        ...rest,
    })
}

export default Radium(ErrorMsg);
