import React from "react";
import Radium from "radium";

@Radium
export default class GroupMember extends React.Component {

    static propTypes = {
        name: React.PropTypes.string,
        profpicpath: React.PropTypes.string
    }

    render() {
        return (
            <div>
                <img src={this.props.profpicpath}/>
                {this.props.name}
            </div>
        )
    }

}
