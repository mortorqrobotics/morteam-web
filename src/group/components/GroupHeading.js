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
                    {this.renderPublicLabel()}
                </h1>
                <h4>{this.props.group.isPublic}</h4>
            </div>
        )
    }

}
