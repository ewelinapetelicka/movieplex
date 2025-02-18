import {InputText} from "primereact/inputtext";
import {AutoComplete} from "primereact/autocomplete";
import {Calendar} from "primereact/calendar";
import {Chips} from "primereact/chips";
import {Button} from "primereact/button";
import {Sidebar} from "primereact/sidebar";
import {Teaser, TeaserDTO} from "../../../../models/teaser/teaser";
import {useEffect, useState} from "react";
import {useHttp} from "../../../../hooks/http/use-http";

interface EdiTeaserModelProps {
    visible: boolean;
    onHide: () => void;
    onTeaserEdited: () => void;
    teaser: Teaser,
    genre: string[];
    search: (event: any) => void;
    filteredGenre: string[];
}

export function EditTeaserModal(props: EdiTeaserModelProps) {
    const [isFilled, setIsFilled] = useState(false);
    const [teaser, setTeaser] = useState<TeaserDTO>({
        title: '',
        director: '',
        studio: '',
        genre: [],
        production: '',
        releaseDate: new Date(),
        cast: [],
        teaserReleaseDate: new Date(),
        earlyRating: 0
    })

    const http = useHttp();
    useEffect(() => {
        setTeaser({
            title: props.teaser.title,
            director: props.teaser.director,
            studio: props.teaser.studio,
            genre: props.teaser.genre,
            production: props.teaser.production,
            releaseDate: props.teaser.releaseDate,
            cast: props.teaser.cast,
            teaserReleaseDate: props.teaser.teaserReleaseDate,
            earlyRating: props.teaser.earlyRating
        })
    }, [props.teaser]);

    useEffect(() => {
        if (teaser.title && teaser.director && teaser.studio && teaser.genre?.length && teaser.production
            && teaser.releaseDate && teaser.cast?.length && teaser.teaserReleaseDate && teaser.earlyRating) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [teaser]);

    function changeValue(field: keyof TeaserDTO, value: any) {
        setTeaser(prev => ({...prev, [field]: value}));
    }

    function editTeaser() {
        http.patch("teaser/" + props.teaser?.id, teaser).then((res) => {
            return res.json();
        }).then((data) => {
            props.onTeaserEdited();
            props.onHide();
        });
    }

    return (
        <Sidebar visible={props.visible} fullScreen position="top"
                 onHide={() => props.onHide()}>
            <div className={"w-12 flex flex-column gap-6 align-items-center justify-content-center pt-4"}>
                <div className={'flex justify-content-start w-9'}>
                    <h1>Add new teaser</h1>
                </div>
                <div className={"flex gap-2 w-9"}>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"title"} className={"h-3rem text-xl w-12"}
                                   value={teaser.title}
                                   onChange={(e) => changeValue('title', e.target.value)}></InputText>
                        <label htmlFor="title">title</label>
                    </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"director"} className={"h-3rem text-xl w-12"}
                                   value={teaser.director}
                                   onChange={(e) => changeValue('director', e.target.value)}></InputText>
                        <label htmlFor="director">director</label>
                    </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"studio"} className={"h-3rem text-xl w-12"}
                                   value={teaser.studio}
                                   onChange={(e) => changeValue('studio', e.target.value)}></InputText>
                        <label htmlFor="studio">studio</label>
                    </span>
                </div>
                <div className="card p-fluid w-9">
                    <span className="p-float-label w-12">
                        <AutoComplete className={"text-white"} multiple value={teaser.genre}
                                      suggestions={props.filteredGenre} completeMethod={props.search}
                                      onChange={(e) => changeValue('genre', e.target.value)}/>
                        <label htmlFor="genre">genre</label>
                    </span>
                </div>
                <div className={"flex gap-2 w-9"}>
                    <span className="p-float-label w-6">
                        <InputText placeholder={"production"} className={"h-3rem text-xl w-12"}
                                   value={teaser.production}
                                   onChange={(e) => changeValue('production', e.target.value)}></InputText>
                        <label htmlFor="production">production</label>
                    </span>
                    <span className="p-float-label w-6">
                        <Calendar value={teaser.releaseDate} dateFormat={"yy-mm-dd"}
                                  onChange={(e) => changeValue('releaseDate', e.target.value)} className={"w-12"}/>
                        <label htmlFor="release date">release date</label>
                    </span>
                    <span className="p-float-label w-6">
                        <Calendar value={teaser.teaserReleaseDate} dateFormat={"yy-mm-dd"}
                                  onChange={(e) => changeValue('teaserReleaseDate', e.target.value)}
                                  className={"w-12"}/>
                        <label htmlFor="teaser release date">teaser release date</label>
                    </span>
                </div>
                <span className="p-float-label w-9">
                    <Chips value={teaser.cast} onChange={(e) => changeValue('cast', e.target.value)}
                           className={"w-full chips-full"}/>
                    <label htmlFor="cast">cast</label>
                </span>
                <div className={"w-9 flex justify-content-end"}>
                    <Button severity="success" label={"Add film"} disabled={!isFilled} onClick={() => editTeaser()}/>
                </div>
            </div>
        </Sidebar>)
}