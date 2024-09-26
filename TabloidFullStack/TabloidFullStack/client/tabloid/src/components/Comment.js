import React from "react"; // Import React
import { EditPencil, TrashcanDelete } from "../Icons"; // Import icons for edit and delete actions
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

// Comment component to display a single comment and provide edit/delete actions
export default function Comment({ comment, postId }) {
  // `comment` and `postId` are passed as props (comment data and the ID of the post)

  return (
    <>
      {/* Display the subject of the comment in a table cell */}
      <td>{comment.subject}</td>

      {/* Display the content of the comment in a table cell */}
      <td>{comment.content}</td>

      {/* Display the author's display name in a table cell */}
      <td>{comment.userProfile.displayName}</td>

      {/* Display the creation date of the comment in a table cell */}
      <td>{comment.createDateTime}</td>

      {/* Table cell for the Edit and Delete buttons */}
      <td>
        {/* Link to the edit page for this comment */}
        <Link 
          to={`/posts/${postId}/comments/edit/${comment.id}`} 
          className="btn btn-outline-primary mx-1 text-primary" 
          title="Edit Comment" // Tooltip text for accessibility
        >
          {/* Display the edit pencil icon */}
          <EditPencil size={20} /> {/* EditPencil is an icon component */}
        </Link>

        {/* Link to the delete page for this comment */}
        <Link 
          to={`/posts/${postId}/comments/delete/${comment.id}`} 
          className="btn btn-outline-danger mx-1" 
          title="Delete Comment" // Tooltip text for accessibility
        >
          {/* Display the trash can delete icon with a red color */}
          <TrashcanDelete color="#b91c1c" size={20} /> {/* TrashcanDelete is an icon component */}
        </Link>
      </td>
    </>
  );
}
