import React from "react"; // does need to be here

import styles from "~/styles/void";
import { withCss, withProps } from "~/util/component";

import Button from "~/components/shared/forms/Button";
import TextBox from "~/components/shared/forms/TextBox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

export const VoidRow = withCss(Row, styles.row);

export const ButtonCol = withProps(Col, {
    sm: 6,
    style: styles.first.buttonCol,
})

export const VoidButton = withCss(Button, styles.button);

export const VoidTextBox = withCss(TextBox, styles.textBox);

export const MessageBox = withCss("h3", styles.message);

export const CenteredDiv = withCss("div", styles.centered);

export const BackButton = (props) => (
    <VoidButton
        text="Back"
        onClick={props.onBack}
    />
)
