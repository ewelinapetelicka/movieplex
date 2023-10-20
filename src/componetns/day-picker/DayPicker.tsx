import {Button, ButtonType} from "../common/button/Button";
import {useState} from "react";

interface DayPickerProps {
}

export function DayPicker(props: DayPickerProps) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [dayClicked, setDayClicked] = useState(new Date().getDay());

    function clicked(day: number): ButtonType {
        if (day === dayClicked ) {
            return ButtonType.GRAY_CLICKED
        }
        return ButtonType.GRAY
    }

    return (
        <div>
            <Button type={clicked(new Date().getDay())} onClick={() => {
                setDayClicked(new Date().getDay())
            }}>TODAY</Button>
            <Button type={clicked((new Date().getDay() + 1) % 7 )} onClick={() => {
                setDayClicked((new Date().getDay() + 1) % 7)
            }}>TOMORROW</Button>
            <Button type={clicked((new Date().getDay() + 2) % 7 )}  onClick={() => {
                setDayClicked((new Date().getDay() + 2) % 7)
            }}>{days[(new Date().getDay() + 2) % 7]}</Button>
            <Button type={clicked((new Date().getDay() + 3) % 7 )}  onClick={() => {
                setDayClicked((new Date().getDay() + 3) % 7)
            }}>{days[(new Date().getDay() + 3) % 7]}</Button>
            <Button type={clicked((new Date().getDay() + 4) % 7 )}  onClick={() => {
                setDayClicked((new Date().getDay() + 4) % 7)
            }}>{days[(new Date().getDay() + 4) % 7]}</Button>
            <Button type={clicked((new Date().getDay() + 5) % 7 )}  onClick={() => {
                setDayClicked((new Date().getDay() + 5) % 7)
            }}>{days[(new Date().getDay() + 5) % 7]}</Button>
            <Button type={clicked((new Date().getDay() + 6) % 7 )} onClick={() => {
                setDayClicked((new Date().getDay() + 6) % 7)
            }}>{days[(new Date().getDay() + 6) % 7]}</Button>
        </div>
    )
}