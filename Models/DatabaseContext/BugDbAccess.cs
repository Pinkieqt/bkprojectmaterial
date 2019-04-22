using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using ProjectManagementSystem;

namespace PrjctManagementSystem.Models
{
    public class BugDbAccess
    {
        private readonly string ConnectionString = Startup.ConnectionString;

        //Inserting a new record of task
        public int? AddBug(BugModel bug)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                bug.Status = "Nový";
                bug.Labels = string.Join(",", bug.LabelsString);
                bug.Assigned = string.Join(",", bug.AssignedString);
                return db.Insert(bug);
            }
        }

        //Deleting record of task
        public int? DeleteBug(int bugId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                string query = @"execute spDeleteBug @id";

                return db.Execute(query, new
                {
                    id = bugId
                });
            }
        }

        //Editing task record
        public int? UpdateBug(BugModel bug)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                const string quote = "\""; 
                bug.Labels = string.Join(",", bug.LabelsString);
                bug.Assigned = string.Join(",", bug.AssignedString);
                string query = @"update tbBug SET name = @name, description = @description, priority = @priority, labels = @labels, assigned = @assigned, " + quote + "end" + quote + " = @end where Id = @bugid";

                var result = db.Execute(query, new
                {
                    name = bug.Name,
                    description = bug.Description,
                    status = bug.Status,
                    priority = bug.Priority,
                    labels = bug.Labels,
                    assigned = bug.Assigned,
                    end = bug.End,
                    bugid = bug.Id
                });

                return result;
            }
        }

        //Editing task status
        public int? UpdateBugStatus(string status, int id)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                
                string query = @"update tbBug SET status = @status where Id = @bugId";

                var result = db.Execute(query, new
                {
                    status = status,
                    bugId = id
                });

                return result;
            }
        }

        //Fetching record of task by its id of project
        public IEnumerable<BugModel> GetBug(int bugId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<BugModel>(new { id = bugId });
            }
        }

        //Fetching all records of tasks by its id of project
        public IEnumerable<BugModel> GetAllBugs(int projectId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<BugModel>(new { Fk_Project_Id = projectId });
            }
        }
    }
}