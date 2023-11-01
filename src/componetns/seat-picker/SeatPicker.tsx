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
        <div className={"w-1/2 h-full flex flex-col justify-center items-center"}>
            <div
                className={`h-8 flex justify-center items-center rounded-2xl bg-blue-50 text-gray-900 font-bold mb-10 mr-10 ${props.hall.seatRows === 14 ? 'w-4/6 ' : 'w-3/6 '}`}>
                SCREEN
            </div>
            <div>
                {cols.map((el, index) => {
                    return (
                        <div key={index} className={"flex justify-center "}>
                            {rows.map((el, index) => {
                                return (
                                    <Button type={ButtonType.SEAT} key={index} onClick={() => {
                                        props.onSetSeat()
                                    }}>
                                    </Button>
                                )

                            })}
                            <Button type={ButtonType.DISABLED} onClick={() => {
                            }}>
                                {String.fromCharCode(index + 65)}
                            </Button>
                        </div>
                    )
                })}
                {rows.map((el, index) => {
                    return (
                        <Button type={ButtonType.DISABLED} onClick={() => {
                        }}>
                            {index + 1}
                        </Button>
                    )
                })}
            </div>
            <div>
                <div>
                    <span>AVAILABLE - </span>
                    <Button type={ButtonType.SEAT} onClick={() => {}}></Button>
                </div>
                <div>
                    <span>RESERVED - </span>
                    <Button type={ButtonType.SEAT} onClick={() => {}}></Button>
                </div>
            </div>
        </div>
    )
}