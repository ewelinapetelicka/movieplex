import {useEffect, useState} from "react";
import {Film} from "../../models/film/film";

interface PanelProps {
    header: string;
    isAvailable: boolean;
}

export function Panel(props: PanelProps) {
    const [films, setFilms] = useState<Film[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/films')
            .then(response => response.json())
            .then((data: Film[]) => {
                setFilms(data.filter((el) => {
                    if (el.isAvailable === props.isAvailable) {
                        return true;
                    }
                    return false;
                }))
            })
            .catch(error => console.error(error));
    }, [])

    return (
        <div>
            <div className={"w-full h-10 bg-orange-400 text-gray-900 font-bold flex items-center pl-4 mb-2"}>{props.header}</div>
            <div className={"flex display justify-evenly"}>{films.map((el) => {
                return <img src={"/posters/" + el.poster} className={"w-[240px]"}></img>
            })}</div>
        </div>
    )
}