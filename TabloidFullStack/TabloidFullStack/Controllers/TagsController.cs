using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ITagsRepository _tagsRepository;

        public TagsController(ITagsRepository tagsRepository)
        {
            _tagsRepository = tagsRepository;
        }


        [HttpGet]

        public IActionResult Get()
        {
            return Ok(_tagsRepository.GetAll());
        }


        
    }
}
