import React from "react";
import { useState } from "react";
import { supabase } from "../client";
import NavBar from "../components/NavBar";

export default function CreatePost() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    image_url: "",
    video_url: "",
    secret_code: "",
    upvote_count: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = async (event) => {
    event.preventDefault();

    const { error } = await supabase
      .from("posts")
      .insert({
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        video_url: post.video_url,
        upvote_count: post.upvote_count,
        secret_code: post.secret_code,
      })
      .select();

    if (error) {
      console.log(error);
    }

    window.location = "/";
  };

  return (
    <div>
      <NavBar />
      <div>
        <form>
          <label>Title</label> <br />
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Content</label>
          <br />
          <input
            type="test"
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Image URL</label>
          <br />
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={post.image_url}
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Video URL</label>
          <br />
          <input
            type="text"
            id="video_url"
            name="video_url"
            value={post.video_url}
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Secret Code</label>
          <br />
          <input
            type="password"
            id="secret_code"
            name="secret_code"
            value={post.secret_code}
            onChange={handleChange}
          />
          <br />
          <br />
          <input type="submit" value="Submit" onClick={createPost} />
        </form>
      </div>
    </div>
  );
}
