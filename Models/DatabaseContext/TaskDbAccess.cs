using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using ProjectManagementSystem;

namespace PrjctManagementSystem.Models
{
    public class TaskDbAccess
    {
        private readonly string ConnectionString = Startup.ConnectionString;

        //Vložení nového záznamu úkolu
        public int? AddTask(TaskModel tsk)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                tsk.Status = "Nezapočatý";

                tsk.Labels = string.Join(",", tsk.LabelsString);
                tsk.Assigned = string.Join(",", tsk.AssignedString);

                return db.Insert(tsk);
            }
        }

        //Smazání záznamu úkolu
        public int? DeleteTask(int taskId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                string query = @"execute spDeleteTask @id";

                return db.Execute(query, new
                {
                    id = taskId
                });
            }
        }

        //Aktualizace úkolu
        public int? UpdateTask(TaskModel tsk)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                
                tsk.Labels = string.Join(",", tsk.LabelsString);
                tsk.Assigned = string.Join(",", tsk.AssignedString);
                string query = @"update tbTask SET name = @name, description = @description, priority = @priority, labels = @labels, assigned = @assigned where Id = @tskid";

                var result = db.Execute(query, new
                {
                    name = tsk.Name,
                    description = tsk.Description,
                    status = tsk.Status,
                    priority = tsk.Priority,
                    labels = tsk.Labels,
                    assigned = tsk.Assigned,
                    tskid = tsk.Id
                });

                return result;
            }
        }

        //Aktualizace statusu u úkolu
        public int? UpdateTaskStatus(string status, int id)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                
                string query = @"update tbTask SET status = @status where Id = @taskId";

                var result = db.Execute(query, new
                {
                    status = status,
                    taskId = id
                });

                return result;
            }
        }

        //Archivovat úkol
        public int? ArchiveTask(int id)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                
                string query = @"execute spArchiveTask @taskId";

                var result = db.Execute(query, new
                {
                    taskId = id
                });

                return result;
            }
        }
        
        //Získání záznamu úkolu pomocí jeho id
        public IEnumerable<TaskModel> GetTask(int taskId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<TaskModel>(new { id = taskId });
            }
        }

        //Získání archivovaného záznamu úkolu pomocí jeho id
        public IEnumerable<ArchivedTaskModel> GetArchivedTask(int taskId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<ArchivedTaskModel>(new { id = taskId });
            }
        }
        
        //Získání záznamu úkolu pomocí id projektu
        public IEnumerable<TaskModel> GetAllTasks(int projectId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<TaskModel>(new { Fk_Project_Id = projectId });
            }
        }

        //Získání archivovaného záznamu úkolu pomocí id projektu
        public IEnumerable<ArchivedTaskModel> GetArchivedTasks(int projectId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<ArchivedTaskModel>(new { Fk_Project_Id = projectId });
            }
        }



    }
}