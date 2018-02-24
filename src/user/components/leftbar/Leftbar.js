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
import ProfilePicture from "~/shared/components/ProfilePicture";
import { withCss } from "~/util/component";
import { fullName, currentUser, pageOptions } from "~/util";
import { modalProps } from "~/util/modal";
import {
    mainURL as site
 } from "config";

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

    componentDidMount = async () => {
        //        try {
        const { data } = await ajax.request("GET",
            "/users/id/" + pageOptions.userId
        );
        this.setState({
            loaded: true,
            user: data,
        })
        //        } catch (err) {
        //            // TODO: deal with the case where the user does not exist
        //            console.log(err);
        //        }
    }

    renderConditionalButtons = () => {
        if (currentUser._id == this.state.user._id) {
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
        }
        if (currentUser.isAdmin()) {
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

    renderProfilePic = () => {
        let isCurrentUser = currentUser._id === this.state.user._id;
        return (
            <ProfilePicture
                user={this.state.user}
                picSize="large"
                frameSize={150}
                hasIndicator={!isCurrentUser}
                style={isCurrentUser ? styles.img : { margin: styles.img.margin }}
            />
        )
    }

    renderPositionView = () => {
        if (currentUser.isAdmin()) {
            return (
                <ChangePosition
                    initialPosition={this.state.user.position}
                />
            )
        } else {
            return (
                <Position
                    position={this.state.user.position}
                />
            )
        }
    }

    render() {
        if (!this.state.loaded) {
            return null;
        }
        return (
            <div style={styles.container}>
                {this.renderProfilePic()}
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
                        "http://www.scout." + site + "/profile.html?id="
                        + pageOptions.userId
                    )}
                />
                {this.renderConditionalButtons()}

                <Item>
                    {this.renderPositionView()}
                </Item>

                <EditProfile
                    { ...modalProps(this, "isEditProfileOpen") }
                />
                <ChangePassword
                    { ...modalProps(this, "isChangePasswordOpen") }
                />
                <AssignTask
                    { ...modalProps(this, "isAssignTaskOpen") }
                />
            </div>
        )
    }
}
