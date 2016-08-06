import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import styles from "~/styles/user/leftbar";
import Button from "~/components/shared/forms/Button";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import AssignTask from "./AssignTask";
import { withCss } from "~/util/component";

const Item = withCss("div", styles.item);
const ButtonItem = (props) => (
    <Item>
        {React.createElement(Button, {
            style: styles.button,
            ...props,
        })}
    </Item>
)

@Radium
export default class Leftbar extends React.Component {

    state = {
        user: {},
        loaded: false,
        isEditProfileOpen: false,
        isChangePasswordOpen: false,
        isAssignTaskOpen: false,
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
                    <ButtonItem
                        text="Edit Profile"
                        onClick={() => this.setState({ isEditProfileOpen: true })}
                    />
                    <ButtonItem
                        text="Change Password"
                        onClick={() => this.setState({ isChangePasswordOpen: true })}
                    />
                </div>
            )
        } else if (this.context.user.isAdmin()) {
            return (
                <div>
                    <Item>
                        <ButtonItem
                            text="Assign Task"
                            onClick={() => this.setState({ isAssignTaskOpen: true })}
                        />
                    </Item>
                </div>
            )
        }
    }

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
                <ButtonItem
                    text="View MorScout Profile"
                    onClick={() => window.location.assign(
                        "http://www.scout.morteam.com/profile.html?id="
                        + this.context.options.userId
                    )}
                />
                {this.renderConditionalButtons()}

                <EditProfile
                    isOpen={this.state.isEditProfileOpen}
                    onAfterOpen={() => this.setState({ isEditProfileOpen: true })}
                    onRequestClose={() => this.setState({ isEditProfileOpen: false })}
                />
                <ChangePassword
                    isOpen={this.state.isChangePasswordOpen}
                    onAfterOpen={() => this.setState({ isChangePasswordOpen: true })}
                    onRequestClose={() => this.setState({ isChangePasswordOpen: false })}
                />
                <AssignTask
                    isOpen={this.state.isAssignTaskOpen}
                    onAfterOpen={() => this.setState({ isAssignTaskOpen: true })}
                    onRequestClose={() => this.setState({ isAssignTaskOpen: false })}
                />
            </div>
        )
    }
}
