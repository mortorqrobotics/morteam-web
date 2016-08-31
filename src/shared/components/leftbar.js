import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import styles, { dropdown } from "~/shared/styles/leftbar";

export const LeftbarContainer = Radium((props) => {
    return (
        <div style={styles.div}>
            <ul style={styles.ul}>
                {props.children}
            </ul>
        </div>
    )
})

export const LeftbarItem = withCss("li", styles.li);

export const LeftbarButton = Radium((props) => {
    const { isSelected, style, ...rest } = props;
    let newStyle = style ? [styles.button, style] : styles.button;
    if (props.isSelected) {
        newStyle = [newStyle, styles.selected];
    }
    return React.createElement("li", {
        style: newStyle,
        ...rest,
    })
})

export const Dropdown = Radium((props) => {
    const { isOpen, options, selectedOption, text, onClick, onOptionClick, ...rest } = props;
    let buttonStyle = dropdown.button;
    let menu;
    if (props.isOpen) {
        buttonStyle = [buttonStyle, dropdown.buttonShadow]
        menu = (
            <ul style={dropdown.ul}>
                {props.options.map(option => (
                    <li
                        key={option}
                        style={option === props.selectedOption ?
                            [dropdown.option, dropdown.selected] : dropdown.option}
                        onClick={() => props.onOptionClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <div onClick={props.onClick}>
            <div style={buttonStyle}>
                {props.text}
                <span style={dropdown.caret} />
            </div>
            {menu}
        </div>
    )
})
