import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Film} from "../../models/film/film";
import {Chip} from "../../componetns/chip/Chip";

export function FilmPage() {
    const params = useParams();
    const [film, setFilm] = useState<Film>();

    useEffect(() => {
        fetch('http://localhost:8000/films/' + params.id)
            .then(response => response.json())
            .then((data: Film) => {
                setFilm(data)
            })
            .catch(error => console.error(error));
    }, [])

    return (
        <div className={"h-full flex"}>
            <img src={"/posters/" + film?.poster}/>
            <div className={"bg-gray-800 text-blue-50"}>
                <p className={"text-3xl"}>{film?.title}</p>
                <p>{film?.description}</p>
                <p className={"flex gap-3"}>{film?.genre.map((el) => {
                    return (
                        <Chip key={film?.id} text={el}></Chip>
                    )
                })}</p>
                <p>{film?.ageRestriction}</p>
                <p>{film?.production}</p>
                <p>{film?.releaseDate}</p>
                <p>{film?.studio}</p>
                <p>{film?.cast}</p>

            </div>
        </div>
    )
}