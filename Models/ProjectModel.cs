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
        public string Assigned { get; set; }

        //Vlastnosti které nejsou obsaženy v databázové tabulce
        [Editable(false)]
        public string ParticipientsString { get; set; }
    }
}
