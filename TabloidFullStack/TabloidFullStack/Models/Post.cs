using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace TabloidFullStack.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }  

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public DateTime PublishDateTime { get; set; }  

        public bool IsApproved { get; set; }  

        public Category Category { get; set; }  
        public int CategoryId { get; set; }

        public UserProfile Author { get; set; }  
        public int UserProfileId { get; set; }
    }
}
