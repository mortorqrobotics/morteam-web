import React from "react";

export const leftbarProps = (self, str) => {
    return {
        isOpen: self.state[str],
        onToggle: () => self.setState({ [str]: !self.state[str] }),
    }
}
