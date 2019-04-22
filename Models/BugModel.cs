using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrjctManagementSystem.Models
{
    [Table("tbBug")]
    public class BugModel 
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
        //Date
        public string Start { get; set; }
        //Date
        public string End { get; set; }
        
        //Properties not included in database
        [Editable(false)]
        public string[] LabelsString { get; set; }
        public string[] AssignedString { get; set; }
    }
}
