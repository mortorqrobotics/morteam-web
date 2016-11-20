import { defaultColor, selectedColor } from "~/shared/styles/colors";

export default {
    backgroundColor: defaultColor,
    borderRadius: "1px",
    ":hover": {
        backgroundColor: selectedColor,
    },
    ":focus": {
        outline: "none",
    },
}
