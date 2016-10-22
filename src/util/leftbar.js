import React from "react";
import { openLeftbar, closeLeftbar } from "~/shared/actions";

function onToggle(self, str) {
    self.setState({ [str]: !self.state[str] });
    if (self.state[str]) {
        self.props.dispatch(closeLeftbar());
    } else {
        self.props.dispatch(openLeftbar());
    }
}

export const leftbarProps = (self, str) => {
    return {
        isOpen: self.state[str],
        onToggle: () => onToggle(self, str)
    }
}
