// Import necessary hooks and functions from React and React Router
import React, { useEffect, useState } from "react"; // useEffect to run side effects, useState to store data
import { useParams, useNavigate } from "react-router-dom"; // useParams to get URL parameters, useNavigate to programmatically navigate
import { getCommentById, deleteComment } from "../../Managers/CommentManager"; // Import functions to get and delete a comment

// Component for deleting a comment
export const DeleteComment = () => {
    // Get postId and commentId from the URL using useParams
    const { postId, commentId } = useParams();
    
    // Initialize state for storing the comment data, default is null since we haven't fetched the data yet
    const [comment, setComment] = useState(null);
    
    // Initialize navigate function to redirect the user after actions
    const navigate = useNavigate();

    // useEffect runs when the component is rendered. We are fetching the comment by its ID when the component loads.
    useEffect(() => {
        // Call getCommentById to get the specific comment using its ID
        getCommentById(commentId).then(data => {
            setComment(data); // Set the fetched comment data into state
        }).catch(() => {
            // If there's an error (e.g., comment not found), navigate back to the comments page for the post
            navigate(`/posts/${postId}/comments`);
        });
    }, [commentId, navigate, postId]); // Dependencies array to rerun this effect if these values change

    // Function to handle deletion when the "Delete" button is clicked
    const handleDelete = () => {
        // Call deleteComment to remove the comment by its ID
        deleteComment(commentId).then(() => {
            // After deletion, navigate back to the comments list for the post
            navigate(`/posts/${postId}/comments`);
        });
    };

    // If the comment hasn't been loaded yet (it's still null), display a message saying there's no comment to show
    if (!comment) {
        return <p>No comments to show</p>; 
    }

    // The UI that gets rendered when the comment is successfully fetched
    return (
        <div>
            <h2>Delete Comment</h2>
            <p>Are you sure you want to delete the following comment?</p>
            {/* Display comment details: subject, content, author, and creation date */}
            <p><strong>Subject:</strong> {comment.subject}</p>
            <p><strong>Content:</strong> {comment.content}</p>
            <p><strong>Author:</strong> {comment.userProfile.displayName}</p>
            <p><strong>Created On:</strong> {new Date(comment.createDateTime).toLocaleString()}</p>
            
            {/* Button to confirm deletion, calls handleDelete when clicked */}
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            
            {/* Button to cancel and go back to the comments list */}
            <button onClick={() => navigate(`/posts/${postId}/comments`)} className="btn btn-secondary">Cancel</button>
        </div>
    );
};
