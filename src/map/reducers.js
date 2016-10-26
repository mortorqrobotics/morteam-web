const selectedTeam = (state = null, action) => {
    switch (action.type) {
        case "SET_TEAM":
            return {
				num: action.num,
				data: action.data,
			}
        default:
            return state
    }
}

export default {
    selectedTeam,
}
