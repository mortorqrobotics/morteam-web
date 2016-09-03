import React from "react";
import Radium from "radium";

@Radium
export default class Position extends React.Component {
    
    static propTypes = {
        position: React.PropTypes.string,
    }
    
    render() {
        return (
           <div>
                {this.propTypes.position}
           </div>
        )
    }
    
}