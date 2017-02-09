import React from "react";
import Radium from "radium";

import Middle from "~/calendar/components/middle/Middle";
import Right from "~/calendar/components/right/Right";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import styles from "~/calendar/styles";
import { allMonths } from "~/util/date";

import { connect } from "react-redux";

const RadiumGrid = Radium(Grid);
const RadiumCol = Radium(Col);

@Radium
class Container extends React.Component {

    render() {
        return (
            <RadiumGrid
                fluid={true}
                style={ this.props.isLeftbarOpen ? styles.grid.leftbarOpen : styles.grid.leftbarClosed }
            >
                <div style={styles.monthDisplay}>{allMonths[this.props.month]}</div>
                <Row style={{height:"100%",width:"100%"}}>
                    <RadiumCol xs={2} style={styles.middleCol}>
                        <Middle />
                    </RadiumCol>
                    <RadiumCol xs={2} style={styles.rightCol}>
                        <Right />
                    </RadiumCol>
                </Row>
            </RadiumGrid>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLeftbarOpen: state.isLeftbarOpen,
        month: state.absMonth.month,
    }
}

export default connect(mapStateToProps)(Container);
