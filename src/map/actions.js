import { request } from "~/util/ajax";

export const setTeam = (num) => async (dispatch) => {
	const { data } = await request("get", "/teams/number/" + num + "/info");
	dispatch({
		type: "SET_TEAM",
		num: num,
		data: data,
	});
}