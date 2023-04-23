import React from "react";
import { Link } from "react-router-dom";

export default function Post(props) {
  return (
    <div className="Post">
      <h2>{props.title}</h2>
      <img src={props.image_url}/>
      <p>{props.upvote_count} upvotes</p>

      <Link to={"/" + props.id}>
        <button className="postButton">View Post</button>
      </Link>
    </div>
  );
}
