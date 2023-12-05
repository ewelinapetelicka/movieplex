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

    const [selectedGenre, setSelectedGenre] = useState(null);
    const [filteredGenre, setFilteredGenre] = useState<string[]>([]);

    const genre = ["Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", "Historical", "Historical fiction",
        "Horror", "Magical realism", "Mystery", "Paranoid Fiction", "Philosophical", "Political", "Romance", "Saga",
        "Satire", "Science fiction", "Social", "Speculative", "Thriller", "Urban", "Western", "Animation", "Live-action",
        "Superhero", "Supernatural", "Kids", "Sci-fi", "Romance", "Drama", "Horror", "Thriller"];


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

    function AgeRestrictionSelect() {
        const ageRestriction = [
            {name: "none", value: null},
            {name: "6+", value: 6},
            {name: "12+", value: 12},
            {name: "18+", value: 18}
        ]

        return (
            <div>
                <Dropdown value={changeAgeRestrictionFilm} onChange={(e) => setChangeAgeRestrictionFilm(e.value)}
                          optionLabel={"name"} optionValue={"value"} options={ageRestriction}
                          placeholder={"Select age restriction"}/>
            </div>
        )
    }

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

    return (
        <Sidebar visible={props.visible} fullScreen position={"top"}
                 onHide={() => props.onHide()}>
            <h1>Edit film</h1>
            <div className={"flex flex-column gap-6 align-items-center"}>
                <div className={"flex gap-6"}>
                    <InputText placeholder={"title"} className={"h-3rem text-xl"}
                               value={changeTitleFilm}
                               onChange={(e) => setChangeTitleFilm(e.target.value)}></InputText>
                    <InputText placeholder={"director"} className={"h-3rem text-xl"}
                               value={changeDirectorFilm}
                               onChange={(e) => setChangeDirectorFilm(e.target.value)}></InputText>
                    <InputText placeholder={"studio"} className={"h-3rem text-xl"}
                               value={changeStudioFilm}
                               onChange={(e) => setChangeStudioFilm(e.target.value)}></InputText>
                </div>
                <InputTextarea placeholder={"description"} className={"h-7rem text-xl"}
                               value={changeDescriptionFilm}
                               onChange={(e) => setChangeDescriptionFilm(e.target.value)} rows={15}
                               cols={75}></InputTextarea>
                <div className="card p-fluid w-6">
                    <AutoComplete className={"text-white"} multiple value={changeGenreFilm}
                                  suggestions={filteredGenre} completeMethod={search}
                                  onChange={(e) => setSelectedGenre(e.value)}/>
                </div>
                <div className={"flex gap-6"}>
                    <InputNumber placeholder={"duration"} className={"h-3rem text-xl"}
                                 value={changeDurationFilm}
                                 onChange={(e) => setChangeDurationFilm(e.value!)}></InputNumber>
                    <InputText placeholder={"language"} className={"h-3rem text-xl"}
                               value={changeLanguageFilm}
                               onChange={(e) => setChangeLanguageFilm(e.target.value)}></InputText>
                    <AgeRestrictionSelect/>
                </div>
                <div className={"flex gap-6"}>
                    <InputText placeholder={"production"} className={"h-3rem text-xl"}
                           value={changeProductionFilm}
                           onChange={(e) => setChangeProductionFilm(e.target.value)}></InputText>
                    <Calendar value={changeReleaseDateFilm} dateFormat={"dd-mm-yy"} onChange={(e) => setChangeReleaseDateFilm(e.value!)} />
                </div>
                <Chips value={changeCastFilm} onChange={(e)=>setChangeCastFilm}/>
                <div className={"w-full flex justify-content-evenly"}>
                    <Button icon="pi pi-times" severity="danger"/>
                    <Button severity="success" label={"UPDATE"}/>
                </div>
            </div>

        </Sidebar>
    );
}