import React from "react";
import Radium from "radium";

const CheckBox = (props) => {
    return React.createElement("input", {
        type: "checkbox",
        ...props,
    })
}
export default Radium(CheckBox);
