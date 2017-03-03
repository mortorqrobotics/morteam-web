import React from "react";
import { toggleLeftbar } from "~/shared/actions";

export const leftbarProps = (self) => {
    return {
        isOpen: self.props.isLeftbarOpen,
        onToggle: () => self.props.dispatch(toggleLeftbar()),
    }
}
