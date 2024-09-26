using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ITagsRepository
    {
        List<Tags> GetAll();

        void Add(Tags tag); 

        void Delete(Tags tag);  

        void Update(Tags tag);  
    }
}