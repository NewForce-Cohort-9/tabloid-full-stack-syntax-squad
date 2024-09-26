// Backend API URL for testing: https://localhost:5001/api/Comment?postId=3
// Frontend page URL for testing comments: http://localhost:3000/posts/20/comments

import React, { useState, useEffect } from "react"; // Import React and hooks for managing state and side effects
import { useParams, Link } from "react-router-dom"; // Import useParams to get URL parameters, Link for navigation
import { GetAllComments } from "../../Managers/CommentManager"; // Import function to fetch all comments for a post
import Comment from "./Comment"; // Import the Comment component for displaying each comment

// CommentList component to display all comments for a specific post
export const CommentList = () => {
  // Get the postId from the URL using useParams
  const { postId } = useParams();
  
  // Initialize state to store the list of comments, default is an empty array
  const [comments, setComments] = useState([]);

  // useEffect hook to fetch comments when the component mounts or when postId changes
  useEffect(() => {
    if (postId) {
      // Call GetAllComments to fetch the comments for the post
      GetAllComments(postId).then((data) => {
        // Sort comments by creation date (most recent first) and save them to state
        const sortedComments = data.sort((a, b) => new Date(b.createDateTime) - new Date(a.createDateTime));
        setComments(sortedComments); // Store sorted comments in state
      });
    }
  }, [postId]); // The effect will re-run if postId changes

  return (
    <div>
      {/* Header section with a title */}
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <h2 className="pre-wrap font-weight-light mb-0">Comments</h2>
        </div>
      </header>

      <div className="container pt-5">
        {/* Section for adding a new comment and navigating back to the post */}
        <div className="d-flex align-items-center justify-content-between w-100">
          <h1>All Comments</h1>
          {/* Link to add a new comment for the post */}
          <Link to={`/posts/${postId}/comments/add`} className="btn btn-outline-primary mx-1 text-primary">
            Add Comment
          </Link>
        </div>

        {/* Button to navigate back to the post */}
        <div className="mt-3">
          <Link to={`/posts/${postId}`} className="btn btn-secondary">Back to Post</Link>
        </div>

        {/* If no comments are available, display a message */}
        {comments.length === 0 ? (
          <p>No comments available</p>
        ) : (
          // If there are comments, display them in a table
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Content</th>
                <th>Author</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the comments array and render each comment */}
              {comments.map(comment => (
                <tr key={comment.id}>
                  {/* Pass the comment data and postId as props to the Comment component */}
                  <Comment comment={comment} postId={postId}/> 
                  {/* Passing postId is useful for operations like delete within the Comment component */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
