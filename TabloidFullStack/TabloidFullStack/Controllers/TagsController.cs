using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
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

        [HttpPost]
        public IActionResult Post(Tags tags)
        {
          
            _tagsRepository.Add(tags);
            return CreatedAtAction("Get", new { id = tags.Id }, tags);
        }



    }
}
