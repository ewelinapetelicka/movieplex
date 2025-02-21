import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Teaser} from "../../models/teaser/teaser";
import {useNavigate} from "react-router-dom";
import {TeaserDetails} from "../../componetns/teaser-details/TeaserDetails";
import {ErrorBoard} from "../error/ErrorBoard";

export function UpcomingFilmPage() {
    const params = useParams();
    const [teaser, setTeaser] = useState<Teaser>();
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/teasers/' + params.id)
            .then(response => response.json())
            .then((data: Teaser) => {
                if (!data) {
                    navigate("/error")
                }
                setTeaser(data)
            })
            .catch((error) => setIsError(true));
    }, []);

    if (!teaser) {
        return <ErrorBoard></ErrorBoard>
    }

    if (isError) {
        return <ErrorBoard></ErrorBoard>
    }

    return (
        <div>
            <TeaserDetails teaser={teaser}></TeaserDetails>
        </div>
    )
}