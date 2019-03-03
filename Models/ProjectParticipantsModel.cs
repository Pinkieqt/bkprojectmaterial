using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrjctManagementSystem.Models
{
    [Table("tbProjectParticipants")]
    public class ProjectParticipantsModel 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Fk_Owner_Id { get; set; }
        public int Fk_Project_Id { get; set; }
        public int Fk_User_Id { get; set; }
    }
}
