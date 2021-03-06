using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrjctManagementSystem.Models
{
    [Table("tbTaskCommentArchive")]
    public class TaskCommentArchiveModel 
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime TimeChanged { get; set; }
        public int Fk_Owner_Id { get; set; }
        public int Fk_Task_Id { get; set; }
    }
}
