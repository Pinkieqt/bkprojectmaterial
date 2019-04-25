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

        //Přidání komentáře k úkolu
        public int? AddComment(TaskCommentModel comment)
        { 
            comment.TimeChanged = DateTime.Now;
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Insert(comment);
            }
        }

        //Smazání komentáře z úkolu
        public int? DeleteComment(int commentId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Delete<TaskCommentModel>(commentId);
            }
        }

        //UNUSED
        //Aktualizace úkolu
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
        
        //Získání komentářů podle ID úkolu
        public IEnumerable<TaskCommentModel> GetAllComments(int taskId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<TaskCommentModel>(new { Fk_Task_Id = taskId });
            }
        }

        //Získání archivních komentářu podle ID archivního úkolu
        public IEnumerable<TaskCommentArchiveModel> GetAllArchivedComments(int taskId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<TaskCommentArchiveModel>(new { Fk_Task_Id = taskId });
            }
        }

        /*
        
        Komentáře k bugu
        
        */

        //Přidání komentáře k bugu
        public int? AddCommentBug(BugCommentModel comment)
        { 
            comment.TimeChanged = DateTime.Now;
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Insert(comment);
            }
        }

        //Smažání komentáře z Bugu
        public int? DeleteCommentBug(int commentId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Delete<BugCommentModel>(commentId);
            }
        }

        //UNUSED
        //Aktualizace komentáře u bugu
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
        
        //Získání všech komentářů k bugu
        public IEnumerable<BugCommentModel> GetAllCommentsBug(int bugId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<BugCommentModel>(new { Fk_Bug_Id = bugId });
            }
        }
    }
}
