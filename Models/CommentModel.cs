using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrjctManagementSystem.Models
{
    [Table("tbTaskComment")]
    public class CommentModel 
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime TimeChanged { get; set; }
        public int Fk_Owner_Id { get; set; }
        public int Fk_Task_Id { get; set; }
    }
}
