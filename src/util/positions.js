export const positions = ["leader", "member", "mentor", "alumnus"];

export function getPlural(position) {
    if (position == "alumnus") {
        return "alumni";
    } else {
        return position + "s";
    }
}
