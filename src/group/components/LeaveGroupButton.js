import React from "react";
import Radium from "radium";

import Button from "~/shared/components/forms/Button";

@Radium
export default class LeaveGroupButton extends React.Component {
    
    render() {
        return (
            <Button value="Leave" />
        )
    }
}
