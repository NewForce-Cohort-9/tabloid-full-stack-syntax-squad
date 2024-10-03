import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();  // Get the post ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Use the correct API URL
    fetch(`https://localhost:5001/api/Post/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      {/* Display the header image if it exists */}
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      <p>{post.content}</p>
      <p>Published: {new Date(post.publishDateTime).toLocaleDateString()}</p>
      <p>Author: {post.author.displayName}</p>
      <p>Category: {post.category.name}</p>
    </div>
  );
};

export default PostDetail;
