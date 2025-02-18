import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Film} from "../../models/film/film";
import {Button} from "primereact/button";
import React, {useContext, useEffect, useRef, useState} from "react";
import {EditFilmModal} from "./components/edit-film-modal/EditFilmModal";
import {confirmDialog, ConfirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import {AddFilmModal} from "./components/add-film-modal/AddFilmModal";
import {useHttp} from "../../hooks/http/use-http";
import {ToasterContext} from "../../context/toaster/toaster-context";
import {Search} from "../../components/search/Search";
import {genre} from "../../utils/genre";
import {ageRestriction} from "../../utils/ageRestrictions";

export function FilmsPage() {
    const [films, setFilms] = useState<Film[]>([]);
    const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
    const [pagedFilms, setPagedFilms] = useState<Film[]>([]);
    const [query, setQuery] = useState<string>('');
    const [isEditable, setIsEditable] = useState(false);
    const [editableFilm, setEditableFilm] = useState<Film>();
    const [newFilm, setNewFilm] = useState<Film>();
    const [isAdding, setIsAdding] = useState(false);
    const toast = useRef<Toast>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 5;
    const toaster = useContext(ToasterContext);
    const http = useHttp();
    const [filteredGenre, setFilteredGenre] = useState<string[]>([]);

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

    function searchFilm() {
        setFilteredFilms(
            films.filter(
                (film) => film.title.toLowerCase().includes(query.toLowerCase()) ||
                    film.genre.some((genre) => genre.toLowerCase().includes(query.toLowerCase()))
            )
        );
        setPage(0);
        setTotalPages(Math.floor(films.length / pageSize));
    }

    useEffect(() => {
        refreshFilms()
    }, []);

    useEffect(() => {
        searchFilm();
    }, [films]);

    useEffect(() => {
        setPagedFilms(filteredFilms.slice(page * pageSize, (page + 1) * pageSize));
    }, [filteredFilms, page]);

    function refreshFilms() {
        http.get("films")
            .then((data: Film[]) => {
                setFilms(data);
            })
    }

    function deleteFilm(id: number) {
        http.delete("films/" + id)
            .then(() => {
                setFilms(films.filter((film) => film.id !== id));
                toaster.show({severity: 'info', summary: 'info', detail: 'Film deleted', life: 3000});
            });
    }

    function filmEdited() {
        refreshFilms();
        toaster.show({severity: 'info', summary: 'info', detail: 'Film updated', life: 3000});
    }

    return (
        <div className={"w-full h-12 flex justify-content-center flex-column"}>
            <h1>Films</h1>
            <Search isAdding={() => setIsAdding(true)} query={query} onChangeSetQuery={setQuery}
                    onClickSearch={searchFilm}></Search>
            <DataTable value={pagedFilms} tableStyle={{width: '100%', fontSize: 'large'}} paginator rows={pageSize}>
                <Column field="title" header="TITLE" style={{width: '85%'}}></Column>
                <Column header="ACTIONS" body={(film: Film) => {
                    return (
                        <div className={"flex gap-2"}>
                            <Button label={"Edit"} className={"p-button-success"} onClick={() => {
                                setEditableFilm(film);
                                setIsEditable(true);
                            }}/>
                            <Button label={"Delete"} className={"p-button-danger"} onClick={() => {
                                confirmDialog({
                                    message: 'Are you sure you want to delete this film?',
                                    header: 'Confirmation',
                                    icon: 'pi pi-exclamation-triangle',
                                    accept: () => deleteFilm(film.id),
                                    reject: () => {
                                    }
                                });
                            }}/>
                        </div>
                    );
                }}></Column>
            </DataTable>
            {editableFilm && (
                <EditFilmModal visible={isEditable} film={editableFilm} onHide={() => setIsEditable(false)}
                               onFilmEdited={() => filmEdited()} ageRestriction={ageRestriction} genre={genre}
                               search={search}
                               filteredGenre={filteredGenre}/>
            )}
            <AddFilmModal visible={isAdding} onHide={() => setIsAdding(false)}
                          onFilmAdded={() => newFilm} ageRestriction={ageRestriction} genre={genre} search={search}
                          filteredGenre={filteredGenre}/>
            <Toast ref={toast}/>
            <ConfirmDialog/>
        </div>
    )
}