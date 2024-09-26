using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Identity.Client;
using System.ComponentModel;
using System.Data.SqlTypes;
using System.Diagnostics.Eventing.Reader;
using System.Reflection;
using System.Security.Cryptography;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class TagsRepository : BaseRepository, ITagsRepository
    {

        public TagsRepository(IConfiguration configuration) : base(configuration) { }


        public List<Tags> GetAll()



        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, [Name] FROM Tag ORDER BY [Name]";


                    var reader = cmd.ExecuteReader();

                    var tags = new List<Tags>();

                    while (reader.Read())
                    {

                        tags.Add(new Tags()
                        {
                            Id = DbUtils.GetInt
                            (reader, "Id"),
                            Name = DbUtils.GetString
                                (reader, "Name"),
                        }
                            );


                    }
                    reader.Close();
                    return tags;

                }
            }


        }

        public void Add(Tags tags)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                INSERT INTO Tag (Id, Name)
                                OUTPUT INSERTED .ID 
                                VALUES (@PostId, @Id, @Name)
                               ";

                    DbUtils.AddParameter(cmd, "@Id", tags.Id);
                    DbUtils.AddParameter(cmd, "@Name", tags.Name);

                    tags.Id = (int)cmd.ExecuteScalar();


                }

            }

        }

        public void Update(Tags tags)

        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                                   UPDATE Tag
                                       Set Id = @Id
                                        Name = @Name
                                    Where Id =@Id";

                    DbUtils.AddParameter(cmd, "@Id", tags.Id);
                    DbUtils.AddParameter(cmd, "@Name", tags.Name);


                    cmd.ExecuteNonQuery();


                }
            }


        }

        public void Delete(Tags tags)

        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = "DELETE FROM Tag WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", tags);


                    cmd.ExecuteNonQuery();





                }
            }


        }

    }

}

        

  
      

            

      
