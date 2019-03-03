using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace PrjctManagementSystem.Models
{
    public class TaskDbAccess
    {
        private readonly string ConnectionString = Startup.ConnectionString;

        //Inserting a new record of task
        public int? AddTask(TaskModel tsk)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                tsk.Status = "Nezapočatý";
                return db.Insert(tsk);
            }
        }

        //Deleting record of task
        public int? DeleteTask(int taskId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Delete<TaskModel>(taskId);
            }
        }

        //Editing task record
        public int? UpdateTask(TaskModel tsk)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                
                string query = @"update tbTask SET name = @name, description = @description where Id = @tskid";

                var result = db.Execute(query, new
                {
                    name = tsk.Name,
                    description = tsk.Description,
                    status = tsk.Status,
                    tskid = tsk.Id
                });

                return result;
            }
        }

        //Editing task status
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

        //Archiving task
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
        
        //Fetching record of task by its id of project
        public IEnumerable<TaskModel> GetTasks(int projectId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<TaskModel>(new { Fk_Project_Id = projectId });
            }
        }
        
        //Fetching all records of tasks by its id of project
        public IEnumerable<TaskModel> GetAllTasks(int projectId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<TaskModel>(new { Fk_Project_Id = projectId });
            }
        }

        //Fetching archived task by its id of project
        public IEnumerable<ArchivedTaskModel> GetArchivedTasks(int projectId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<ArchivedTaskModel>(new { Fk_Project_Id = projectId });
            }
        }



    }
}