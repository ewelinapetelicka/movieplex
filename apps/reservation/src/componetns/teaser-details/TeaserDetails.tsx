import {Teaser} from "../../models/teaser/teaser";
import {Title} from "../common/title/Title";
import {Chip} from "../common/chip/Chip";
import style from "../../pages/film/FilmPage.module.css";
import {ReleaseDate} from "../common/date/Date";

interface TeaserDetailsProps {
    teaser: Teaser
}

export function TeaserDetails(props: TeaserDetailsProps) {
    return (
        <div className={"flex items-stretch justify-items-start"} style={{minHeight: "calc(100vh - 80px)"}}>
            <div className={'w-[35%] bg-center bg-cover'}
                 style={{backgroundImage: 'url(/posters/' + props.teaser?.poster + ')'}}/>
            <div className={"bg-gray-800 text-blue-50 w-[65%] justify-evenly flex flex-col pl-3"}>
                <Title text={props.teaser.title}></Title>
                <div>
                    <p className={"pb-2 pr-10"}>{props.teaser?.description}</p>
                    <p className={"flex gap-3 pt-2"}>{props.teaser?.genre.map((el) => {
                        return (
                            <Chip key={el} text={el}></Chip>
                        )
                    })}</p>
                </div>
                <div>
                    <table className={style.table}>
                        <tbody>
                        <tr>
                            <td>Release date:</td>
                            <td><ReleaseDate date={props.teaser.releaseDate}></ReleaseDate></td>
                        </tr>
                        <tr>
                            <td>Teaser release date:</td>
                            <td><ReleaseDate date={props.teaser.teaserReleaseDate}></ReleaseDate></td>
                        </tr>
                        <tr>
                            <td>Production:</td>
                            <td>{props.teaser?.production}</td>
                        </tr>
                        <tr>
                            <td>Studio:</td>
                            <td>{props.teaser?.studio}</td>
                        </tr>
                        <tr>
                            <td>Cast:</td>
                            <td>{props.teaser?.cast}</td>
                        </tr>
                        <tr>
                            <td>Director:</td>
                            <td>{props.teaser?.director}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}