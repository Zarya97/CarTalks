import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import NavBar from "../components/NavBar";

export default function UpdatePost({ data }) {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: null,
    title: "",
    content: "",
    image_url: "",
    upvote_count: 0,
  });

  useEffect(() => {
    const result = data.filter((item) => String(item.id) === id)[0];
    setPost({
      title: result.title,
      content: result.content,
      image_url: result.image_url,
      upvote_count: result.upvote_count,
    });
  }, [data, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updatePost = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from("posts")
      .update({
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        upvote_count: post.upvote_count,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
    }

    window.location = "/";
  };

  const deletePost = async (event) => {
    event.preventDefault();
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.log(error);
    }

    window.location = "/";
  };

  return (
    <div>
      <p>UpdatePost</p>
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
          <input type="submit" value="Submit" className="submitButton" onClick={updatePost} />
        <button className="deleteButton" onClick={deletePost}>Delete</button>
        </form>
      </div>
    </div>
  );
}
