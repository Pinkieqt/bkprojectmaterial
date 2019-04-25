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

        //Metoda pro přidání admina pokud neexistuje v tabulce tbUsers
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


        //Přidání uživatele
        public int? AddUser(User user)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                user.Password = GenerateHash(user.Password);
                user.getEmails = true;
                return db.Insert(user);
            }
        }

        //Získání všech uživatelů
        public IEnumerable<User> GetUsers()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<User>();
            }
        }

        //Smazání uživatele z databáze + všech jeho projektů, úkolů, bugu a komentářů
        public int? DeleteUser(int pid)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                string query = @"execute spDeleteUser @id";

                return db.Execute(query, new
                {
                    id = pid
                });
            }
        }

        //Získání uživatele pomocí Loginu
        public IEnumerable<User> GetUserByLogin(string plogin)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                return db.GetList<User>(new {login = plogin});
            }
        }

        //Aktualizace uživatele
        public int? UpdateUser(User user)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                
                string query = @"update tbUser SET first_name = @firstName, last_name = @lastName, email = @email where login = @tmplogin";

                return db.Execute(query, new
                {
                    firstName = user.First_name,
                    lastName = user.Last_name,
                    email = user.Email,
                    tmplogin = user.Login
                });
            }
        }

        //Aktualizace stavu jestli chce uživatel dostávat emaily ze systému
        public int? ChangeUserEmailStatus(bool status, int userId)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                string query = @"UPDATE tbUser SET getEmails = @emailStatus WHERE id = @tmpId";

                return db.Execute(query, new
                {
                    emailStatus = status,
                    tmpId = userId
                });
            }
        }

        //Generování hash z dodaného hesla
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


        //Kontrola hashe
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