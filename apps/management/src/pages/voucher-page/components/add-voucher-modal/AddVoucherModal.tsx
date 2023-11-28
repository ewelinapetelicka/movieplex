import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import {useState} from "react";

interface AddVoucherModalProps {
    visible: boolean;
    onHide: () => void;
    onVoucherAdded: () => void;
}

export function AddVoucherModal(props: AddVoucherModalProps) {
    const [addNameVoucher, setAddNameVoucher] = useState<string>();
    const [addDiscountVoucher, setAddDiscountVoucher] = useState<number>();

    function addVoucher() {
        fetch('http://localhost:8000/vouchers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: addNameVoucher,
                discount: addDiscountVoucher
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            props.onHide();
            props.onVoucherAdded();
        });
    }

    return (
        <Sidebar visible={props.visible} className={"p-sidebar-md"} position="top"
                 onHide={() => props.onHide()}>
            <h2>Add voucher</h2>
            <div className={"flex gap-3"}>
                <input placeholder={"name"} className={"h-3rem text-xl"}
                       value={addNameVoucher}
                       onChange={(e) => setAddNameVoucher(e.target.value)}></input>
                <input placeholder={"discount"} className={"h-3rem text-xl"} type={"number"}
                       value={addDiscountVoucher}
                       step={0.01}
                       min={0}
                       max={1}
                       onChange={(e) => setAddDiscountVoucher(parseFloat(e.target.value))}></input>
                <Button icon="pi pi-times" severity="danger" onClick={() => props.onHide()}/>
                <Button icon="pi pi-check" severity="success" onClick={() => addVoucher()}/>
            </div>
        </Sidebar>
    );
}