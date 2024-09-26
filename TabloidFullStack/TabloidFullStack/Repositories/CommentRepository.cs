using Microsoft.Data.SqlClient; // Provides SQL-related classes (e.g., SqlConnection)
using Microsoft.Extensions.Hosting; // Provides hosting-related services (not used in this class)
using TabloidFullStack.Models; // References the models, specifically Comment, UserProfile, and Post

namespace TabloidFullStack.Repositories
{
    // CommentRepository class handles all database operations related to Comments
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        // Constructor that passes configuration settings to the base repository
        public CommentRepository(IConfiguration config) : base(config) { }

        // Method to retrieve a list of comments for a specific post by its postId
        public List<Comment> GetCommentsByPostId(int postId)
        {
            // Create and open a new connection to the database
            using (var conn = Connection)
            {
                conn.Open(); // Opens the connection

                // Create a new SQL command to fetch comments based on the postId
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.Subject, c.Content, c.UserProfileId, c.CreateDateTime, 
                               p.Id AS PostId, p.Title AS TitleOfPost, 
                               u.DisplayName AS Author
                        FROM Comment c
                        LEFT JOIN Post p ON p.Id = c.PostId
                        LEFT JOIN UserProfile u ON c.UserProfileId = u.Id
                        WHERE c.PostId = @PostId
                        ORDER BY c.CreateDateTime DESC"; // SQL query to get the comments for the post

                    // Adds the postId parameter to the query to fetch the right comments
                    cmd.Parameters.AddWithValue("@PostId", postId);

                    var reader = cmd.ExecuteReader(); // Executes the query and reads the result
                    var comments = new List<Comment>(); // Creates an empty list to store the comments

                    // Loops through the results and adds each comment to the list
                    while (reader.Read())
                    {
                        comments.Add(NewCommentFromReader(reader)); // Convert SQL row into a Comment object
                    }

                    reader.Close(); // Closes the reader when done
                    return comments; // Returns the list of comments
                }
            }
        }

        // Method to add a new comment to the database
        //public void Add(Comment comment)
        //{
        //    try
        //    {
        //        using (var conn = Connection)
        //        {
        //            conn.Open(); // Open the database connection
        //            using (var cmd = conn.CreateCommand())
        //            {
        //                // SQL query to insert a new comment
        //                cmd.CommandText = @"
        //                    INSERT INTO Comment (
        //                        Subject, Content, UserProfileId, CreateDateTime, PostId
        //                    )
        //                    OUTPUT INSERTED.ID
        //                    VALUES (
        //                        @Subject, @Content, @UserProfileId, @CreateDateTime, @PostId
        //                    )";

        //                // Add the values from the Comment object into the SQL query
        //                cmd.Parameters.AddWithValue("@Subject", comment.Subject);
        //                cmd.Parameters.AddWithValue("@Content", comment.Content);
        //                cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);
        //                cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
        //                cmd.Parameters.AddWithValue("@PostId", comment.PostId);

        //                // Execute the query and assign the generated comment ID back to the object
        //                comment.Id = (int)cmd.ExecuteScalar(); // Insert and get back the new comment ID
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle and log any errors that occur during the insert operation
        //        throw new ApplicationException("An error occurred while adding the comment.", ex);
        //    }
        //}

        //// Method to retrieve a comment by its ID (used for editing or deleting a comment)
        //public Comment GetCommentById(int commentId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open(); // Open the connection
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            // SQL query to select a comment based on its ID
        //            cmd.CommandText = @"
        //                SELECT c.Id, c.Subject, c.Content, 
        //                       c.CreateDateTime, c.UserProfileId,
        //                       c.PostId,
        //                       u.DisplayName AS Author,  
        //                       p.Title AS TitleOfPost
        //                FROM Comment c
        //                LEFT JOIN UserProfile u ON c.UserProfileId = u.Id
        //                LEFT JOIN Post p ON c.PostId = p.Id
        //                WHERE c.Id = @id";

        //            // Add the comment ID to the query as a parameter
        //            cmd.Parameters.AddWithValue("@id", commentId);
        //            var reader = cmd.ExecuteReader(); // Execute the query and get the result

        //            Comment comment = null;

        //            // If a row is returned, create a Comment object from the result
        //            if (reader.Read())
        //            {
        //                comment = NewCommentFromReader(reader); // Convert SQL row into a Comment object
        //            }

        //            reader.Close(); // Close the reader
        //            return comment; // Return the comment (or null if not found)
        //        }
        //    }
        //}

        //// Method to delete a comment by its ID
        //public void Delete(int commentId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open(); // Open the connection
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            // SQL query to delete a comment by its ID
        //            cmd.CommandText = @"
        //                DELETE FROM Comment
        //                WHERE Id = @id";

        //            // Add the comment ID to the query as a parameter
        //            cmd.Parameters.AddWithValue("@id", commentId);
        //            cmd.ExecuteNonQuery(); // Execute the query (no result needed)
        //        }
        //    }
        //}

        //// Method to edit an existing comment by its ID
        //public void Edit(int id, Comment comment)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open(); // Open the connection

        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            // SQL query to update an existing comment's details
        //            cmd.CommandText = @"
        //                UPDATE Comment
        //                SET 
        //                    Subject = @subject, 
        //                    Content = @content, 
        //                    PostId = @postId
        //                WHERE Id = @id";

        //            // Add the new values from the Comment object into the query
        //            cmd.Parameters.AddWithValue("@subject", (object)comment.Subject ?? DBNull.Value);
        //            cmd.Parameters.AddWithValue("@content", (object)comment.Content ?? DBNull.Value);
        //            cmd.Parameters.AddWithValue("@postId", comment.PostId);
        //            cmd.Parameters.AddWithValue("@id", id);

        //            // Execute the update and check if any rows were affected
        //            int rowsAffected = cmd.ExecuteNonQuery();
        //            if (rowsAffected == 0)
        //            {
        //                // If no rows were updated, throw an exception
        //                throw new Exception("No rows were updated. The comment might not exist.");
        //            }
        //        }
        //    }
        //}

        //// Helper method to convert a SQL result row into a Comment object
        //private Comment NewCommentFromReader(SqlDataReader reader)
        //{
        //    // Create and return a new Comment object with data from the SQL result
        //    return new Comment()
        //    {
        //        Id = reader.GetInt32(reader.GetOrdinal("Id")), // Get the comment ID
        //        Subject = reader.GetString(reader.GetOrdinal("Subject")), // Get the subject
        //        Content = reader.GetString(reader.GetOrdinal("Content")), // Get the content
        //        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")), // Get the creation date
        //        PostId = reader.GetInt32(reader.GetOrdinal("PostId")), // Get the post ID
        //        UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")), // Get the user profile ID
        //        UserProfile = new UserProfile
        //        {
        //            DisplayName = reader.GetString(reader.GetOrdinal("Author")), // Get the author's display name
        //        },
        //        Post = new Post
        //        {
        //            Title = reader.GetString(reader.GetOrdinal("TitleOfPost")), // Get the title of the post
        //        }
        //    };
        //}
    }
}
