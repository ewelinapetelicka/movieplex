import {Sidebar} from "primereact/sidebar";
import {useContext, useEffect, useState} from "react";
import {Film} from "../../../../models/film/film";
import {useHttp} from "../../../../hooks/http/use-http";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Repertoire} from "../../../../models/repertoire/repertoire";
import {RadioButton} from "primereact/radiobutton";
import {Calendar} from "primereact/calendar";
import {addMinutesToStringTime, createDateFromTime, createTimeFromDate} from "../../../../utils/time/time.utils";
import {SelectButton} from "primereact/selectbutton";
import {ToasterContext} from "../../../../context/toaster/toaster-context";

interface PlanningDetailsProps {
    show: boolean;
    onHide: () => void;
    repertoireEdit?: Repertoire;
    repertoireAdd?: boolean;
}

export function PlanningDetails(props: PlanningDetailsProps) {
    const [films, setFilms] = useState<Film[]>();
    const [filmId, setFilmId] = useState<number>();
    const http = useHttp();
    const toasts = useContext(ToasterContext);
    const [startTime, setStartTime] = useState<Date | null | undefined>(new Date());
    const [endTime, setEndTime] = useState<string>();
    const [subtitle, setSubtitle] = useState<boolean>();
    const [language, setLanguage] = useState<string>();
    const [showingIn, setShowingIn] = useState<string>();
    const [days, setDays] = useState<number[]>();
    const [isFilled, setIsFilled] = useState(false);
    const languageOptions = ["EN", "ES", "DE", "FR", "IT", "RU"];

    const dayOptions = [
        {name: 'Monday', value: 1},
        {name: 'Tuesday', value: 2},
        {name: 'Wednesday', value: 3},
        {name: 'Thursday', value: 4},
        {name: 'Friday', value: 5},
        {name: 'Saturday', value: 6},
        {name: 'Sunday', value: 0}
    ];

    useEffect(() => {
        getFilms();
    }, []);

    useEffect(() => {
        if (startTime && language && showingIn && days?.length) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [
        startTime,
        endTime,
        language,
        subtitle,
        showingIn,
        days
    ]);

    useEffect(() => {
        setFilmId(props.repertoireEdit ? props.repertoireEdit.filmId : undefined);
        setStartTime(props.repertoireEdit ? createDateFromTime(props.repertoireEdit.time) : undefined);
        setEndTime(props.repertoireEdit ? props.repertoireEdit.time : undefined);
        setSubtitle(props.repertoireEdit ? props.repertoireEdit.enSubtitles : undefined);
        setLanguage(props.repertoireEdit ? props.repertoireEdit.language : undefined);
        setShowingIn(props.repertoireEdit ? props.repertoireEdit.showingIn : undefined);
        setDays(props.repertoireEdit ? props.repertoireEdit.days : undefined);
    }, [props.show]);

    function getFilms() {
        http.get('films')
            .then((data) => {
                setFilms(data);
            })
    }

    function saveAddedRepertoire() {
        http.post("repertoire/", {
            hallId: props.repertoireEdit?.hallId,
            filmId: filmId,
            time: createTimeFromDate(startTime!),
            enSubtitles: subtitle,
            language: language,
            showingIn: showingIn,
            days: days
        })
            .then(() => {
                props.onHide();
                toasts.show({severity: "success", summary: "Success", detail: "Repertoire added"})
            })
    }

    function saveEditedRepertoire() {
        http.patch("repertoire/" + props.repertoireEdit?.id, {
            filmId: filmId,
            time: createTimeFromDate(startTime!),
            enSubtitles: subtitle,
            language: language,
            showingIn: showingIn,
            days: days
        })
            .then(() => {
                props.onHide();
                toasts.show({severity: "success", summary: "Success", detail: "Repertoire edited"})
            })
    }

    function endTimeCount() {
        if (!startTime) {
            return;
        }
        const film = films?.find((el) => el.id === filmId);
        if (!film) {
            return "choose film"
        }
        return addMinutesToStringTime(startTime.getHours() + startTime.toISOString().slice(13, 16), film.duration + 30)
    }

    return (
        <Sidebar visible={props.show} position={"right"} onHide={() => props.onHide()}
                 className="w-7" header={<h2>Planning seance</h2>
        }>
            <div className={"flex flex-column gap-4"}>
                <Dropdown options={films} optionValue={'id'} optionLabel={'title'} scrollHeight={"500px"}
                          value={filmId} onChange={(e) => setFilmId(e.value)} placeholder={"film title"}/>
                <Calendar value={startTime} onChange={(e) => setStartTime(e.value)} timeOnly
                          placeholder={"seance start time"} selectionMode={'single'}/>
                <p>Expected seance end time: {endTimeCount()}</p>
                <div>
                    <p>English subtitles: </p>
                    <div className="flex flex-wrap justify-content-evenly">
                        <div className="flex align-items-center">
                            <RadioButton value={false} onChange={(e) => setSubtitle(e.value)}
                                         name={"subtitle"}
                                         checked={subtitle === false}/>
                            <label htmlFor="without" className="ml-2">Without </label>
                        </div>
                        <div className="flex align-items-center">
                            <RadioButton value={true} onChange={(e) => setSubtitle(e.value)}
                                         name={"subtitle"} checked={subtitle === true}/>
                            <label htmlFor="with" className="ml-2">With </label>
                        </div>
                    </div>
                </div>
                <Dropdown options={languageOptions} value={language} onChange={(e) => setLanguage(e.value)}/>
                <div>
                    <p>Showing in: </p>
                    <div className="flex flex-wrap justify-content-evenly">
                        <div className="flex align-items-center">
                            <RadioButton value="2D" onChange={(e) => setShowingIn(e.value)}
                                         checked={showingIn === "2D"} name={"showingIn"}/>
                            <label htmlFor="2d" className="ml-2">2D </label>
                        </div>
                        <div className="flex align-items-center">
                            <RadioButton value="3D" onChange={(e) => setShowingIn(e.value)}
                                         checked={showingIn === "3D"} name={"showingIn"}/>
                            <label htmlFor="3d" className="ml-2">3D</label>
                        </div>
                    </div>
                </div>
                <div className={"flex align-items-center"}>
                    <SelectButton value={days} onChange={(e) => setDays(e.value)} optionLabel="name"
                                  options={dayOptions} multiple placeholder={"film original language"}/>
                </div>
            </div>
            <div className={"w-full flex justify-content-evenly pt-4"}>
                <Button icon="pi pi-times" severity="danger" onClick={() => props.onHide()}/>
                <Button severity="success" label={"Save"} disabled={!isFilled}
                        onClick={() => props.repertoireAdd === true ? saveAddedRepertoire() : saveEditedRepertoire()}/>
            </div>
        </Sidebar>
    )
}