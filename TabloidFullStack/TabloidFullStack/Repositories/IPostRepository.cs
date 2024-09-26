using System.Collections.Generic;
using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetPostsByUser(int userId);  // Fetch posts by user ID

        Post GetPostById(int id);  // Fetch a post by its ID

        List<Post> GetAll();  // Fetch all posts
    }
}
