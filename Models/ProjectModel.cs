using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrjctManagementSystem.Models
{
    [Table("tbProject")]
    public class ProjectModel 
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [Column("Fk_Owner_Id")]
        public int Owner_Id { get; set; }

        //Properties not included in database
        [Editable(false)]
        public string ParticipientsString { get; set; }
    }
}
