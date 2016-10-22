const grid = {
    overflow:"hidden",
    marginLeft:"300px",
    width:"calc(100%-30px)",
    height:"100%",
}

export default {
    middleCol: {
        width: "50%",
        borderRight: "2px solid #ffc547",
        height: "100%",
        display: "inline-block",
        padding: "15px",
        WebkitOverflowScrolling: "touch",
    },
    grid: {
        leftbarOpen: [grid, {
            marginLeft: "300px",
        }],
        leftbarClosed: [grid, {
            marginLeft: "40px",
        }],
    },
}
