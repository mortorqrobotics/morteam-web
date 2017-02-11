import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import CheckBox from "~/shared/components/forms/CheckBox";
import styles from "~/shared/styles/audience"

const AdminCheckBox = Radium((props) => {
    return (
      <div style={props.condition ? styles.adminCheckBox.wrapper : {display: "none"}}>
          <CheckBox
              id="modal-checkbox"
              checked={props.checked}
              onChange={props.onChange}
          />
          <label
              htmlFor="modal-checkbox"
          >
              Admin Only?
          </label>
          <p>
              Selecting this textbox will create the chat with only the admin members of each team.
          </p>
      </div>
    )
})

AdminCheckBox.propTypes = {
    onChange: React.PropTypes.func,
    condition: React.PropTypes.checked,
    checked: React.PropTypes.checked,
}

export default AdminCheckBox;
