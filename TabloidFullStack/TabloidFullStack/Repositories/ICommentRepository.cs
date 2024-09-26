using TabloidFullStack.Models; // Imports the Comment and related models

namespace TabloidFullStack.Repositories
{
    // The ICommentRepository interface defines the methods required for interacting with comments in the system.
    public interface ICommentRepository
    {
        // Method to get a list of comments for a specific post by its postId.
        List<Comment> GetCommentsByPostId(int postId);

        // Method to add a new comment to the database.
        //    void Add(Comment comment);

        //    // Method to retrieve a single comment by its commentId. 
        //    // This is used for actions like editing or deleting a comment.
        //    Comment GetCommentById(int commentId);

        //    // Method to delete a comment from the database by its commentId.
        //    void Delete(int commentId);

        //    // Method to update an existing comment in the database.
        //    void Edit(int id, Comment comment);
        //
        }
    }
