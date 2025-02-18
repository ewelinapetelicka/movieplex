import {Sidebar} from "primereact/sidebar";
import {useEffect, useState} from "react";
import {Film, FilmDTO} from "../../../../models/film/film";
import {AutoComplete} from "primereact/autocomplete";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {Chips} from "primereact/chips";
import {useHttp} from "../../../../hooks/http/use-http";

interface EditFilmModalProps {
    visible: boolean;
    onHide: () => void;
    onFilmEdited: () => void;
    film: Film;
    ageRestriction: { name: string, value: number | null }[];
    genre: string[];
    search: (event: any) => void;
    filteredGenre: string[];
}

export function EditFilmModal(props: EditFilmModalProps) {
    const [isFilled, setIsFilled] = useState(false);
    const [film, setFilm] = useState<FilmDTO>({
        title: "",
        director: "",
        studio: "",
        description: "",
        genre: [],
        duration: 0,
        language: "",
        ageRestriction: null,
        production: "",
        releaseDate: new Date(),
        cast: []
    });
    const http = useHttp();

    useEffect(() => {
        setFilm({
            title: props.film.title,
            director: props.film.director,
            studio: props.film.studio,
            description: props.film.description,
            genre: props.film.genre,
            duration: props.film.duration,
            language: props.film.language,
            ageRestriction: props.film.ageRestriction,
            production: props.film.production,
            releaseDate: props.film.releaseDate,
            cast: props.film.cast
        });
    }, [props.film]);

    useEffect(() => {
        if (film.title && film.director && film.studio && film.description && film.genre?.length && film.duration
            && film.language && film.ageRestriction && film.production && film.releaseDate && film.cast?.length) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [film]);

    function changeValue(field: keyof FilmDTO, value: any) {
        setFilm(prev => ({...prev, [field]: value}));
    }

    function editFilm() {
        http.patch("films/" + props.film?.id, film).then((res) => {
            return res.json();
        }).then((data) => {
            props.onFilmEdited();
            props.onHide();
        });
    }

    return (
        <Sidebar visible={props.visible} fullScreen position={"top"}
                 onHide={() => props.onHide()}>
            <div className={"w-12 flex flex-column gap-6 align-items-center justify-content-center pt-2"}>
                <div className={'flex justify-content-start w-9'}>
                    <h1>Edit film - {props.film?.title}</h1>
                </div>
                <div className={"flex gap-2 w-9"}>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"title"} className={"h-3rem text-xl w-12"}
                                   value={film.title}
                                   onChange={(e) => changeValue('title', e.target.value)}></InputText>
                        <label htmlFor="title">title</label>
                    </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"director"} className={"h-3rem text-xl w-12"}
                                   value={film.director}
                                   onChange={(e) => changeValue('director', e.target.value)}></InputText>
                        <label htmlFor="director">director</label>
                    </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"studio"} className={"h-3rem text-xl w-12"}
                                   value={film.studio}
                                   onChange={(e) => changeValue('studio', e.target.value)}></InputText>
                        <label htmlFor="studio">studio</label>
                    </span>
                </div>
                <span className="p-float-label w-9">
                    <InputTextarea placeholder={"description"} className={"h-7rem text-xl w-12"}
                                   value={film.description}
                                   onChange={(e) => changeValue('description', e.target.value)} rows={15}
                                   cols={75}></InputTextarea>
                    <label htmlFor="description">description</label>
                </span>
                <div className="card p-fluid w-9">
                    <span className="p-float-label w-12">
                        <AutoComplete className={"text-white"} multiple value={film.genre}
                                      suggestions={props.filteredGenre} completeMethod={props.search}
                                      onChange={(e) => changeValue('genre', e.target.value)}/>
                        <label htmlFor="genre">genre</label>
                    </span>
                </div>
                <div className={"flex gap-2  w-9"}>
                    <span className="p-float-label w-4">
                        <InputNumber placeholder={"duration"} className={"h-3rem text-xl w-12"}
                                     value={film.duration}
                                     onChange={(e) => changeValue('duration', e.value)}></InputNumber>
                        <label htmlFor="duration">duration</label>
                    </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"language"} className={"h-3rem text-xl w-12"}
                                   value={film.language}
                                   onChange={(e) => changeValue('language', e.target.value)}></InputText>
                        <label htmlFor="language">language</label>
                    </span>
                    <span className="p-float-label w-4">
                        <Dropdown value={film.ageRestriction}
                                  onChange={(e) => changeValue('ageRestriction', e.target.value)}
                                  optionLabel={"name"} optionValue={"value"} options={props.ageRestriction}
                                  placeholder={"Select age restriction"} className={"h-3rem text-xl w-12"}/>
                        <label htmlFor="age restriction">age restriction</label>
                    </span>
                </div>
                <div className={"flex gap-2 w-9"}>
                    <span className="p-float-label w-6">
                        <InputText placeholder={"production"} className={"h-3rem text-xl w-12"}
                                   value={film.production}
                                   onChange={(e) => changeValue('production', e.target.value)}></InputText>
                        <label htmlFor="production">production</label>
                    </span>
                    <span className="p-float-label w-6">
                        <Calendar value={film.releaseDate} dateFormat={"yy-mm-dd"}
                                  onChange={(e) => changeValue('releaseDate', e.target.value)} className={"w-12"}/>
                        <label htmlFor="release date">release date</label>
                    </span>
                </div>
                <span className="p-float-label w-9">
                    <Chips value={film.cast} onChange={(e) => changeValue('cast', e.target.value)}
                           className={"w-12 chips-full"}/>
                    <label htmlFor="cast">cast</label>
                </span>
                <div className={"w-9 flex justify-content-end"}>
                    <Button severity="success" label={"UPDATE"} disabled={!isFilled} onClick={() => editFilm()}/>
                </div>
            </div>
        </Sidebar>
    );
}