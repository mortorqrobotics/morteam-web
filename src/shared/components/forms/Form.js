import React from "react";
import Radium from "radium";

const Form = (props) => {
    return React.createElement("form", {
        action: "javascript:void 0",
        ...props,
    })
}
export default Radium(Form);
