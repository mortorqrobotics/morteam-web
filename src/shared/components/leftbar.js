import React from "react";
import Radium from "radium";

import { withCss } from "~/util/component";
import styles, { dropdown } from "~/shared/styles/leftbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

const RadiumGlyphicon = Radium(Glyphicon);

export const LeftbarContainer = Radium((props) => {
    let { isOpen, onToggle } = props;
    return (
        <div>
            <div style={[styles.div, !props.isOpen && { display: "none" } ]}>
                <ul style={styles.ul}>
                    {props.children}
                </ul>
            </div>
            <RadiumGlyphicon
                glyph={props.isOpen ? "chevron-left" : "chevron-right"}
                onClick={props.onToggle}
                style={[styles.hideLeftbar.button, {
                    left: props.isOpen ? styles.hideLeftbar.left.open : styles.hideLeftbar.left.closed
                }]}
            />
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
    const { isOpen, options, selectedOption, text, onClick, style, listStyle, onOptionClick, ...rest } = props;
    let buttonStyle = dropdown.button;
    let menu;
    if (props.isOpen) {
        buttonStyle = [buttonStyle, dropdown.standardBoxShadow]
        menu = (
            <ul style={[dropdown.ul, listStyle]}>
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
            <div style={[buttonStyle, style]}>
                {props.text}
                <span style={dropdown.caret} />
            </div>
            <br />
            {menu}
        </div>
    )
})
