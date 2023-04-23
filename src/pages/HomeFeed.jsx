import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Post from "../components/Post";

export default function HomeFeed({ data }) {
  const [post, setPost] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    let filteredPosts = post.filter(function (item) {
      return item.title.startsWith(searchValue);
    });
    setPost(filteredPosts);
  };

  useEffect(() => {
    setPost(data);
  }, [data]);


  const sortDataNewest = () => {
    const new_sort = [...post].sort((a, b) => {
      const keyA = new Date(a.created_at);
      const keyB = new Date(b.created_at);
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    setPost(new_sort);
  };
  
  const sortDataPopular = () => {
    const pop_sort = [...post].sort((a, b) => {
      const keyA = a.upvote_count;
      const keyB = b.upvote_count;
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    setPost(pop_sort);
  };  
  

  return (
    <div>
      <NavBar />

      <div className="HomeFeed">
        <input
          className="searchInput"
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />

        <div className="sortButtonGroup">
        <button className="sortButton" onClick={sortDataNewest}>Newest</button>
          <button className="sortButton" onClick={sortDataPopular}>Most Popular</button>
          </div>

        {post && post.length > 0 ? (
          post.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              created_at={post.created_at}
              title={post.title}
              content={post.content}
              image_url={post.image_url}
              upvote_count={post.upvote_count}
            />
          ))
        ) : (
          <h3>Be the First One to Post</h3>
        )}
      </div>
    </div>
  );
}
