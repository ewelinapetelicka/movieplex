import {useEffect, useState} from "react";
import {TeaserDTO} from "../../../../models/teaser/teaser";
import {useHttp} from "../../../../hooks/http/use-http";
import {Sidebar} from "primereact/sidebar";
import {InputText} from "primereact/inputtext";
import {AutoComplete} from "primereact/autocomplete";
import {Calendar} from "primereact/calendar";
import {Chips} from "primereact/chips";
import {Button} from "primereact/button";

interface AddTeaserModelProps {
    visible: boolean;
    onHide: () => void;
    onTeaserAdded: () => void;
    genre: string[];
    search: (event: any) => void;
    filteredGenre: string[];
}

export function AddTeaserModal(props: AddTeaserModelProps) {
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
            title: '',
            director: '',
            studio: '',
            genre: [],
            production: '',
            releaseDate: new Date(),
            cast: [],
            teaserReleaseDate: new Date(),
            earlyRating: 0
        });
    }, [props.visible]);

    useEffect(() => {
        if (teaser.title && teaser.director && teaser.studio && teaser.genre?.length && teaser.production
            && teaser.releaseDate && teaser.cast?.length && teaser.teaserReleaseDate && teaser.earlyRating) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, [teaser]);

    function addValue(field: keyof TeaserDTO, value: any) {
        setTeaser(prev => ({...prev, [field]: value}));
    }

    function addTeaser() {
        http.post("teasers", teaser).then(res => res.json()).then(() => {
            props.onHide();
            props.onTeaserAdded();
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
                                   onChange={(e) => addValue('title', e.target.value)}></InputText>
                        <label htmlFor="title">title</label>
                    </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"director"} className={"h-3rem text-xl w-12"}
                                   value={teaser.director}
                                   onChange={(e) => addValue('director', e.target.value)}></InputText>
                        <label htmlFor="director">director</label>
                    </span>
                    <span className="p-float-label w-4">
                        <InputText placeholder={"studio"} className={"h-3rem text-xl w-12"}
                                   value={teaser.studio}
                                   onChange={(e) => addValue('studio', e.target.value)}></InputText>
                        <label htmlFor="studio">studio</label>
                    </span>
                </div>
                <div className="card p-fluid w-9">
                    <span className="p-float-label w-12">
                        <AutoComplete className={"text-white"} multiple value={teaser.genre}
                                      suggestions={props.filteredGenre} completeMethod={props.search}
                                      onChange={(e) => addValue('genre', e.target.value)}/>
                        <label htmlFor="genre">genre</label>
                    </span>
                </div>
                <div className={"flex gap-2 w-9"}>
                    <span className="p-float-label w-6">
                        <InputText placeholder={"production"} className={"h-3rem text-xl w-12"}
                                   value={teaser.production}
                                   onChange={(e) => addValue('production', e.target.value)}></InputText>
                        <label htmlFor="production">production</label>
                    </span>
                    <span className="p-float-label w-6">
                        <Calendar value={teaser.releaseDate} dateFormat={"yy-mm-dd"}
                                  onChange={(e) => addValue('releaseDate', e.target.value)} className={"w-12"}/>
                        <label htmlFor="release date">release date</label>
                    </span>
                    <span className="p-float-label w-6">
                        <Calendar value={teaser.teaserReleaseDate} dateFormat={"yy-mm-dd"}
                                  onChange={(e) => addValue('teaserReleaseDate', e.target.value)} className={"w-12"}/>
                        <label htmlFor="teaser release date">teaser release date</label>
                    </span>
                </div>
                <span className="p-float-label w-9">
                    <Chips value={teaser.cast} onChange={(e) => addValue('cast', e.target.value)}
                           className={"w-full chips-full"}/>
                    <label htmlFor="cast">cast</label>
                </span>
                <div className={"w-9 flex justify-content-end"}>
                    <Button severity="success" label={"Add film"} disabled={!isFilled} onClick={() => addTeaser()}/>
                </div>
            </div>
        </Sidebar>
    )
}