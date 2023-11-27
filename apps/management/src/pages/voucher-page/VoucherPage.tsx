import {useEffect, useState} from "react";
import {Voucher} from "../../models/voucher/voucher";

export function VoucherPage() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/vouchers')
            .then(response => response.json())
            .then((data: Voucher[]) => {
                setVouchers(data)
            })
    }, []);

    return (
        <div>
            <div className={"w-full h-10 font-bold flex items-start"}>Vouchers</div>
            <div className={"flex justify-evenly"}>{vouchers.map((el) => {
                return (
                    <div>
                        <div>{el.name}</div>
                        <div>{el.discount}</div>
                    </div>
                )
            })}</div>
        </div>
    );
}
