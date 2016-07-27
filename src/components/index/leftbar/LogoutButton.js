import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import LeftbarButton from "./LeftbarButton"

@Radium
export default class LogoutButton extends React.Component {

    onClick = async() => {
        try {
            let { data } = await ajax.request("post", "/logout");
            if (data == "success") {
                window.location.assign("/login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <LeftbarButton text="Log Out" onClick={this.onClick} />
        )
    }
}
