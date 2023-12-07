import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Film} from "../../models/film/film";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import {EditFilmModal} from "./components/edit-film-modal/EditFilmModal";

export function FilmsPage(){
    const [films, setFilms] = useState<Film[]>([]);
    const [isEditable, setIsEditable] = useState(false);
    const [editableFilm, setEditableFilm] = useState<Film>();

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
                            <Button  label={"Delete"} className={"p-button-danger"} />
                        </div>
                    )
                }}></Column>
            </DataTable>
            <EditFilmModal visible={isEditable} film={editableFilm} onHide={()=>setIsEditable(false)}
                           onFilmEdited={()=> refreshFilms()}/>
        </div>
    )
}