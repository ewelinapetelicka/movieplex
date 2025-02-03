import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Film} from "../../models/film/film";
import {Button} from "primereact/button";
import React, {useContext, useEffect, useRef, useState} from "react";
import {EditFilmModal} from "./components/edit-film-modal/EditFilmModal";
import {confirmDialog, ConfirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import {AddFilmModal} from "./components/add-film-modal/AddFilmModal";
import {InputText} from "primereact/inputtext";
import {useHttp} from "../../hooks/http/use-http";
import {ToasterContext} from "../../context/toaster/toaster-context";

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
    const [pageSize, setPageSize] = useState(2);
    const toaster = useContext(ToasterContext);
    const http = useHttp();
    const ageRestriction = [
        {name: "none", value: null},
        {name: "6+", value: 6},
        {name: "12+", value: 12},
        {name: "18+", value: 18}
    ];
    const [filteredGenre, setFilteredGenre] = useState<string[]>([]);

    const genre = ["Action", "Adventure", "Comedy", "Crime", "Fantasy", "Historical", "Historical fiction",
        "Horror", "Magical realism", "Mystery", "Paranoid Fiction", "Philosophical", "Political", "Romance", "Saga",
        "Satire", "Science fiction", "Social", "Speculative", "Thriller", "Urban", "Western", "Animation", "Live-action",
        "Superhero", "Supernatural", "Kids", "Sci-fi", "Romance", "Drama", "Horror"];

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
        <div className={"w-12 h-12 flex justify-content-center align-items-center flex-column"}>
            <div className={"w-10 flex justify-content-between pt-4 pb-3"}>
                <h1>FilmsPage</h1>
                <div className={"flex gap-4 align-items-center"}>
                    <span className=" flex p-input-icon-left align-items-center">
                        <InputText placeholder="Search" value={query}
                                   onChange={(event) => setQuery(event.target.value)}/>
                        <Button label={"Search"} onClick={() => searchFilm()}
                                icon={"pi pi-search"}/>
                    </span>
                    <Button severity="secondary" className={"h-3rem"}
                            label={"Add new"} onClick={() => {
                        setIsAdding(true);
                    }}/>
                </div>
            </div>
            <DataTable value={pagedFilms} tableStyle={{width: '90rem'}}>
                <Column field="title" header="TITLE"></Column>
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
            <div className={"w-9 flex justify-content-end align-items-center pt-2 gap-2"}>
                <Button severity="secondary" onClick={() => setPage(page - 1)}
                        disabled={page === 0} icon={"pi pi-angle-left"}/>
                <b>{page + 1} / </b>
                <b>{totalPages + 1}</b>
                <Button severity="secondary" onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        icon={"pi pi-angle-right"}/>
            </div>
            <EditFilmModal visible={isEditable} film={editableFilm} onHide={() => setIsEditable(false)}
                           onFilmEdited={() => filmEdited()} ageRestriction={ageRestriction} genre={genre}
                           search={search}
                           filteredGenre={filteredGenre}/>
            <AddFilmModal visible={isAdding} onHide={() => setIsAdding(false)}
                          onFilmAdded={() => newFilm} ageRestriction={ageRestriction} genre={genre} search={search}
                          filteredGenre={filteredGenre}/>
            <Toast ref={toast}/>
            <ConfirmDialog/>
        </div>
    )
}