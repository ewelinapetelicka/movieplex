import {FilmDetails} from "../../componetns/film-details/FilmDetails";
import {Showtimes} from "../../componetns/showtimes/Showtimes";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Film} from "../../models/film/film";
import {useNavigate} from "react-router-dom";
import {Loader} from "../../componetns/common/loader/Loader";
import {Repertoire} from "../../models/repertoire/repertoire";
import {ErrorBoard} from "../error/ErrorBoard";

export function FilmPage() {
    const params = useParams();
    const [film, setFilm] = useState<Film>();
    const navigate = useNavigate();
    const [repertoire, setRepertoire] = useState<Repertoire[]>();
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        fetch('http://localhost:8000/films/' + params.id)
            .then(response => response.json())
            .then((data: Film) => {
                if (!data.isAvailable) {
                    navigate("/error")
                }
                setFilm(data)
            })
            .catch(error => setIsError(true));
    }, [])

    useEffect(() => {
        fetch('http://localhost:8000/films/' + params.id + "/repertoire")
            .then(response => response.json())
            .then((data: Repertoire[]) => {
                if (!data) {
                    navigate("/error")
                }
                setRepertoire(
                    data
                        .filter((el) => {
                            return el.days.includes(new Date().getDay())
                        })
                        .sort((a, b) => {
                            return parseInt(a.time.slice(0, 2)) - parseInt(b.time.slice(0, 2))
                        })
                )

            })
            .catch(error => setIsError(true))
    }, []);

    if (!film || !repertoire) {
        return <Loader></Loader>
    }

    if (isError) {
        return <ErrorBoard></ErrorBoard>
    }

    return (
        <div>
            <FilmDetails film={film}></FilmDetails>
            <Showtimes film={film} repertoire={repertoire}></Showtimes>
        </div>
    )
}