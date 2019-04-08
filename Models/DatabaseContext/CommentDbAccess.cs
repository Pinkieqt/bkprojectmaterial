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

        /*
        
        Komentáře k úkolu
        
        */

        //Inserting a new record of comment
        public int? AddComment(TaskCommentModel comment)
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
                return db.Delete<TaskCommentModel>(commentId);
            }
        }

        //Editing comment record
        public int? UpdateComment(TaskCommentModel comment)
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
        public IEnumerable<TaskCommentModel> GetAllComments(int taskId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<TaskCommentModel>(new { Fk_Task_Id = taskId });
            }
        }

        /*
        
        Komentáře k bugu
        
        */

        //Inserting a new record of comment
        public int? AddCommentBug(BugCommentModel comment)
        { 
            comment.TimeChanged = DateTime.Now;
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Insert(comment);
            }
        }

        //Deleting record of comment
        public int? DeleteCommentBug(int commentId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Delete<BugCommentModel>(commentId);
            }
        }

        //Editing comment record
        public int? UpdateCommentBug(BugCommentModel comment)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                string query = @"update tbBugComment SET content = @content, timechanged = @timechanged where Id = @cmntId";
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
        public IEnumerable<BugCommentModel> GetAllCommentsBug(int bugId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<BugCommentModel>(new { Fk_Task_Id = bugId });
            }
        }
    }
}
