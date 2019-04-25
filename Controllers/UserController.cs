using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PrjctManagementSystem.Models;


namespace PrjctManagementSystem.Controllers
{
    public class UserController : Controller
    {
        UserDbAccess userObject = new UserDbAccess();

        //Získání všech uživatelů
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/User/Fetch")]
        public IEnumerable<User> Fetch()
        {
            return userObject.GetUsers();
        }

        //Získání uživatele podle jeho id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/User/FetchByLogin/{login}")]
        public IEnumerable<User> FetchByLogin(string login)
        {
            return userObject.GetUserByLogin(login);
        }

        //Přidání uživatele
        [HttpPost]
        [Authorize(Roles="admin")]
        [Route("api/User/Create")]
        public int? Create([FromBody] User user)
        {
            return userObject.AddUser(user);
        }

        //Aktualizace uživatele
        [HttpPut]
        [Authorize(Roles="admin")]
        [Route("api/User/Edit")]
        public int? Edit([FromBody]User user)
        {
            return userObject.UpdateUser(user);
        }

        //Aktualizace statusu pokud chce dostávat emaily
        [HttpPut]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/User/EditEmailStatus")]
        public int? EditEmailStatus([FromBody]User user)
        {
            return userObject.ChangeUserEmailStatus(user.getEmails, user.Id);
        }

        //Smazání uživatele
        [HttpDelete]
        [Authorize(Roles="admin")]
        [Route("api/User/Delete/{id}")]
        public int? Delete(int id)
        {
            return userObject.DeleteUser(id);
        }

    }
}
