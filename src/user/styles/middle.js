import orangeButton from "~/shared/styles/orangeButton";
import { defaultColor } from "~/shared/styles/colors";
import { standardBoxShadow } from "~/shared/styles/boxShadows";

export default {
    grid: {
        overflow:"hidden",
        marginLeft: "200px",
        width:"calc(100%-300px)",
        height:"100%",
    },
    row: {
        height: "100%",
        width: "100%",
    },
    col: {
        width: "50%",
    },
    container: {
        backgroundColor: "#f5f5f5",
        top: "65px",
        position: "relative",
        paddingBottom: "3px",
        boxShadow: standardBoxShadow,
        marginLeft: "120px",
        '@media screen and (max-width: 800px)': {
            width: "150px",
            marginLeft: "10px",
        },
    },
    title: {
        margin: "5px 10px 5px 10px",
        fontSize: "20px",
        display: "inline-block",
        fontWeight: "300",
    },
    taskList: {
        overflow: "auto",
    },
    taskItem: {
        margin: "5px 10px 5px 33px",
        fontSize: "18px",
    },
    dueDate: {
        marginLeft: "5px",
        fontSize: "14px",
    },
    taskDescription: {
        paddingLeft: "5px",
        wordWrap: "break-word",
    },
    markCompleted: {
        backgroundColor: defaultColor,
        padding: "3px 8px 3px 8px",
        borderRadius: "1px",
        cursor: "pointer",
        fontSize: "12px",
        marginLeft: "5px",
        marginTop: "5px",
    },
    attendanceDataPoint: {
        margin: "10px 10px 5px 33px",
        fontSize: "18px",
        display: "inline-block",
    },
    attendanceDropdown: {
        margin: "5px",
    },
    refreshAttendance: [orangeButton, {
        marginLeft: "5px",
    }],
}
