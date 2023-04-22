import React, {useEffect, useState} from "react";
import { supabase } from "../client";

export default function PostComments(props) {
    const [usercomments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCreateComment = async () => {
        const { data, error } = await supabase.from("comments").insert({
            post: props.details.id,
            comments: newComment,
        });
    
        if (error) {
            console.error(error);
        } else {
            setComments([...usercomments, data[0]]);
            setNewComment("");
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            const { data } = await supabase
                .from("comments")
                .select("*")
                .eq("post", props.details.id)
                .order("created_at", { ascending: true });

            setComments(data);
        };

        fetchComments();
    }, [props.details.id, usercomments]);

    return (
        <div className="CommentClass">
            <div>
                <input type="text" value={newComment} onChange={handleCommentChange} />
                <button className="postButton" onClick={handleCreateComment} >⌨️</button>
            </div>
            <div>
                <h3>Comments:</h3>
                {usercomments.map(comment => (
                <div className="CommentClass">
                    <p>
                        {comment.comments}
                        <br/><br/>
                        Posted on: {new Date(comment.created_at).toLocaleString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>
                ))}
            </div>
        </div>
    );
}
