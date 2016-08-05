import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import styles from "~/styles/user/leftbar";

const Item = (props) => (
    <div style={styles.item}>
        {props.children}
    </div>
)

@Radium
export default class Leftbar extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            user: {},
            loaded: false,
        }
    }

    static contextTypes = {
        user: React.PropTypes.object,
        options: React.PropTypes.object,
    }

    componentDidMount = async() => {
        try {
            const { data } = await ajax.request("GET",
                "/users/id/" + this.context.options.userId
            );
            this.setState({
                loaded: true,
                user: data,
            })
        } catch (err) {
            // TODO: deal with the case where the user does not exist
            console.error(err);
        }
    }

    renderConditionalButtons = () => {
        if (this.context.user._id == this.state.user._id) {
            return (
                <div>
                    <Item>
                        put edit profile button here
                    </Item>
                    <Item>
                        put change password button here
                    </Item>
                </div>
            )
        } else if (this.context.user.isAdmin()) {
            return (
                <div>
                    <Item>
                        put assign task button here
                    </Item>
                </div>
            )
        }
    }

    renderIfAdmin

    render() {
        if (!this.state.loaded) {
            return null;
        }
        return (
            <div style={styles.container}>
                <img
                    src={this.state.user.profpicpath + "-300"}
                    style={styles.img}
                />
                <div style={styles.name}>
                    {this.state.user.firstname} {this.state.user.lastname}
                </div>
                <Item>
                    <span style={styles.emailPhone}>
                        {this.state.user.email}
                    </span>
                </Item>
                <Item>
                    <span style={styles.emailPhone}>
                        {this.state.user.phone}
                    </span>
                </Item>
                <Item>
                    View morscout profile
                </Item>
                {this.renderConditionalButtons()}
            </div>
        )
    }
}
