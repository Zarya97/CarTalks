import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../client";

export default function PostComments(props) {
    const [usercomments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const inputRef = useRef(null);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        handleCreateComment();
        inputRef.current.value = "";
    };

    return (
        <div className="CommentClass">
            <h3>Comments:</h3>
            {usercomments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.comments}</p>
                    <span>Posted on: {new Date(comment.created_at).toLocaleString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</span>
                </div>
            ))}
            <div className="PostComment">
                <form onSubmit={handleSubmit}>
                    <textarea type="text" onChange={handleCommentChange} ref={inputRef} placeholder="Add a comment..." />
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
}
