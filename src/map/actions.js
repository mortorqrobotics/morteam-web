import { tbaRequest } from "~/util/ajax";

export const setTeam = (num) => (dispatch) => {
	const { data } = await tbaRequest("/teams/frc" + num);
	dispatch({
		type: "SET_TEAM",
		num: num,
		data: data,
	});
}