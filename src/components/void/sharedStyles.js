// TODO: do not keep this here

import React from "react"; // needs to be here
import Row from "react-bootstrap/lib/Row";

const sharedStyles = {
    width: "270px",
    height: "40px",
    border: "none",
    fontSize: "20px",
    textAlign: "center",
}
export default sharedStyles;

export const VoidRow = (props) => (
    <Row style={{ marginBottom: "7px" }}>
        {props.children}
    </Row>
)

