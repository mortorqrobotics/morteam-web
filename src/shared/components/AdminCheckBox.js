import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import CheckBox from "~/shared/components/forms/CheckBox";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Tooltip from "react-bootstrap/lib/Tooltip";
import styles from "~/shared/styles/audience"

const RadiumGlyphicon = Radium(Glyphicon);
const tooltip=(
    <Tooltip id="AdminCheckBox">
        <span style={styles.adminCheckBox.tooltip}>
            Add only admin members of the selected teams
        </span>
    </Tooltip>
);

const AdminCheckBox = Radium((props) => {
    return (
      <div style={props.condition ? styles.adminCheckBox.wrapper : {display: "none"}}>
          <CheckBox
              id="modal-checkbox"
              checked={props.checked}
              onChange={props.onChange}

          />
          Admin only?
          <OverlayTrigger
              placement="top"
              overlay={tooltip}
          >
              <RadiumGlyphicon glyph="info-sign" style={styles.adminCheckBox.glyph} />
          </OverlayTrigger>
      </div>
    )
})

AdminCheckBox.propTypes = {
    onChange: React.PropTypes.func,
    condition: React.PropTypes.checked,
    checked: React.PropTypes.checked,
}

export default AdminCheckBox;
