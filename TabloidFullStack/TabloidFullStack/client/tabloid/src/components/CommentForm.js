// CommentForm component handles both adding a new comment and editing an existing comment
import React, { useState, useEffect } from "react"; // Import React and hooks for managing state and side effects
import { useParams, useNavigate  } from "react-router-dom"; // Import useParams for getting URL parameters, useNavigate for navigation
import { addComment, editComment, getCommentById } from "../../Managers/CommentManager"; // Import functions for adding, editing, and getting comments

// Define the CommentForm component
export const CommentForm = () => {
  // Get postId and commentId from the URL using useParams
  const { postId, commentId } = useParams();
  
  // State to store the subject and content of the comment
  const [subject, setSubject] = useState(""); // Initial value is an empty string
  const [content, setContent] = useState(""); // Initial value is an empty string
  
  // State to track whether we are editing an existing comment (true) or adding a new one (false)
  const [commentBeingEdited, setCommentBeingEdited] = useState(false);
  
  // Initialize navigate to programmatically redirect the user after actions
  const navigate = useNavigate();

  // useEffect hook to load the comment data if we are editing (i.e., if commentId exists)
  useEffect(() => {
    if (commentId) {
      // Fetch the comment by its ID for editing
      getCommentById(commentId).then(comment => {
        setSubject(comment.subject); // Set the comment's subject in state
        setContent(comment.content); // Set the comment's content in state
        setCommentBeingEdited(true); // Indicate that we're editing a comment
      }).catch(() => {
        // If there's an error (e.g., comment not found), navigate back to the comments page
        navigate(`/posts/${postId}/comments`);
      });
    }
  }, [commentId, navigate, postId]); // Re-run this effect if these values change

  // Function to handle form submission for both adding and editing comments
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Get the logged-in user's profile from local storage
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    // If no user profile is found, show an alert and stop
    if (!userProfile) {
      alert("You must be logged in to comment!");
      return;
    }

    // Create a comment object with the form data and user information
    const comment = {
      id: commentId, // If commentId exists, it means we're editing, otherwise this will be undefined for adding
      subject, // Subject from state
      content, // Content from state
      postId, // postId from URL
      userProfileId: userProfile.id, // Logged-in user's ID
    };

    // Check if we are editing or adding a comment
    if (commentBeingEdited) {
      // If editing, call editComment function
      await editComment(commentId, { ...comment }); // Pass the comment data to update it
    } else {
      // If adding a new comment, call addComment function
      await addComment(comment); // Add the new comment to the post
    }

    // After saving, navigate back to the comments list for the post
    navigate(`/posts/${postId}/comments`);
  };

  return (
    // Render the comment form
    <form onSubmit={handleSubmit}>
      <div>
        {/* Input field for the subject of the comment */}
        <input
          type="text"
          placeholder="Subject"
          value={subject} // Set value from state
          onChange={(e) => setSubject(e.target.value)} // Update state when the input changes
          required // Make this field required
        />
      </div>
      <div>
        {/* Textarea for the content of the comment */}
        <textarea
          placeholder="Content"
          value={content} // Set value from state
          onChange={(e) => setContent(e.target.value)} // Update state when the input changes
          required // Make this field required
        />
      </div>
      {/* Submit button text changes based on whether we're adding or editing */}
      <button type="submit">{commentBeingEdited ? "Save Changes" : "Add Comment"}</button>
      
      {/* Cancel button to go back to the comments page without saving */}
      <button onClick={() => navigate(`/posts/${postId}/comments`)} className="btn btn-secondary">Cancel</button>
    </form>
  );
};
