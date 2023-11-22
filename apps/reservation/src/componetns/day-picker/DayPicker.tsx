import {Button, ButtonType} from "../common/button/Button";
import {useState} from "react";
import {useDays} from "../../hooks/use-days/use-days";

interface DayPickerProps {
    dayClicked: (date: Date) => void;
}

export function DayPicker(props: DayPickerProps) {
    const days = useDays();
    const [dayClicked, setDayClicked] = useState(new Date());

    function clicked(day: number): ButtonType {
        if (day === dayClicked.getDay()) {
            return ButtonType.GRAY_CLICKED
        }
        return ButtonType.GRAY
    }

    return (
        <div className={"flex gap-2"}>
            <Button type={clicked(new Date().getDay())} onClick={() => {
                setDayClicked(new Date());
                props.dayClicked(new Date())
            }}>TODAY</Button>

            <Button type={clicked((new Date().getDay() + 1) % 7)} onClick={() => {
                setDayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1));
                props.dayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1))
            }}>TOMORROW</Button>

            <Button type={clicked((new Date().getDay() + 2) % 7)} onClick={() => {
                setDayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2));
                props.dayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2))
            }}>{days[(new Date().getDay() + 2) % 7]}</Button>

            <Button type={clicked((new Date().getDay() + 3) % 7)} onClick={() => {
                setDayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3));
                props.dayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3))
            }}>{days[(new Date().getDay() + 3) % 7]}</Button>

            <Button type={clicked((new Date().getDay() + 4) % 7)} onClick={() => {
                setDayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 4));
                props.dayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 4))
            }}>{days[(new Date().getDay() + 4) % 7]}</Button>

            <Button type={clicked((new Date().getDay() + 5) % 7)} onClick={() => {
                setDayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5));
                props.dayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 5))
            }}>{days[(new Date().getDay() + 5) % 7]}</Button>

            <Button type={clicked((new Date().getDay() + 6) % 7)} onClick={() => {
                setDayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 6));
                props.dayClicked(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 6))

            }}>{days[(new Date().getDay() + 6) % 7]}</Button>
        </div>
    )
}