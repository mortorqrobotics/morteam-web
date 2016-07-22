import React from "react";

export default class Form extends React.Component {

    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
        style: React.PropTypes.object,
    }

    render() {
        return (
            <form
                action="javascript:void 0"
                onSubmit={this.props.onSubmit}
                style={this.props.style}
            >
                {this.props.children}
            </form>
        )
    }

}
