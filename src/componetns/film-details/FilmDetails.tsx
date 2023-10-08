import {Film} from "../../models/film/film";
import {Chip} from "../common/chip/Chip";
import style from "../../pages/film/FilmPage.module.css";
import {Title} from "../common/title/Title";
import {ReleaseDate} from "../common/date/Date";

interface FilmDetailsProps {
    film: Film
}

export function FilmDetails(props: FilmDetailsProps) {
    return (
        <div className={"flex items-stretch"} style={{minHeight: "calc(100vh - 80px)"}}>
            <div className={'w-[35%] bg-center bg-cover'}
                 style={{backgroundImage: 'url(/posters/' + props.film?.poster + ')'}}></div>
            <div className={"bg-gray-800 text-blue-50 w-[65%] justify-evenly flex flex-col pl-3"}>
                <Title text={props.film.title}></Title>
                <div>
                    <p className={"pb-2 pr-10"}>{props.film?.description}</p>
                    <p className={"flex gap-3"}>{props.film?.genre.map((el) => {
                        return (
                            <Chip key={el} text={el}></Chip>
                        )
                    })}</p>
                </div>
                <div className={"flex"}>
                    <table className={style.table}>
                        <tbody>
                        <tr>
                            <td>Release date:</td>
                            <td><ReleaseDate date={props.film.releaseDate}></ReleaseDate></td>
                        </tr>
                        <tr>
                            <td>Running time:</td>
                            <td>{props.film?.duration} min</td>
                        </tr>
                        {props.film.ageRestriction && (
                            <tr>
                                <td>Age restrictions:</td>
                                <td>{props.film?.ageRestriction}</td>
                            </tr>
                        )}
                        <tr>
                            <td>Production:</td>
                            <td>{props.film?.production}</td>
                        </tr>
                        <tr>
                            <td>Studio:</td>
                            <td>{props.film?.studio}</td>
                        </tr>
                        <tr>
                            <td>Cast:</td>
                            <td>{props.film?.cast}</td>
                        </tr>
                        <tr>
                            <td>Director:</td>
                            <td>{props.film?.director}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}