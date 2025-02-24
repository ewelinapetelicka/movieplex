import {useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {Comment} from "../../models/comment/Comment";

interface CommentsSectionProps {
    comments: Comment[] | undefined;
    teaserId: number;
    onCommentAdded: () => void
}

export function CommentsSection(props: CommentsSectionProps) {
    const [comment, setComment] = useState<string>();

    function addComment() {
        fetch('http://localhost:8000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teaserId: props.teaserId,
                text: comment,
            })
        }).then(() => props.onCommentAdded())
            .then(() => setComment(''))
            .catch(error => console.error(error));
    }

    return (
        <div className={' text-2xl text-amber-50 w-full h-full flex flex-col gap-3'}>
            <div className={'flex w-full h-48 justify-between items-center'}>
                <ReactQuill placeholder={'add a comment'} theme="snow" value={comment}
                            onChange={(e) => setComment(e)} className={'w-11/12'}/>
                <button onClick={() => addComment()}
                        className={"bg-orange-400 text-blue-50 p-3 rounded-md font-bold text-lg mr-4"}>POST
                </button>
            </div>
            <p className={'text-amber-50 text-sm'}>{props.comments?.length} comments</p>
            <div className={'flex flex-col gap-4 overflow-y-scroll'}>
                {props.comments?.map((comment) => {
                    return (
                        <div dangerouslySetInnerHTML={{__html: comment.text}} key={comment.id}
                             className={'text-base bg-gray-800 rounded-md pt-1 pb-1 pl-2 mr-2'}/>
                    )
                })}
            </div>
        </div>
    )
}