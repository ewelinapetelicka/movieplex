import {Seat} from "../../models/seat/seat";
import {Card} from "../common/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Select} from "../common/select/Select";
import {Button, ButtonType} from "../common/button/Button";

interface SeatPickedProps {
    seatPicked: Seat[];
    onSeatRemoved: (seat:Seat) => void;
}

export function Recap(props: SeatPickedProps) {
    return (
        <div>
            <p className={"text-xl font-bold pt-4 pb-4"}>Seats Selected :</p>
            <div className={"flex flex-col gap-4"}>
                {props.seatPicked.map((el, index) => {
                    return (
                        <Card key={index}>
                            <div className={"flex justify-between items-center"}>
                                <div className={"font-bold"}>
                                    <span>{String.fromCharCode(el.col + 65)}</span>
                                    <span>{el.row + 1}</span>
                                </div>
                                <Select initValue={"NORMAL"} options={["KID", "SENIOR", "NORMAL"]}></Select>
                                <div>
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
        </div>
    )
}