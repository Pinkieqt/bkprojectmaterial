using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using System.Text;
using PrjctManagementSystem.Controllers;
using ProjectManagementSystem;

namespace PrjctManagementSystem.Models
{
    public class UserDbAccess
    {
        private readonly string ConnectionString = Startup.ConnectionString;

        //Creating admin if not in database every run
        public void AddAdmin()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                IEnumerable<User> tmp = db.GetList<User>(new {login = "admin"});
                if(tmp.AsList().Count == 0)
                {
                    User tmpUser = new User(){
                        Login = "admin",
                        Password = GenerateHash("admin"),
                        First_name = "Administrator",
                        Last_name = "Administrator",
                        Email = "admin@admin.cz",
                        Role = 1,
                        getEmails = true                      
                    };
                    db.Insert(tmpUser);
                }
            }

        }


        //Inserting a new record of User
        public int? AddUser(User user)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                user.Password = GenerateHash(user.Password);
                user.getEmails = true;
                return db.Insert(user);
            }
        }

        //Fetching all users from database
        public IEnumerable<User> GetUsers()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<User>();
            }
        }

        //Deleting user record
        public int DeleteUser(string plogin)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.DeleteList<User>(new { login = plogin });
            }
        }

        //Fetching user by login
        public IEnumerable<User> GetUserByLogin(string plogin)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<User>(new {login = plogin});
            }
        }

        //Editing user record
        public int? UpdateUser(User user)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                
                string query = @"update tbUser SET first_name = @firstName, last_name = @lastName, email = @email where login = @tmplogin";

                var result = db.Execute(query, new
                {
                    firstName = user.First_name,
                    lastName = user.Last_name,
                    email = user.Email,
                    tmplogin = user.Login
                });

                return 1;
            }
        }

        //Generate hash function
        public static string GenerateHash(string input)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }


        //Checks if hash is the same
        public bool CheckHash(string pass, string hash)
        {
            string tmpHash = GenerateHash(pass);
            if (tmpHash == hash)
            {
                return true;
            }
            else return false;
        }
    }
}