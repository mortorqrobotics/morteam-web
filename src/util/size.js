export function getSize(file) {
    let bytes = file.size;
    let units = ['Bytes', 'KB', 'MB'];
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Number((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + units[i];
}
