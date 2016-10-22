import React from "react";
import Radium from "radium";

import Middle from "~/calendar/components/middle/Middle";
import Right from "~/calendar/components/right/Right";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import styles from "~/calendar/styles";

import { connect } from "react-redux";

const RadiumGrid = Radium(Grid);

@Radium
class Container extends React.Component {

    render() {
        return (
            <RadiumGrid
                fluid={true}
                style={ this.props.isLeftbarOpen ? styles.grid.leftbarOpen : styles.grid.leftbarClosed }
            >
                <Row style={{height:"100%",width:"100%"}}>
                    <Col sm={2} style={styles.middleCol}>
                        <Middle />
                    </Col>
                    <Col sm={2} style={{width:"50%"}}>
                        <Right />
                    </Col>
                </Row>
            </RadiumGrid>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLeftbarOpen: state.isLeftbarOpen,
    }
}

export default connect(mapStateToProps)(Container);
