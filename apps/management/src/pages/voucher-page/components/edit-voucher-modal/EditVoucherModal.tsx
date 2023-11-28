import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import {Voucher} from "../../../../models/voucher/voucher";

interface EditVoucherModalProps {
    visible: boolean;
    onHide: () => void;
    onVoucherEdited: () => void;
    voucher?: Voucher;
}

export function EditVoucherModal(props: EditVoucherModalProps) {
    const [changeNameVoucher, setChangeNameVoucher] = useState<string>();
    const [changeDiscountVoucher, setChangeDiscountVoucher] = useState<number>();

    useEffect(() => {
        setChangeNameVoucher(props.voucher?.name);
        setChangeDiscountVoucher(props.voucher?.discount);
    }, [props.voucher]);

    function editVoucher() {
        fetch('http://localhost:8000/vouchers/' + props.voucher?.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: changeNameVoucher,
                discount: changeDiscountVoucher
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            props.onVoucherEdited();
            props.onHide();
        });
    }

    return (
        <Sidebar visible={props.visible} className={"p-sidebar-md"} position="top"
                 onHide={() => props.onHide()}>
            <h2>Edit voucher</h2>
            <div className={"flex gap-3"}>
                <input placeholder={"name"} className={"h-3rem text-xl"}
                       value={changeNameVoucher}
                       onChange={(e) => setChangeNameVoucher(e.target.value)}></input>
                <input placeholder={"discount"} className={"h-3rem text-xl"} type={"number"}
                       value={changeDiscountVoucher}
                       step={0.01}
                       min={0}
                       max={1}
                       onChange={(e) => setChangeDiscountVoucher(parseFloat(e.target.value))}></input>
                <Button icon="pi pi-times" severity="danger" onClick={() => props.onHide()}/>
                <Button icon="pi pi-check" severity="success" onClick={() => editVoucher()}/>
            </div>
        </Sidebar>
    );
}