import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import Video from "./Video";
import ReactLoading from "react-loading";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="PostDetails">
      {loading && <ReactLoading type={'spin'} color={'#000000'} height={'20%'} width={'20%'} />
}
      {!loading && (
        <>
        <h2>{props.details.title}</h2>
        {props.details.image_url && <img src={props.details.image_url}/>}
        {props.details.video_url && <Video videoId={props.details.video_url} />}
        <p>{props.details.content}</p>
        <p>{upvotes} upvotes</p>
        <p>Posted on: {new Date(props.details.created_at).toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })}</p>

        <input className="secretCode"
          type="password"
          placeholder="Enter secret code"
          value={securityCode}
          onChange={(event) => setSecurityCode(event.target.value)}
        />
        {securityCode === secretCode ? (
          <Link to={"edit/" + props.details.id}>
            <button className="postButton">Edit/Delete</button>
          </Link>
        ) : (
          <p>
            Enter secret code to Edit/Delete
          </p>
        )}

        <button className="postButton" onClick={updateUpvotes} title="Up Vote">
          ⬆️
        </button>
        <button className="postButton" onClick={downvotes} title="Down Vote">
          ⬇️
        </button>
        </>
      )}
    </div>
  );
}
