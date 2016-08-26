import React from "react";
import Radium from "radium";

import styles from "~/group/styles";

@Radium
export default class GroupHeadings extends React.Component {

    static propTypes = {
        group: React.PropTypes.object,
    }

    renderPublicLabel = () => {
      if(this.props.group.isPublic) {
        return <div>Public Group</div>
      } else {
        return <div>Private Group</div>
      }
    }

    render() {
        return (
            <div>
                <h1 style={styles.groupName}>
                    {this.props.group.name}
                </h1>
                <h4 style={styles.groupType}>{this.renderPublicLabel()}</h4>
            </div>
        )
    }

}
