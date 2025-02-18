import React, {useContext, useEffect, useState} from "react";
import {Voucher} from "../../models/voucher/voucher";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from "primereact/button";
import {AddVoucherModal} from "./components/add-voucher-modal/AddVoucherModal";
import {EditVoucherModal} from "./components/edit-voucher-modal/EditVoucherModal";
import {confirmDialog, ConfirmDialog} from "primereact/confirmdialog";
import {ToasterContext} from "../../context/toaster/toaster-context";
import {Search} from "../../components/search/Search";

export function VoucherPage() {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [editableVoucher, setEditableVoucher] = useState<Voucher>();
    const [isAdding, setIsAdding] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
    const [query, setQuery] = useState<string>('');
    const toaster = useContext(ToasterContext);


    useEffect(() => {
        refreshVouchers()
    }, []);

    useEffect(() => {
        searchVoucher()
    }, [vouchers]);


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
            toaster.show({severity: 'info', summary: 'info', detail: 'Voucher deleted', life: 3000});

        });
    }

    function searchVoucher() {
        setFilteredVouchers(vouchers.filter((voucher) => voucher.name.toLowerCase().includes(query.toLowerCase())));
    }

    return (
        <div className={"w-full h-12 flex justify-content-center  flex-column"}>
            <h1>Vouchers</h1>
            <Search query={query} isAdding={() => setIsAdding(true)} onChangeSetQuery={setQuery}
                    onClickSearch={searchVoucher}></Search>
            <DataTable value={filteredVouchers} paginator rows={5}>
                <Column field="name" header="NAME" style={{width: '50%'}}></Column>
                <Column field="discount" header="DISCOUNT" style={{width: '25%'}}></Column>
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
                    );
                }}>
                </Column>
            </DataTable>
            <AddVoucherModal visible={isAdding} onVoucherAdded={() => refreshVouchers()}
                             onHide={() => setIsAdding(false)}/>
            <EditVoucherModal visible={isEditable} onHide={() => setIsEditable(false)}
                              onVoucherEdited={() => refreshVouchers()} voucher={editableVoucher}/>
            <ConfirmDialog/>
        </div>
    )
}
