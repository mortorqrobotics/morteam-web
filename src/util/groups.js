import { capitalize } from "~/util";
import { getPlural } from "~/util/positions";

export function getGroupName(group) {
    switch (group.__t) {
        case "NormalGroup":
            return group.name;
        case "PositionGroup":
            return capitalize(getPlural(group.position));
        case "AllTeamGroup":
            return "Entire Team";
    }
}
