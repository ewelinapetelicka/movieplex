import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Teaser} from "../../models/teaser/teaser";
import {useNavigate} from "react-router-dom";
import {TeaserDetails} from "../../componetns/teaser-details/TeaserDetails";
import {ErrorBoard} from "../error/ErrorBoard";
import {CommentsSection} from "../../componetns/comments-section/CommentsSection";
import {Comment} from "../../models/comment/Comment";

export function UpcomingFilmPage() {
    const params = useParams();
    const [teaser, setTeaser] = useState<Teaser>();
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [comments, setComments] = useState<Comment[] | undefined>();

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

    useEffect(() => {
        getComments()
    }, []);

    function getComments() {
        fetch('http://localhost:8000/comments?teaserId=' + params.id)
            .then(response => response.json())
            .then((data: Comment[]) => {
                if (!data) {
                    navigate("/error")
                }
                setComments(data);
            })
            .catch((error) => setIsError(true));
    }

    if (!teaser) {
        return <ErrorBoard></ErrorBoard>
    }

    if (isError) {
        return <ErrorBoard></ErrorBoard>
    }

    return (
        <div className={"flex items-stretch justify-items-start"} style={{minHeight: "calc(100vh - 80px)"}}>
            <div className={'w-[35%] bg-center bg-cover'}
                 style={{backgroundImage: 'url(/posters/' + teaser.poster + ')'}}/>
            <div className={'flex flex-col w-[65%]'}>
                <TeaserDetails teaser={teaser}></TeaserDetails>
                <CommentsSection comments={comments} teaserId={teaser.id}
                                 onCommentAdded={() => getComments()}></CommentsSection>
            </div>
        </div>
    )
}