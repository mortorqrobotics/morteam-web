import React from "react";
import ReactDOM from "react-dom";

import { StyleRoot } from "radium";
import { Provider } from "react-redux";

const styles = {
    global: {
        margin: "0",
        padding: "0",
        fontFamily: "'exo 2', sans-serif",
        fontWeight: "200",
        outline: "0",
    },
}

export default class Root extends React.Component {

    static propTypes = {
        verticalAlignMiddle: React.PropTypes.bool,
        pageName: React.PropTypes.string.isRequired, // lowercase
        store: React.PropTypes.object,
    }

    static childContextTypes = {
        pageName: React.PropTypes.string,
    }

    getChildContext() {
        return {
            pageName: this.props.pageName,
        }
    }

    wrap = (contents) => {
        if (this.props.store) {
            return (
                <Provider store={this.props.store}>
                    <div>
                        {contents}
                    </div>
                </Provider>
            )
        } else {
            return contents;
        }
    }

    render() {
        return (
            <StyleRoot style={styles.global}>
                {this.wrap(this.props.children)}
            </StyleRoot>
        )
    }

}

export function pageInit(Page) {
    window.__pageInit = {
        React: React,
        ReactDOM: ReactDOM,
        Page: Page
    }
}
