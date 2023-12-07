import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Film} from "../../models/film/film";
import {Button} from "primereact/button";
import {useEffect, useRef, useState} from "react";
import {EditFilmModal} from "./components/edit-film-modal/EditFilmModal";
import {confirmDialog, ConfirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";

export function FilmsPage(){
    const [films, setFilms] = useState<Film[]>([]);
    const [isEditable, setIsEditable] = useState(false);
    const [editableFilm, setEditableFilm] = useState<Film>();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        refreshFilms()
    }, []);

    function refreshFilms(){
        fetch('http://localhost:8000/films')
            .then(response => response.json())
            .then((data : Film[])=>{
                setFilms(data)
            })
    }

    function deleteFilm(id: number) {
        fetch('http://localhost:8000/films/' + id, {
            method: 'DELETE',
        }).then(() => {
            setFilms(films.filter((film) => film.id !== id));
                toast.current!.show({severity: 'info', summary: 'info', detail: 'Film deleted', life: 3000});
        });
    }

    function filmEdited(){
        refreshFilms();
            toast.current!.show({severity: 'info', summary: 'info', detail: 'Film updated', life: 3000});
    }

    return(
        <div className={"p"}>
            <h1>FilmsPage</h1>
            <DataTable value={films} tableStyle={{width: '90rem'}}>
                <Column field="title" header="TITLE"></Column>
                <Column  header="ACTIONS" body={(film : Film)=>{
                    return(
                        <div className={"flex gap-2"}>
                            <Button  label={"Edit"} className={"p-button-success"} onClick={()=>{
                                setEditableFilm(film);
                                setIsEditable(true);
                            }}/>
                            <Button  label={"Delete"} className={"p-button-danger"}  onClick={()=>{
                                confirmDialog({
                                    message: 'Are you sure you want to delete this film?',
                                    header: 'Confirmation',
                                    icon: 'pi pi-exclamation-triangle',
                                    accept: () => deleteFilm(film.id),
                                    reject: () => {
                                    }
                                })
                            }}/>
                        </div>
                    )
                }}></Column>
            </DataTable>
            <EditFilmModal visible={isEditable} film={editableFilm} onHide={()=>setIsEditable(false)}
                           onFilmEdited={()=> filmEdited()}/>
            <Toast ref={toast}/>
            <ConfirmDialog/>
        </div>
    )
}