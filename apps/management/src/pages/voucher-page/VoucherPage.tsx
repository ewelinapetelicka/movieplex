import {useEffect, useRef, useState} from "react";
import {Voucher} from "../../models/voucher/voucher";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from "primereact/button";
import {AddVoucherModal} from "./components/add-voucher-modal/AddVoucherModal";
import {EditVoucherModal} from "./components/edit-voucher-modal/EditVoucherModal";
import {Toast} from "primereact/toast";
import {confirmDialog, ConfirmDialog} from "primereact/confirmdialog";

export function VoucherPage() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [editableVoucher, setEditableVoucher] = useState<Voucher>();
    const [isAdding, setIsAdding] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        refreshVouchers()
    }, []);

    function refreshVouchers() {
        fetch('http://localhost:8000/vouchers')
            .then(response => response.json())
            .then((data: Voucher[]) => {
                setVouchers(data)
            })
    }

    function deleteVoucher(id: number) {
        fetch('http://localhost:8000/vouchers/' + id, {
            method: 'DELETE',
        }).then(() => {
            setVouchers(vouchers.filter((voucher) => voucher.id !== id));
            if (toast.current) {
                toast!.current.show({severity: 'info', summary: 'info', detail: 'Voucher deleted', life: 3000});
            }
        });
    }

    return (
        <div className={"flex flex-column justify-content:center f pt-3"}>
            <div className={'flex w-10'}>
                <div
                    className={"w-full text-3xl h-10 font-bold flex justify-content: start items-center pt-3 pb-2"}>Vouchers
                </div>
                <Button label={"Add new"} className={"m-2"} icon={'pi pi-plus'} onClick={() => setIsAdding(true)}/>
            </div>
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
                            <Button label={"Delete"} className={"p-button-danger"}
                                    onClick={() => {
                                        confirmDialog({
                                            message: 'Are you sure you want to delete voucher?',
                                            header: 'Confirmation',
                                            icon: 'pi pi-exclamation-triangle',
                                            accept: () => deleteVoucher(voucher.id),
                                            reject: () => {
                                            }
                                        });
                                    }}/>
                        </div>
                    )
                }}>
                </Column>
            </DataTable>
            <AddVoucherModal visible={isAdding} onVoucherAdded={() => refreshVouchers()}
                             onHide={() => setIsAdding(false)}/>
            <EditVoucherModal visible={isEditable} onHide={() => setIsEditable(false)}
                              onVoucherEdited={() => refreshVouchers()} voucher={editableVoucher}/>
            <Toast ref={toast}/>
            <ConfirmDialog/>
        </div>
    );
}
