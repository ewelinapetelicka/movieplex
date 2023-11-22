import {Button, ButtonType} from "../common/button/Button";
import {Hall} from "../../models/hall/hall";
import {useState} from "react";
import {Seat} from "../../models/seat/seat";
import {SeatType} from "../../models/seat/seat-type/seat-type";

interface SeatPickerProps {
    onSetSeat: (seat:Seat) => void;
    seatPicked: Seat[];
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
                {cols.map((el, colI) => {
                    return (
                        <div key={colI} className={"flex justify-center"}>
                            {rows.map((el, rowI) => {
                                return (
                                    <Button type={props.seatPicked.find((el) => el.row === rowI && el.col === colI) ? ButtonType.SEAT_TAKEN : ButtonType.SEAT} key={rowI} onClick={() => {
                                        props.onSetSeat({
                                            row: rowI,
                                            col: colI,
                                            type: SeatType.NORMAL
                                        })
                                    }}>
                                    </Button>
                                )
                            })}
                            <Button type={ButtonType.DISABLED} onClick={() => {
                            }}>
                                {String.fromCharCode(colI + 65)}
                            </Button>
                        </div>
                    )
                })}
                {rows.map((el, index) => {
                    return (
                        <Button type={ButtonType.DISABLED} onClick={() => {
                        }} key={index}>
                            {index + 1}
                        </Button>
                    )
                })}
            </div>
            <div className={"flex justify-center items-center gap-3 "}>
                <div className={"flex justify-center items-center "}>
                    <span>AVAILABLE - </span>
                    <Button type={ButtonType.SEAT} onClick={() => {}}></Button>
                </div>
                <div className={"flex justify-center items-center "}>
                    <span>RESERVED - </span>
                    <Button type={ButtonType.SEAT_CHOSEN} onClick={() => {}}></Button>
                </div>
                <div className={"flex justify-center items-center "}>
                    <span>CHOSEN - </span>
                    <Button type={ButtonType.SEAT_TAKEN} onClick={() => {}}></Button>
                </div>
            </div>
        </div>
    )
}