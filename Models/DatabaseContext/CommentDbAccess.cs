using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System;
using Dapper;
using ProjectManagementSystem;

namespace PrjctManagementSystem.Models
{
    public class CommentDbAccess
    {
        private readonly string ConnectionString = Startup.ConnectionString;
        //Inserting a new record of comment
        public int? AddComment(CommentModel comment)
        { 
            comment.TimeChanged = DateTime.Now;
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Insert(comment);
            }
        }

        //Deleting record of comment
        public int? DeleteComment(int commentId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Delete<CommentModel>(commentId);
            }
        }

        //Editing comment record
        public int? UpdateComment(CommentModel comment)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                string query = @"update tbTaskComment SET content = @content, timechanged = @timechanged where Id = @cmntId";
                var result = db.Execute(query, new
                {
                    content = comment.Content,
                    timechanged = comment.TimeChanged,
                    cmntId = comment.Id
                });
                return result;
            }
        }
        
        //Fetching all records of comments by its id of task
        public IEnumerable<CommentModel> GetAllComments(int taskId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<CommentModel>(new { Fk_Task_Id = taskId });
            }
        }
    }
}
