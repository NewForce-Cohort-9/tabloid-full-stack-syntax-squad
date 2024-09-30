using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;
using TabloidFullStack.Models;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        // GET: api/Post
        [HttpGet]
        public IActionResult Get()
        {
            var posts = _postRepository.GetAll();
            return Ok(posts);
        }

        // GET: api/Post/{id}
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // GET: api/Post/user/{userId}
        [HttpGet("user/{userId}")]
        public IActionResult GetByUser(int userId)
        {
            var posts = _postRepository.GetPostsByUser(userId);
            return Ok(posts);
        }
    }
}
