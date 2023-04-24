import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import Video from "./Video";

export default function PostDetails(props) {
  const [securityCode, setSecurityCode] = useState("");
  const [upvotes, setUpvotes] = useState(props.details.upvote_count);
  const [secretCode, setSecretCode] = useState("");

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
      props.details.upvote_count = count;
    }
  };

  const downvotes = async (event) => {
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
      props.details.upvote_count = count;
    }
  };

  const fetchSecretCode = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("secret_code")
      .eq("id", props.details.id);

    if (error) {
      console.log(error);
    } else {
      setSecretCode(data[0].secret_code);
    }
  };

  useEffect(() => {
    fetchSecretCode();
  }, []);

  return (
    <div className="PostDetails">
      <h2>{props.details.title}</h2>
      {props.details.image_url && <img src={props.details.image_url}/>}
      {props.details.video_url && <Video videoId={props.details.video_url} />}
      <p>{props.details.content}</p>
      <p>{upvotes} upvotes</p>

      <input
        type="text"
        placeholder="Enter security code"
        value={securityCode}
        onChange={(event) => setSecurityCode(event.target.value)}
      />
      {securityCode === secretCode ? (
        <Link to={"edit/" + props.details.id}>
          <button className="postButton">Edit/Delete</button>
        </Link>
      ) : (
        <p>
          Enter secret key to Edit/Delete
        </p>
      )}

      <button className="postButton" onClick={updateUpvotes}>
        ⬆️
      </button>
      <button className="postButton" onClick={downvotes}>
        ⬇️
      </button>
    </div>
  );
}
