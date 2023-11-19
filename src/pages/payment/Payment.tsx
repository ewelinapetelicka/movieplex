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
                if (vouchers.length !== 0){
                    setTotal((data.state.cost * vouchers[0].discount) +2)
                }
            })
    }

    return (
        <div className={"text-blue-50 flex h-full w-4/5 flex-col justify-center items-start text-lg pl-20"}>
            <Title text={"SUMARY"}></Title>
            <div>TICKETS:
                {howManyTickets(SeatType.NORMAL)}
                {howManyTickets(SeatType.KID)}
                {howManyTickets(SeatType.SENIOR)}
                <p>{data.state.cost} $</p>
            </div>
            <p>Booking Fee:</p>
            <p>2$</p>
            <div>
                <p> Voucher: </p>
                <div className={"flex"}>
                    <input className={"text-gray-950"}
                           onChange={(e) => {
                        setVoucher(e.target.value)
                    }}></input>
                    <Button type={ButtonType.BLUE}
                            onClick={() => addVoucher()}>
                        ADD VOUCHER
                    </Button>
                </div>
            </div>
            <p>Total: {total.toFixed(2)} $</p>
            <div>
                <p>DELIVERY:</p>
                <div>
                    <input className={"text-gray-950"} placeholder={"NAME"}></input>
                    <input className={"text-gray-950"} placeholder={"SURNAME"}></input>
                </div>
                <input className={"text-gray-950"} placeholder={"E-MAIL ADDRESS"}></input>
            </div>
            <div>
                <p>Payment Methods</p>
                <div className={"flex  flex-wrap gap-4"}>
                    <Button type={ButtonType.PAYMENT} onClick={() => {
                    }}>Card</Button>
                    <Button type={ButtonType.PAYMENT} onClick={() => {
                    }}>PayPal</Button>
                    <Button type={ButtonType.PAYMENT} onClick={() => {
                    }}><FontAwesomeIcon icon={faApple}/>Pay</Button>
                </div>
            </div>
        </div>
    )
}
