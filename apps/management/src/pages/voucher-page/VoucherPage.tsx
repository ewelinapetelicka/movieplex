import {useEffect, useState} from "react";
import {Voucher} from "../../models/voucher/voucher";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";

export function VoucherPage() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [isEditable, setIsEditable] = useState(false);
    const [changeNameVoucher, setChangeNameVoucher] = useState<string>();
    const [changeDiscountVoucher, setChangeDiscountVoucher] = useState<number>();
    const [editableVoucher, setEditableVoucher] = useState<Voucher>();
    const [fetchVouchers, setFetchVouchers] = useState<number>();

    useEffect(() => {
        fetch('http://localhost:8000/vouchers')
            .then(response => response.json())
            .then((data: Voucher[]) => {
                setVouchers(data)
            })
    }, [fetchVouchers]);

    function deleteVoucher(id: number) {
        fetch('http://localhost:8000/vouchers/' + id, {
            method: 'DELETE',
        }).then(() => {
            setVouchers(vouchers.filter((voucher) => voucher.id !== id));
        });
    }

    function editVoucher() {
        fetch('http://localhost:8000/vouchers/' + editableVoucher?.id, {
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
            setIsEditable(false);
            setFetchVouchers(Math.random());
        });
    }

    function openEditVoucher() {
        if (isEditable) {
            return (
                <Sidebar visible={isEditable} className={"p-sidebar-md"} position="top"
                         onHide={() => setIsEditable(false)}>
                    <h2>Edit voucher</h2>
                    <div className={"flex gap-3"}>
                        <input placeholder={"name"} className={"h-3rem text-xl"} value={changeNameVoucher}
                               onChange={(e) => setChangeNameVoucher(e.target.value)}></input>
                        <input placeholder={"discount"} className={"h-3rem text-xl"} type={"number"}
                               value={changeDiscountVoucher}
                               step={0.01}
                               min={0}
                               max={1}
                               onChange={(e) => setChangeDiscountVoucher(parseFloat(e.target.value))}></input>
                        <Button icon="pi pi-times" severity="danger" onClick={()=>setIsEditable(false)}/>
                        <Button icon="pi pi-check" severity="success" onClick={()=>editVoucher()}/>
                    </div>
                </Sidebar>
            );
        }
    }

    return (
        <div className={"flex flex-column justify-content: center align-items-center pt-3"}>
            <div className={"w-full h-10 font-bold flex justify-content: start items-center pt-3 pb-2"}>Vouchers</div>
            <DataTable value={vouchers} tableStyle={{width: '90rem'}}>
                <Column field="name" header="NAME"></Column>
                <Column field="discount" header="DISCOUNT"></Column>
                <Column header="ACTIONS" body={(voucher: Voucher) => {
                    return (
                        <div className={"flex gap-2"}>
                            <Button label={"Edit"} className={"p-button-success"} onClick={() => {
                                setIsEditable(true);
                                setEditableVoucher(voucher);
                            }}/>
                            <Button label={"Delete"} className={"p-button-danger"} onClick={() => {
                                deleteVoucher(voucher.id)
                            }}/>
                        </div>
                    )
                }}>
                </Column>
            </DataTable>

            {openEditVoucher()}
        </div>
    );
}
