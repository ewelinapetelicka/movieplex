export function addMinutesToStringTime(time: string, minutes: number): string {

    const hoursInMinutes = (parseInt(time.slice(0, 2))) * 60;
    const minutesFromString = parseInt(time.slice(3, 5));
    const totalMinutes = hoursInMinutes + minutesFromString + minutes;
    let newHours: string | number = Math.floor(totalMinutes / 60)
    if (newHours > 23) {
        newHours = newHours % 24;
    }
    if (newHours < 10) {
        newHours = "0" + newHours;
    }
    const newMinutes = Math.floor(totalMinutes % 60) < 10 ? "0" + Math.floor(totalMinutes % 60) : Math.floor(totalMinutes % 60)
    return newHours + ":" + newMinutes;

}

export function createDateFromTime(time: string) {
    const timeArr = time.split(":");
    const epoch = new Date().setHours(parseInt(timeArr[0]), parseInt(timeArr[1]));
    return new Date(epoch);

}