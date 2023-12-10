import {useEffect, useState} from "react";
import {Sidebar} from "primereact/sidebar";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {Calendar} from "primereact/calendar";
import {Chips} from "primereact/chips";
import {Button} from "primereact/button";
import {AutoComplete} from "primereact/autocomplete";

interface AddFilmModelProps {
    visible: boolean;
    onHide: () => void;
    onFilmAdded: () => void;
    ageRestriction: { name: string, value: number | null }[];
    genre: string[];
    search: (event: any) => void;
    filteredGenre: string[];
}

export function AddFilmModal(props: AddFilmModelProps) {
    const [addTitleFilm, setAddTitleFilm] = useState<string>();
    const [addDirectorFilm, setAddDirectorFilm] = useState<string>();
    const [addStudioFilm, setAddStudioFilm] = useState<string>();
    const [addDescriptionFilm, setAddDescriptionFilm] = useState<string>();
    const [addGenreFilm, setAddGenreFilm] = useState<string[]>();
    const [addDurationFilm, setAddDurationFilm] = useState<number>();
    const [addLanguageFilm, setAddLanguageFilm] = useState<string>();
    const [addAgeRestrictionFilm, setAddAgeRestrictionFilm] = useState<number | null>();
    const [addProductionFilm, setAddProductionFilm] = useState<string>();
    const [addReleaseDateFilm, setAddReleaseDateFilm] = useState<Date>();
    const [addCastFilm, setAddCastFilm] = useState<string[]>();
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        setAddTitleFilm("");
        setAddDirectorFilm("");
        setAddStudioFilm("");
        setAddDescriptionFilm("");
        setAddGenreFilm([]);
        setAddDurationFilm(0);
        setAddLanguageFilm("");
        setAddAgeRestrictionFilm(null);
        setAddProductionFilm("");
        setAddReleaseDateFilm(new Date());
        setAddCastFilm([]);

    }, [props.visible]);

    useEffect(() => {
        if (addTitleFilm && addDirectorFilm && addStudioFilm && addDescriptionFilm && addGenreFilm?.length && addDurationFilm
            && addLanguageFilm && addAgeRestrictionFilm && addProductionFilm && addReleaseDateFilm && addCastFilm?.length) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [
        addTitleFilm,
        addDirectorFilm,
        addStudioFilm,
        addDescriptionFilm,
        addGenreFilm,
        addDurationFilm,
        addLanguageFilm,
        addAgeRestrictionFilm,
        addProductionFilm,
        addReleaseDateFilm,
        addCastFilm
    ]);

    function addFilm() {
        fetch('http://localhost:8000/films/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: addTitleFilm,
                director: addDirectorFilm,
                studio: addStudioFilm,
                description: addDescriptionFilm,
                genre: addGenreFilm,
                duration: addDurationFilm,
                language: addLanguageFilm,
                ageRestriction: addAgeRestrictionFilm,
                production: addProductionFilm,
                releaseDate: addReleaseDateFilm,
                cast: addCastFilm
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            props.onHide();
            props.onFilmAdded();
        });
    }

    return (
        <Sidebar visible={props.visible} fullScreen position="top"
                 onHide={() => props.onHide()} header={<h2>Add new film</h2>}>
            <div className={"w-12 flex flex-column gap-6 align-items-center justify-content-center pt-4"}>
                <div className={"flex gap-2 w-9"}>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"title"} className={"h-3rem text-xl w-12"}
                                   value={addTitleFilm}
                                   onChange={(e) => setAddTitleFilm(e.target.value)}></InputText>
                        <label htmlFor="title">title</label>
                        </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"director"} className={"h-3rem text-xl w-12"}
                                   value={addDirectorFilm}
                                   onChange={(e) => setAddDirectorFilm(e.target.value)}></InputText>
                        <label htmlFor="director">director</label>
                    </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"studio"} className={"h-3rem text-xl w-12"}
                                   value={addStudioFilm}
                                   onChange={(e) => setAddStudioFilm(e.target.value)}></InputText>
                        <label htmlFor="studio">studio</label>
                    </span>
                </div>
                <span className="p-float-label w-9">
                     <InputTextarea placeholder={"description"} className={"h-7rem text-xl w-12"}
                                    value={addDescriptionFilm}
                                    onChange={(e) => setAddDescriptionFilm(e.target.value)} rows={15}
                                    cols={75}></InputTextarea>
                    <label htmlFor="description">description</label>
                </span>
                <div className="card p-fluid w-9">
                    <span className="p-float-label w-12">
                    <AutoComplete className={"text-white"} multiple value={addGenreFilm}
                                  suggestions={props.filteredGenre} completeMethod={props.search}
                                  onChange={(e) => setAddGenreFilm(e.value)}/>
                    <label htmlFor="genre">genre</label>
                    </span>
                </div>
                <div className={"flex gap-2  w-9"}>
                    <span className="p-float-label w-4">
                    <InputNumber placeholder={"duration"} className={"h-3rem text-xl w-12"}
                                 value={addDurationFilm}
                                 onChange={(e) => setAddDurationFilm(e.value!)}></InputNumber>
                        <label htmlFor="duration">duration</label>
                    </span>
                    <span className="p-float-label w-4">
                    <InputText placeholder={"language"} className={"h-3rem text-xl w-12"}
                               value={addLanguageFilm}
                               onChange={(e) => setAddLanguageFilm(e.target.value)}></InputText>
                        <label htmlFor="language">language</label>
                    </span>
                    <span className="p-float-label w-4">
                    <Dropdown value={addAgeRestrictionFilm} onChange={(e) => setAddAgeRestrictionFilm(e.value)}
                              optionLabel={"name"} optionValue={"value"} options={props.ageRestriction}
                              placeholder={"Select age restriction"} className={"h-3rem text-xl w-12"}/>
                        <label htmlFor="age restriction">age restriction</label>
                    </span>
                </div>
                <div className={"flex gap-2 w-9"}>
                    <span className="p-float-label w-6">
                    <InputText placeholder={"production"} className={"h-3rem text-xl w-12"}
                               value={addProductionFilm}
                               onChange={(e) => setAddProductionFilm(e.target.value)}></InputText>
                        <label htmlFor="production">production</label>
                    </span>
                    <span className="p-float-label w-6">
                    <Calendar value={addReleaseDateFilm} dateFormat={"yy-mm-dd"}
                              onChange={(e) => setAddReleaseDateFilm(e.value!)} className={"w-12"}/>
                        <label htmlFor="release date">release date</label>
                    </span>
                </div>
                <span className="p-float-label w-9">
                <Chips value={addCastFilm} onChange={(e) => setAddCastFilm(e.value!)} className={"w-full chips-full"} />
                    <label htmlFor="cast">cast</label>
                </span>
                <div className={"w-full flex justify-content-evenly"}>
                    <Button icon="pi pi-times" severity="danger" onClick={() => props.onHide()}/>
                    <Button severity="success" label={"Add film"} disabled={!isFilled} onClick={() => addFilm()}/>
                </div>
            </div>
        </Sidebar>
    )
}