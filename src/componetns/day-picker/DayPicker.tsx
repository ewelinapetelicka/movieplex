import {Button, ButtonType} from "../common/button/Button";
import {useState} from "react";
import {useDays} from "../../hooks/use-days/use-days";

interface DayPickerProps {
    dayClicked: (day: number) => void;
}

export function DayPicker(props: DayPickerProps) {
    const days = useDays();
    const [dayClicked, setDayClicked] = useState(new Date().getDay());

    function clicked(day: number): ButtonType {
        if (day === dayClicked) {
            return ButtonType.GRAY_CLICKED
        }
        return ButtonType.GRAY
    }

    return (
        <div className={"flex gap-2"}>
            <Button type={clicked(new Date().getDay())} onClick={() => {
                setDayClicked(new Date().getDay());
                props.dayClicked(new Date().getDay())
            }}>TODAY</Button>

            <Button type={clicked((new Date().getDay() + 1) % 7)} onClick={() => {
                setDayClicked((new Date().getDay() + 1) % 7);
                props.dayClicked((new Date().getDay() + 1) % 7)
            }}>TOMORROW</Button>

            <Button type={clicked((new Date().getDay() + 2) % 7)} onClick={() => {
                setDayClicked((new Date().getDay() + 2) % 7);
                props.dayClicked((new Date().getDay() + 2) % 7)
            }}>{days[(new Date().getDay() + 2) % 7]}</Button>

            <Button type={clicked((new Date().getDay() + 3) % 7)} onClick={() => {
                setDayClicked((new Date().getDay() + 3) % 7);
                props.dayClicked((new Date().getDay() + 3) % 7)
            }}>{days[(new Date().getDay() + 3) % 7]}</Button>

            <Button type={clicked((new Date().getDay() + 4) % 7)} onClick={() => {
                setDayClicked((new Date().getDay() + 4) % 7);
                props.dayClicked((new Date().getDay() + 4) % 7)
            }}>{days[(new Date().getDay() + 4) % 7]}</Button>

            <Button type={clicked((new Date().getDay() + 5) % 7)} onClick={() => {
                setDayClicked((new Date().getDay() + 5) % 7);
                props.dayClicked((new Date().getDay() + 5) % 7)
            }}>{days[(new Date().getDay() + 5) % 7]}</Button>

            <Button type={clicked((new Date().getDay() + 6) % 7)} onClick={() => {
                setDayClicked((new Date().getDay() + 6) % 7);
                props.dayClicked((new Date().getDay() + 6) % 7)

            }}>{days[(new Date().getDay() + 6) % 7]}</Button>
        </div>
    )
}