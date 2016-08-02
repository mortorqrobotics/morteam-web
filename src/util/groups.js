export function getGroupName(group) {
    switch (group.__t) {
        case "NormalGroup":
            return group.name;
        case "PositionGroup":
            if (group.position === "alumnus") {
                return "Alumni";
            }
            return group.position[0].toUpperCase() + group.position.slice(1) + "s";
        case "AllTeamGroup":
            return "Entire Team";
    }
}
