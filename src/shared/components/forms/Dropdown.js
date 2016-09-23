import React from "react";
import Radium from "radium";

const Dropdown = Radium(props => {
    const { selected, onChange, options, display, ...rest } = props;
    return React.createElement("select", {
        value: selected,
        onChange: event => onChange(event.target.value),
        ...rest,
    }, ...options.map(opt => (
        <option key={opt} value={opt}>
            {(display || (x => x))(opt)}
        </option>
    )))
})

Dropdown.propTypes = {
    selected: React.PropTypes.any,
    options: React.PropTypes.array,
    display: React.PropTypes.func,
    onChange: React.PropTypes.func,
}

export default Dropdown;
