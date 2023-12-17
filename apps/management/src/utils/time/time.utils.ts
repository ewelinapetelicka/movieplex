import {Simulate} from "react-dom/test-utils";

export function addMinutesToStringTime(time: string, minutes: number): string {
    /*const [hours, minutesString] = time.split(':');
    const minutesNumber = parseInt(minutesString, 10);
    const totalMinutes = parseInt(hours, 10) * 60 + minutesNumber + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${newHours}:${newMinutes < 10 ? '0' : ''}${newMinutes}`;*/

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
