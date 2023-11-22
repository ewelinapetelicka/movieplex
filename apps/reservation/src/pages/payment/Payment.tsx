import {Button, ButtonType} from "../../componetns/common/button/Button";
import {Title} from "../../componetns/common/title/Title";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple} from "@fortawesome/free-brands-svg-icons";
import {useLocation} from "react-router";
import {SeatType} from "../../models/seat/seat-type/seat-type";
import {Seat} from "../../models/seat/seat";
import {ReactNode, useState} from "react";
import {Voucher} from "../../models/vouher/voucher";

export function Payment() {
    const data = useLocation();
    const [voucher, setVoucher] = useState('');
    const [total, setTotal] = useState(data.state.cost + 2);
    const [hasVoucherApplied, setHasVoucherApplied] = useState(false);
    const [hasAlert, setHasAlert] = useState(false)

    function howManyTickets(seatType: SeatType): ReactNode {
        const howMany = data.state.seats.filter((el: Seat) => el.type === seatType).length;
        if (!howMany) {
            return null;
        }
        return (
            <div>
                <span>{howMany} x {seatType}</span>
            </div>
        )
    }

    function addVoucher() {
        fetch('http://localhost:8000/vouchers?name=' + voucher)
            .then((httpResponse) => httpResponse.json())
            .then((vouchers: Voucher[]) => {
                    if (vouchers.length !== 0) {
                        setTotal((data.state.cost * vouchers[0].discount) + 2);
                        setHasVoucherApplied(true);
                    } else {
                        setHasAlert(true)
                    }
                }
            )
    }

    return (
        <div className={"text-blue-50 flex h-full w-3/5 flex-col justify-center items-start text-lg pl-20"}>
            <Title text={"SUMARY"}></Title>
            <div className={"w-full text-xl"}><b>TICKETS:</b>
                {howManyTickets(SeatType.NORMAL)}
                {howManyTickets(SeatType.KID)}
                {howManyTickets(SeatType.SENIOR)}
                <p className={" w-full flex justify-end"}>{(data.state.cost).toFixed(2)} $</p>
                <div className={"flex justify-between w-full "}>
                    <p>Booking Fee:</p>
                    <p>2.00 $</p>
                </div>
                <div className={"flex "}>
                    <p>TOTAL: </p>
                    <p className={" w-full flex justify-end"}>{(data.state.cost + 2).toFixed(2)} $</p>
                </div>
                <div className={"bg-blue-50 w-full h-0.5"}></div>

                <div className={"bg-blue-50 w-full h-0.5"}></div>
                <div>
                    <p className={"pt-6"}> Voucher: </p>
                    <div className={"w-full flex gap-6"}>
                        <input className={"text-gray-950"}
                               onChange={(e) => {
                                   setVoucher(e.target.value)
                               }}></input>
                        <Button type={!hasVoucherApplied ? ButtonType.BLUE : ButtonType.DISABLED}
                                onClick={() => addVoucher()}>
                            ADD VOUCHER
                        </Button>
                    </div>
                    <p className={"text-sm"}>{hasAlert ? "INVALID VOUCHER" : ""}</p>
                </div>
                <p className={"pt-3 flex justify-end w-full }"}><b>Total: {total.toFixed(2)} $</b></p>
                <div>
                    <p className={"pt-6"}>DELIVERY:</p>
                    <div className={"flex justify-between w-full"}>
                        <input className={"text-gray-950"} placeholder={"NAME"}></input>
                        <input className={"text-gray-950"} placeholder={"SURNAME"}></input>
                        <input className={"text-gray-950"} placeholder={"E-MAIL ADDRESS"}></input>
                    </div>
                </div>
                <div>
                    <p className={"pt-6"}>Payment Methods</p>
                    <div className={"flex  flex-wrap gap-4"}>
                        <Button type={ButtonType.PAYMENT} onClick={() => {
                        }}>Card</Button>
                        <Button type={ButtonType.PAYMENT} onClick={() => {
                        }}>PayPal</Button>
                        <Button type={ButtonType.PAYMENT} onClick={() => {
                        }}><FontAwesomeIcon icon={faApple}/>Pay</Button>
                        <Button type={ButtonType.PAYMENT} onClick={() => {
                        }}><FontAwesomeIcon icon={faApple}/>Pay</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}