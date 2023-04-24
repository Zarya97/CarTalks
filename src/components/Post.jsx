import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Video from "./Video";
import ReactLoading from 'react-loading';

export default function Post(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="Post">
      {loading && <ReactLoading type={'spin'} color={'#000000'} height={'20%'} width={'20%'} />
}
      {!loading && (
        <>
          <h2>{props.title}</h2>
          {props.image_url && <img src={props.image_url} />}
          {props.video_url && <Video videoId={props.video_url} />}
          <p>{props.upvote_count} upvotes</p>
          <Link to={"/" + props.id}>
            <button className="postButton">View Post</button>
          </Link>
        </>
      )}
    </div>
  );
}
