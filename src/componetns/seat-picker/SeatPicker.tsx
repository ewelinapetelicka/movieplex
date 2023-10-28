import {Button, ButtonType} from "../common/button/Button";
import {Hall} from "../../models/hall/hall";
import {useState} from "react";

interface SeatPickerProps {
    onSetSeat: () => void;
    hall: Hall;
}

export function SeatPicker(props: SeatPickerProps) {
    const [cols] = useState(new Array(props.hall.seatColumns).fill(null));
    const [rows] = useState(new Array(props.hall.seatRows).fill(null));

    return (
        <div className={"w-1/2 h-full flex  flex-col justify-center  items-center"}>
            <div className={"w-5/6 rounded-2xl bg-blue-50 text-gray-900 mb-10"}>
                Screen
            </div>
            <div className={"w-full"}>
                {cols.map((el) => {
                return (
                    <div className={"flex justify-center "}>
                        {rows.map((el) => {
                            return (
                                <Button type={ButtonType.SEAT} onClick={() => {
                                    props.onSetSeat()
                                }}></Button>
                            )
                        })}
                    </div>
                )
            })}
            </div>
        </div>
    )
}