import React from "react";
import Radium from "radium";

import styles from "~/shared/styles/navbar";
import ProfileDropdownModal from "./ProfileDropdownModal";
import ProfilePicture from "~/shared/components/ProfilePicture";
import { currentUser } from "~/util";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import { toggleDropdown } from "~/shared/actions";
import { connect } from "react-redux";

@Radium
class RightLinks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        }
    }

    openModal = () => {
        this.setState({
            isModalOpen: true
        })
    }
    
    render() {
        return (
            <div style={styles.rightLinks.container}>
                <li style={styles.navbarDropdown.li} onClick={() => this.props.dispatch(toggleDropdown())}>
                    <Glyphicon glyph="menu-hamburger" />
                </li>
                <ProfilePicture
                    user={currentUser}
                    picSize="small"
                    frameSize={30}
                    style={styles.profileDropdown.profPic}
                    onClick={this.openModal}
                />
                <span
                    style={styles.profileDropdown.span}
                    onClick={this.openModal}
                >
                    {currentUser.firstname}
                </span>

                <ProfileDropdownModal
                    isOpen={this.state.isModalOpen}
                    onAfterOpen={() => this.setState({ isModalOpen: true })}
                    onRequestClose={() => this.setState({ isModalOpen: false })}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDropdownOpen: state.isDropdownOpen,
    }
}

export default connect(mapStateToProps)(RightLinks);

