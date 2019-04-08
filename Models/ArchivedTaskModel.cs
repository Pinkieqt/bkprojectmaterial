using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrjctManagementSystem.Models
{
    [Table("tbTaskArchive")]
    public class ArchivedTaskModel 
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Fk_Owner_Id { get; set; }
        public int Fk_Project_Id { get; set; }
        public string Assigned { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public string Labels { get; set; }
    }
}
