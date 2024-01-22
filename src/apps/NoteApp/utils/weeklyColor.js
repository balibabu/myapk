export default function weeklyColor() {
    const Colors = [
        "#a2d2ff",
        "#d4a373",
        "#a7c957",
        "#ff8fab",
        "#c77dff",
        "#2ec4b6",
        "#ffea00"]

    const currentDate = new Date();
    const day = currentDate.getDay();
    return Colors[day];
}

