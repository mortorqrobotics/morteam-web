import { defaultOrange, selectedOrange } from "~/shared/styles/colors";

export default {
    backgroundColor: defaultOrange,
    border: "none",
    borderRadius: "1px",
    ":hover": {
        backgroundColor: selectedOrange,
    },
    ":focus": {
        outline: "none",
    },
}
