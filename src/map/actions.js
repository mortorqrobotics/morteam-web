const setTeamSync = (team) => {
    return {
        type: "SET_TEAM",
        team,
    }
}

export const setTeam = (team) => {
    console.log(team);
    return (dispatch) => {
        return dispatch(setTeamSync(team));
    }
}
