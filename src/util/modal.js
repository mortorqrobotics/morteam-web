import React from "react";

export const modalPropTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    onAfterOpen: React.PropTypes.func.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
}

export const modalProps = (self, str) => {
    return {
        isOpen: self.state[str],
        onAfterOpen: () => self.setState({ [str]: true }),
        onRequestClose: () => self.setState({ [str]: false }),
    }
}

export const modalPropsForward = (self) => {
    return {
        isOpen: self.props.isOpen,
        onAfterOpen: self.props.onAfterOpen,
        onRequestClose: self.props.onRequestClose,
    }
}
