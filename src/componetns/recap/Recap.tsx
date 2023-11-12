import {Seat} from "../../models/seat/seat";
import {Card} from "../common/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Select} from "../common/select/Select";
import {Button, ButtonType} from "../common/button/Button";
import {useNavigate} from "react-router-dom";

interface SeatPickedProps {
    seatPicked: Seat[];
    onSeatRemoved: (seat: Seat) => void;
}

export function Recap(props: SeatPickedProps) {
    const navigate = useNavigate()

    return (
        <div className={"h-3/5"}>
            <p className={"text-xl font-bold pt-4 pb-4"}>Seats Selected :</p>
            <div className={"flex flex-col gap-4 overflow-y-auto h-full pr-3"}>
                {props.seatPicked.map((el, index) => {
                    return (
                        <Card key={index}>
                            <div className={"flex justify-between items-center"}>
                                <div className={"flex gap-6 items-center"}>
                                    <div className={"font-bold"}>
                                        <span>{String.fromCharCode(el.col + 65)}</span>
                                        <span>{el.row + 1}</span>
                                    </div>
                                    <Select initValue={"NORMAL"} options={["KID", "SENIOR", "NORMAL"]}></Select>
                                </div>
                                <div className={"flex justify-between items-center"}>
                                    <span className={"pr-3"}>: 12 $</span>
                                    <Button type={ButtonType.DELETE} key={index} onClick={() => {
                                        props.onSeatRemoved(el)
                                    }}><FontAwesomeIcon icon={faTrashCan}/></Button>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
            <Button type={ButtonType.ORANGE} onClick={() => {
                navigate("/payment")
            }}>NEXT</Button>
        </div>
    )
}