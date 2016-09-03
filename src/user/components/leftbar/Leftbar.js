import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import styles from "~/user/styles/leftbar";
import Button from "~/shared/components/forms/Button";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import AssignTask from "./AssignTask";
import Position from "./Position";
import ChangePosition from "./ChangePosition";
import { withCss } from "~/util/component";
import { fullName } from "~/util";
import { modalProps } from "~/util/modal";

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
                    <ButtonItem  
                        text="Position"
                        onClick={() => this.setState({ isChangePosition: true})} //idea to change position if admin by clicking button
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
                    <Item>
                        <ChangePosition />
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
                    {fullName(this.state.user)}
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
                    { ...modalProps(this, "isEditProfileOpen") }
                />
                <ChangePassword
                    { ...modalProps(this, "isChangePasswordOpen") }
                />
                <AssignTask
                    { ...modalProps(this, "isAssignTaskOpen") }
                />
                // Position causes leftBar to disappear
                //     position= this.state.user.position
                
                <ChangePosition 
                    style={styles.ChangePosition}
                />
            </div>
        )
    }
}
