using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using PrjctManagementSystem.Controllers;
using ProjectManagementSystem;

namespace PrjctManagementSystem.Models
{
    public class ProjectDbAccess
    {
        private readonly string ConnectionString = Startup.ConnectionString;

        //Inserting a new record of Project
        public int? AddProject(ProjectModel prjct)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Insert(prjct);
            }
        }

        //Inserting participients of project into tbProjectParticipants
        public int? AddParticipants(int? projectId, string data, string prjctName) {
            if (data == null) return -1;
            string[] idArray = data.Split(',');
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                string query = @"INSERT INTO tbProjectParticipants VALUES (@partid, @projectid)";
                IEnumerable<User> tmpUser = new UserDbAccess().GetUsers();
                foreach (string x in idArray) {
                    var result = db.Execute(query, new
                    {
                        projectid = projectId,
                        partid = Int32.Parse(x)
                    });
                    if (result != 0)
                    {
                        foreach(User temp in tmpUser){
                            if(temp.Id == Int32.Parse(x) && temp.getEmails == true){
                                new MyEmailClient().SendEmail(tmpUser.First().First_name + " " + tmpUser.First().Last_name, tmpUser.First().Email, prjctName);
                            }
                        }
                    }
                }

                return 1;
            }
        }


        //Getting project info by its Id
        public ProjectModel GetProjectByProjectId(int id)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.Get<ProjectModel>(id);
            }
        }

        //Fetching projects with userId parameter
        public IEnumerable<ProjectModel> GetProjects(int id)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<ProjectModel>(new { Fk_Owner_Id = id });
            }
        }

        //Fetching projects with participant userId parameter
        public IEnumerable<ProjectParticipantsModel> GetProjectsByParticipant(int id)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                string query = @"select * from tbProject join tbProjectParticipants on id = Fk_Project_Id where Fk_User_Id = @participantId";

                return db.Query<ProjectParticipantsModel>(query, new
                {
                    participantId = id,
                });

            }
        }
        
        //Deleting project
        public int DeleteProject(int prjctId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                
                string query = @"execute spDeleteProject @id";

                var result = db.Execute(query, new
                {
                    id = prjctId
                });

                return result;
            }
        }
        
    }
}