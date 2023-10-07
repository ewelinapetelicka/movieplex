import {FilmDetails} from "../../componetns/film-details/FilmDetails";
import {Repertoire} from "../../componetns/repertoire/Repertoire";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Film} from "../../models/film/film";
import {useNavigate} from "react-router-dom";
import {Loader} from "../../componetns/common/loader/Loader";

export function FilmPage() {
    const params = useParams();
    const [film, setFilm] = useState<Film>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/films/' + params.id)
            .then(response => response.json())
            .then((data: Film) => {
                if (!data.isAvailable) {
                    navigate("/error")
                }
                setFilm(data)
            })
            .catch(error => console.error(error));
    }, [])

    if (!film) {
        return <Loader></Loader>
    }
    return (
        <div>
            <FilmDetails film={film}></FilmDetails>
            <Repertoire film={film}></Repertoire>
        </div>
    )
}