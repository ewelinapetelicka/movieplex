import {Sidebar} from "primereact/sidebar";
import {useContext, useEffect, useState} from "react";
import {Film} from "../../../../models/film/film";
import {useHttp} from "../../../../hooks/http/use-http";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Repertoire} from "../../../../models/repertoire/repertoire";
import {RadioButton} from "primereact/radiobutton";
import {Calendar} from "primereact/calendar";
import {addMinutesToDate, createDateFromTime, createTimeFromDate} from "../../../../utils/time/time.utils";
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
    const [expectedTime, setExpectedTime] = useState<Date | null | undefined>()
    const [endTime, setEndTime] = useState<Date | null | undefined>();
    const [subtitle, setSubtitle] = useState<boolean>();
    const [language, setLanguage] = useState<string>();
    const [showingIn, setShowingIn] = useState<string>();
    const [days, setDays] = useState<number[]>();
    const [isFilled, setIsFilled] = useState(false);
    const languageOptions = ["EN", "ES", "DE", "FR", "IT", "RU"];

    /*
        const expectedTime = endTimeCount();
    */

    const dayOptions = [
        {name: 'Monday', value: 1},
        {name: 'Tuesday', value: 2},
        {name: 'Wednesday', value: 3},
        {name: 'Thursday', value: 4},
        {name: 'Friday', value: 5},
        {name: 'Saturday', value: 6},
        {name: 'Sunday', value: 0}
    ];

    const justifyTemplate = (option: any) => {
        return <div className={'w-4em p-0 text-base '}>{option.name}</div>;
    }

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
        setEndTime(props.repertoireEdit ? createDateFromTime(props.repertoireEdit.time) : undefined);
        setSubtitle(props.repertoireEdit ? props.repertoireEdit.enSubtitles : undefined);
        setLanguage(props.repertoireEdit ? props.repertoireEdit.language : undefined);
        setShowingIn(props.repertoireEdit ? props.repertoireEdit.showingIn : undefined);
        setDays(props.repertoireEdit ? props.repertoireEdit.days : undefined);
    }, [props.show]);

    useEffect(() => {
        setExpectedTime(endTimeCount());
        setEndTime(endTimeCount());
    }, [startTime, filmId]);

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
                toasts.show({severity: "success", summary: "Success", detail: "Repertoire edited"});
            })
    }

    function endTimeCount() {
        const film = films?.find(el => el.id === filmId);
        if (film && startTime) {
            return addMinutesToDate(startTime, film.duration + 30)
        } else return undefined;
    }

    return (
        <Sidebar visible={props.show} position={"right"} onHide={() => props.onHide()}
                 className="w-5" header={<h2>Planning seance</h2>}>
            <div className={"flex flex-column gap-4"}>
                <div className={'flex flex-column gap-2'}>
                    <label htmlFor="title" className="ml-2">film title</label>
                    <Dropdown options={films} optionValue={'id'} optionLabel={'title'} scrollHeight={"500px"}
                              value={filmId} onChange={(e) => setFilmId(e.value)} placeholder={"film title"}/>
                </div>
                <div className={'flex flex-column gap-2'}>
                    <label htmlFor="startTime" className="ml-2">start time</label>
                    <Calendar value={startTime} onChange={(e) => setStartTime(e.value)} timeOnly
                              placeholder={"seance start time"} selectionMode={'single'}/>
                </div>
                <label htmlFor="endTime" className="ml-2">expected end
                    time: {expectedTime && createTimeFromDate(expectedTime)}</label>
                <div className={'flex flex-column gap-2'}>
                    <label htmlFor="endTime" className="ml-2">end time</label>
                    <Calendar value={endTime} timeOnly
                              placeholder={"seance end time"} selectionMode={'single'}
                              minDate={expectedTime || undefined}
                              onChange={(e) => setEndTime(e.value)}/>
                </div>
                <div className={'flex flex-column gap-2'}>
                    <label htmlFor="languageOptions" className="ml-2">language options</label>
                    <Dropdown value={language} onChange={(e) => setLanguage(e.value)} options={languageOptions}
                              placeholder="Select language" className="w-full "/>
                </div>
                <div className="flex flex-column justify-content-start gap-3">
                    <label htmlFor="subtitles" className="ml-2">english subtitles</label>
                    <div className="flex flex-wrap justify-content-start pl-4">
                        <div className="flex w-16rem align-items-start">
                            <RadioButton value={false} onChange={(e) => setSubtitle(e.value)}
                                         name={"subtitle"}
                                         checked={subtitle === false}/>
                            <label htmlFor="without" className="ml-2">Without </label>
                        </div>
                        <div className="flex w-16rem align-items-start">
                            <RadioButton value={true} onChange={(e) => setSubtitle(e.value)}
                                         name={"subtitle"} checked={subtitle === true}/>
                            <label htmlFor="with" className="ml-2">With </label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-column justify-content-start gap-3">
                    <label htmlFor="ShowingIN" className="ml-2">showing in </label>
                    <div className="flex flex-wrap justify-content-start pl-4">
                        <div className="flex w-16rem align-items-start">
                            <RadioButton value="2D" onChange={(e) => setShowingIn(e.value)}
                                         checked={showingIn === "2D"} name={"showingIn"}/>
                            <label htmlFor="2d" className="ml-2">2D </label>
                        </div>
                        <div className="flex w-16rem align-items-start">
                            <RadioButton value="3D" onChange={(e) => setShowingIn(e.value)}
                                         checked={showingIn === "3D"} name={"showingIn"}/>
                            <label htmlFor="3d" className="ml-2">3D</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-column w-full gap-3">
                    <label htmlFor="daysOptions" className="ml-2">day options</label>
                    <div className='w-full flex justify-content-center'>
                        <SelectButton value={days} onChange={(e) => setDays(e.value)} optionLabel="name"
                                      options={dayOptions} multiple placeholder={"film original language"}
                                      itemTemplate={justifyTemplate}/>
                    </div>
                </div>
                <div className={"w-full flex justify-content-end"}>
                    <Button severity="success" label={"Save"} disabled={!isFilled}
                            onClick={() => props.repertoireAdd === true ? saveAddedRepertoire() : saveEditedRepertoire()}/>
                </div>
            </div>
        </Sidebar>
    )
}