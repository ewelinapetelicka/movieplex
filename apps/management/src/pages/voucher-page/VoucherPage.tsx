import {useEffect, useState} from "react";
import {Voucher} from "../../models/voucher/voucher";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from "primereact/button";

export function VoucherPage() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/vouchers')
            .then(response => response.json())
            .then((data: Voucher[]) => {
                setVouchers(data)
            })
    }, []);

    function deleteVoucher(id: number) {
        fetch('http://localhost:8000/vouchers/' + id, {
            method: 'DELETE',
        }).then(() => {
            setVouchers(vouchers.filter((voucher) => voucher.id !== id));
        });
    }

    return (
        <div>
            <div className={"w-full h-10 font-bold flex items-center "}>Vouchers</div>
            <DataTable value={vouchers} tableStyle={{maxWidth: '90rem'}}>
                <Column field="name" header="NAME"></Column>
                <Column field="discount" header="DISCOUNT"></Column>
                <Column header="ACTIONS" body={(voucher: Voucher) => {
                    return (<div>
                        <Button label={"Edit"} className={"p-button-success p-mr-2"}/>
                        <Button label={"Delete"} className={"p-button-danger"} onClick={()=>{deleteVoucher(voucher.id)}}/>
                    </div>)
                }}>
                </Column>
            </DataTable>
        </div>
    );
}
