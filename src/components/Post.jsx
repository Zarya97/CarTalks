import React from "react";
import { Link } from "react-router-dom";
import Video from "./Video";

export default function Post(props) {
  return (
    <div className="Post">
      <h2>{props.title}</h2>
      {props.image_url && <img src={props.image_url} />}
      {props.video_url && <Video videoId={props.video_url} />}
      <p>{props.upvote_count} upvotes</p>

      <Link to={"/" + props.id}>
        <button className="postButton">View Post</button>
      </Link>
    </div>
  );
}

