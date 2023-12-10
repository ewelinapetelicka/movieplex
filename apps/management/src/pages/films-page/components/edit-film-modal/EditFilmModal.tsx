import {Sidebar} from "primereact/sidebar";
import {useEffect, useState} from "react";
import {Film} from "../../../../models/film/film";
import {AutoComplete} from "primereact/autocomplete";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {Chips} from "primereact/chips";

interface EditFilmModalProps {
    visible: boolean;
    onHide: () => void;
    onFilmEdited: () => void;
    film?: Film;
    ageRestriction: { name: string, value: number | null }[];
    genre: string[];
    search: (event: any) => void;
    filteredGenre: string[];
}

export function EditFilmModal(props: EditFilmModalProps) {
    const [changeTitleFilm, setChangeTitleFilm] = useState<string>();
    const [changeDirectorFilm, setChangeDirectorFilm] = useState<string>();
    const [changeStudioFilm, setChangeStudioFilm] = useState<string>();
    const [changeDescriptionFilm, setChangeDescriptionFilm] = useState<string>();
    const [changeGenreFilm, setChangeGenreFilm] = useState<string[]>();
    const [changeDurationFilm, setChangeDurationFilm] = useState<number>();
    const [changeLanguageFilm, setChangeLanguageFilm] = useState<string>();
    const [changeAgeRestrictionFilm, setChangeAgeRestrictionFilm] = useState<number | null>();
    const [changeProductionFilm, setChangeProductionFilm] = useState<string>();
    const [changeReleaseDateFilm, setChangeReleaseDateFilm] = useState<Date>();
    const [changeCastFilm, setChangeCastFilm] = useState<string[]>();

    useEffect(() => {
        setChangeTitleFilm(props.film?.title);
        setChangeDirectorFilm(props.film?.director);
        setChangeStudioFilm(props.film?.studio);
        setChangeDescriptionFilm(props.film?.description);
        setChangeGenreFilm(props.film?.genre);
        setChangeDurationFilm(props.film?.duration);
        setChangeLanguageFilm(props.film?.language);
        setChangeAgeRestrictionFilm(props.film?.ageRestriction);
        setChangeProductionFilm(props.film?.production);
        setChangeReleaseDateFilm(new Date(props.film?.releaseDate!));
        setChangeCastFilm(props.film?.cast);
    }, [props.film]);

    function editFilm(){
        fetch('http://localhost:8000/films/' + props.film?.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: changeTitleFilm,
                director: changeDirectorFilm,
                studio: changeStudioFilm,
                description: changeDescriptionFilm,
                genre: changeGenreFilm,
                duration: changeDurationFilm,
                language: changeLanguageFilm,
                ageRestriction: changeAgeRestrictionFilm,
                production: changeProductionFilm,
                releaseDate: changeReleaseDateFilm?.toISOString().slice(0, 10),
                cast: changeCastFilm
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            props.onFilmEdited();
            props.onHide();
        });
    }

    return (
        <Sidebar visible={props.visible} fullScreen position={"top"}
                 header={<h2>Edit film - {props.film?.title}</h2>}
                 onHide={() => props.onHide()}>
            <div className={"w-12 flex flex-column gap-6 align-items-center justify-content-center pt-2"}>
                <div className={"flex gap-2 w-9"}>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"title"} className={"h-3rem text-xl w-12"}
                                   value={changeTitleFilm}
                                   onChange={(e) => setChangeTitleFilm(e.target.value)}></InputText>
                        <label htmlFor="title">title</label>
                        </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"director"} className={"h-3rem text-xl w-12"}
                                   value={changeDirectorFilm}
                                   onChange={(e) => setChangeDirectorFilm(e.target.value)}></InputText>
                        <label htmlFor="director">director</label>
                    </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"studio"} className={"h-3rem text-xl w-12"}
                                   value={changeStudioFilm}
                                   onChange={(e) => setChangeStudioFilm(e.target.value)}></InputText>
                        <label htmlFor="studio">studio</label>
                    </span>
                </div>
                <span className="p-float-label w-9">
                     <InputTextarea placeholder={"description"} className={"h-7rem text-xl w-12"}
                                    value={changeDescriptionFilm}
                                    onChange={(e) => setChangeDescriptionFilm(e.target.value)} rows={15}
                                    cols={75}></InputTextarea>
                    <label htmlFor="description">description</label>
                </span>
                <div className="card p-fluid w-9">
                    <span className="p-float-label w-12">
                    <AutoComplete className={"text-white"} multiple value={changeGenreFilm}
                                  suggestions={props.filteredGenre} completeMethod={props.search}
                                  onChange={(e) => setChangeGenreFilm(e.value)}/>
                    <label htmlFor="genre">genre</label>
                    </span>
                </div>
                <div className={"flex gap-2  w-9"}>
                    <span className="p-float-label w-4">
                    <InputNumber placeholder={"duration"} className={"h-3rem text-xl w-12"}
                                 value={changeDurationFilm}
                                 onChange={(e) => setChangeDurationFilm(e.value!)}></InputNumber>
                        <label htmlFor="duration">duration</label>
                    </span>
                    <span className="p-float-label w-4">
                    <InputText placeholder={"language"} className={"h-3rem text-xl w-12"}
                               value={changeLanguageFilm}
                               onChange={(e) => setChangeLanguageFilm(e.target.value)}></InputText>
                        <label htmlFor="language">language</label>
                    </span>
                    <span className="p-float-label w-4">
                    <Dropdown value={changeAgeRestrictionFilm} onChange={(e) => setChangeAgeRestrictionFilm(e.value)}
                              optionLabel={"name"} optionValue={"value"} options={props.ageRestriction}
                              placeholder={"Select age restriction"} className={"h-3rem text-xl w-12"}/>
                        <label htmlFor="age restriction">age restriction</label>
                    </span>
                </div>
                <div className={"flex gap-2 w-9"}>
                    <span className="p-float-label w-6">
                    <InputText placeholder={"production"} className={"h-3rem text-xl w-12"}
                               value={changeProductionFilm}
                               onChange={(e) => setChangeProductionFilm(e.target.value)}></InputText>
                        <label htmlFor="production">production</label>
                    </span>
                    <span className="p-float-label w-6">
                    <Calendar value={changeReleaseDateFilm} dateFormat={"yy-mm-dd"}
                              onChange={(e) => setChangeReleaseDateFilm(e.value!)} className={"w-12"}/>
                        <label htmlFor="release date">release date</label>
                    </span>
                </div>
                <span className="p-float-label w-9">
                <Chips value={changeCastFilm} onChange={(e) => setChangeCastFilm(e.value!)} className={"w-12 chips-full"}/>
                    <label htmlFor="cast">cast</label>
                </span>
                <div className={"w-full flex justify-content-evenly"}>
                    <Button icon="pi pi-times" severity="danger" onClick={()=> props.onHide()} />
                    <Button severity="success" label={"UPDATE"} onClick={()=>editFilm()}/>
                </div>
            </div>
        </Sidebar>
    );
}