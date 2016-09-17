const setTeamSync = (team) => {
    return {
        type: "SET_TEAM",
        team,
    }
}

export const setTeam = (team) => {
    return (dispatch) => {
        return dispatch(setTeamSync(team));
    }
}
