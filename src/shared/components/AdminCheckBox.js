import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import CheckBox from "~/shared/components/forms/CheckBox";

const AdminCheckBox = Radium((props) => {
    return (
      <div style={props.condition ? {} : {display: "none"}}>
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
      </div>
    )
})

AdminCheckBox.propTypes = {
    onChange: React.PropTypes.func,
    condition: React.PropTypes.checked,
    checked: React.PropTypes.checked,
}

export default AdminCheckBox;
