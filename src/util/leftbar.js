import React from "react";
import { toggleLeftbar } from "~/shared/actions";

function onToggle(self, str) {
    self.setState({ [str]: !self.state[str] });
    self.props.dispatch(toggleLeftbar());
}

export const leftbarProps = (self, str) => {
    return {
        isOpen: self.state[str],
        onToggle: () => onToggle(self, str)
    }
}
