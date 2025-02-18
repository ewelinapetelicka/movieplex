import {Search} from "../../components/search/Search";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Teaser} from "../../models/teaser/teaser";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {ConfirmDialog, confirmDialog} from "primereact/confirmdialog";
import {useHttp} from "../../hooks/http/use-http";
import {ToasterContext} from "../../context/toaster/toaster-context";
import {EditTeaserModal} from "./components/edit-teaser-modal/EditTeaserModal";
import {AddTeaserModal} from "./components/add-teaser-modal/AddTeaserModal";
import {Toast} from "primereact/toast";
import {genre} from "../../utils/genre";

export function TeasersPage() {
    const [query, setQuery] = useState<string>('');
    const [isAdding, setIsAdding] = useState(false);
    const [filteredTeasers, setFilteredTeasers] = useState<Teaser[]>([]);
    const [teasers, setTeasers] = useState<Teaser[]>([]);
    const [page, setPage] = useState(0);
    const [pagedTeasers, setPagedTeasers] = useState<Teaser[]>([]);
    const pageSize = 5;
    const [isEditable, setIsEditable] = useState(false);
    const [editableTeaser, setEditableTeaser] = useState<Teaser>();
    const http = useHttp();
    const toaster = useContext(ToasterContext);
    const [totalPages, setTotalPages] = useState(0);
    const [newTeaser, setNewTeaser] = useState<Teaser>();
    const [filteredGenre, setFilteredGenre] = useState<string[]>([]);
    const toast = useRef<Toast>(null);


    const search = (event: any) => {
        setTimeout(() => {
            let _filteredGenres: string[];

            if (!event.query.trim().length) {
                _filteredGenres = [...genre];
            } else {
                _filteredGenres = genre.filter((genre) => {
                    return genre.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredGenre(_filteredGenres);
        }, 250);
    }
    useEffect(() => {
        refreshTeasers()
    }, []);
    useEffect(() => {
        searchTeaser()
    }, [teasers]);

    useEffect(() => {
        setPagedTeasers(filteredTeasers.slice(page * pageSize, (page + 1) * pageSize));
    }, [filteredTeasers, page]);

    function refreshTeasers() {
        http.get("teasers")
            .then((data: Teaser[]) => {
                setTeasers(data);
            })
    }

    function searchTeaser() {
        setFilteredTeasers(
            teasers.filter(
                (teaser) => teaser.title.toLowerCase().includes(query.toLowerCase()) ||
                    teaser.genre.some((genre) => genre.toLowerCase().includes(query.toLowerCase()))
            )
        );
        setPage(0);
        setTotalPages(Math.floor(teasers.length / pageSize));
    }

    function deleteTeaser(id: number) {
        http.delete("teasers/" + id)
            .then(() => {
                setTeasers(teasers.filter((teaser) => teaser.id !== id));
                toaster.show({severity: 'info', summary: 'info', detail: 'Teaser deleted', life: 3000});
            });
    }

    function teaserEdited() {
        refreshTeasers();
        toaster.show({severity: 'info', summary: 'info', detail: 'Teaser updated', life: 3000});
    }

    return (
        <div className={"w-full h-12 flex justify-content-center flex-column"}>
            <h1>Teasers</h1>
            <Search isAdding={() => setIsAdding(true)} query={query} onChangeSetQuery={setQuery}
                    onClickSearch={searchTeaser}></Search>
            <DataTable value={pagedTeasers} tableStyle={{width: '100%', fontSize: 'large'}} paginator rows={pageSize}>
                <Column field="title" header="TITLE" style={{width: '85%'}}></Column>
                <Column header="ACTIONS" body={(teaser: Teaser) => {
                    return (
                        <div className={"flex gap-2"}>
                            <Button label={"Edit"} className={"p-button-success"} onClick={() => {
                                setEditableTeaser(teaser);
                                setIsEditable(true);
                            }}/>
                            <Button label={"Delete"} className={"p-button-danger"} onClick={() => {
                                confirmDialog({
                                    message: 'Are you sure you want to delete this teaser?',
                                    header: 'Confirmation',
                                    icon: 'pi pi-exclamation-triangle',
                                    accept: () => deleteTeaser(teaser.id),
                                    reject: () => {
                                    }
                                });
                            }}/>
                        </div>
                    );
                }}></Column>
            </DataTable>
            {editableTeaser && (
                <EditTeaserModal visible={isEditable} teaser={editableTeaser} onHide={() => setIsEditable(false)}
                                 onTeaserEdited={() => teaserEdited()} genre={genre} search={search}
                                 filteredGenre={filteredGenre}/>
            )}
            <AddTeaserModal visible={isAdding} onHide={() => setIsAdding(false)} onTeaserAdded={() => newTeaser}
                            genre={genre} search={search} filteredGenre={filteredGenre}/>
            <Toast ref={toast}/>
            <ConfirmDialog/>
        </div>
    )
}