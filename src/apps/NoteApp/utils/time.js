export default function convertTimestampToStringWithTime(timestampString) {
    const timestamp = parseInt(timestampString, 10); // Convert the string to an integer timestamp
    const date = new Date(timestamp);

    // Get date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');

    // Get time components
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}/${month}/${day}/ ${hours}:${minutes}:${seconds}`
    // [year, month, day, hours, minutes, seconds];
}