import { defaultColor } from "~/shared/styles/colors";

export function getSize(file) {
    let bytes = file.size;
    let units = ['Bytes', 'KB', 'MB'];
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Number((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + units[i];
}

export function getColor(file) {
    switch (file.type) {
        case "image":
            return "#b9b9b9"
        case "word":
            return "#268dd7"
        case "pdf":
            return "#FF5930"
        case "audio":
            return "#ff6666"
        case "keynote":
            return "#c62400"
        case "spreadsheet":
            return "#33B533"
        default:
            return defaultColor
    }
}

export function getHoverColor(file) {
    switch (file.type) {
        case "image":
            return "#A0A0A0"
        case "word":
            return "#0D74BE"
        case "pdf":
            return "#E64017"
        case "audio":
            return "#E64D4D"
        case "keynote":
            return "#AD0B00"
        case "spreadsheet":
            return "#1A9C1A"
        default:
            return "#E6AC24"
    }
}

export function getPreviewSrc(file) {
    if (file.type === "image") {
        return "api/files/id/" + file._id + "-preview";
    }
    return "images/" + file.type + ".png";
}
