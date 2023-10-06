import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Film} from "../../models/film/film";
import {useNavigate} from "react-router-dom";
import {Chip} from "../chip/Chip";
import style from "../../pages/film/FilmPage.module.css";

export function FilmDetails() {
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

    return (
        <div className={"flex items-stretch justify-evenly"} style={{minHeight: "calc(100vh - 80px)"}}>
            <div className={'w-[35%] bg-center bg-cover'}
                 style={{backgroundImage: 'url(/posters/' + film?.poster + ')'}}></div>
            <div className={"bg-gray-800 text-blue-50 w-[65%] justify-evenly flex flex-col pl-3"}>
                <p className={"text-3xl"}>{film?.title}</p>
                <p className={"pt-2 pb-2"}>{film?.description}</p>
                <p className={"flex gap-3 pl-2"}>{film?.genre.map((el) => {
                    return (
                        <Chip key={el} text={el}></Chip>
                    )
                })}</p>
                <div className={"flex"}>
                    <table className={style.table}>
                        <tbody>
                        <tr>
                            <td>Release date:</td>
                            <td>{film?.releaseDate}</td>
                        </tr>
                        <tr>
                            <td>Running time:</td>
                            <td>{film?.duration}</td>
                        </tr>
                        <tr>
                            <td>Age restrictions:</td>
                            <td>{film?.ageRestriction}</td>
                        </tr>
                        <tr>
                            <td>Production:</td>
                            <td>{film?.production}</td>
                        </tr>
                        <tr>
                            <td>Studio:</td>
                            <td>{film?.studio}</td>
                        </tr>
                        <tr>
                            <td>Cast:</td>
                            <td>{film?.cast}</td>
                        </tr>
                        <tr>
                            <td>Director:</td>
                            <td>{film?.director}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}