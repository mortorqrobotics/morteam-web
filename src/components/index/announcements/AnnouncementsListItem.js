import React from "react";
import Radium from "radium";

@Radium
export default class AnnouncementsListItem extends React.Component {

    static propTypes = {
        author: React.PropTypes.object, // User object
        content: React.PropTypes.string,
        audience: React.PropTypes.object,
        timestamp: React.PropTypes.object, // Date object
    }

    render() {
        return (
            <div>
				<div>
					{this.props.author.firstname} 
					{this.props.author.lastname}
					{this.props.timestamp.toLocaleString()}
					{this.props.audience.groups.map(group => (
						<p>{group.name}</p>
					))}
					{this.props.audience.users.map(user => (
						<p>{user.firstname}{user.lastname}</p>
					))}
				</div>
				<p>{this.props.content}</p>
			</div>
        )
    }

}
