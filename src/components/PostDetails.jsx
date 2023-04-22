import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

export default function PostDetails(props) {

  const [upvotes, setUpvotes] = useState(props.details.upvote_count);

  const updateUpvotes = async (event) => {
    event.preventDefault();
    var count = upvotes + 1;
    const { error } = await supabase
      .from("posts")
      .update({
        upvote_count: count,
      })
      .eq("id", props.details.id);

    if (error) {
      console.log(error);
    } else {
      setUpvotes(count);
      props.details.upvote_count = count
    }

  };

  const Downvotes = async (event) => {
    event.preventDefault();
    var count = upvotes - 1;
    const { error } = await supabase
      .from("posts")
      .update({
        upvote_count: count,
      })
      .eq("id", props.details.id);

    if (error) {
      console.log(error);
    } else {
      setUpvotes(count);
      props.details.upvote_count = count
    }

  };

  return (
    <div className="PostDetails">
      <h2>{props.details.title}</h2>
      <img src={props.details.image_url} width="500" height="500" />
      <p>{props.details.content}</p>
      <p>{upvotes} upvotes</p>

      <Link to={"edit/" + props.details.id}>
        <button className="postButton">Edit</button>
      </Link>
      <button className="postButton" onClick={updateUpvotes}>⬆️</button>
      <button className="postButton" onClick={Downvotes}>⬇️</button>

    </div>
  );

}
