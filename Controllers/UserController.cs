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

        //Getting users
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/User/Fetch")]
        public IEnumerable<User> Fetch()
        {
            return userObject.GetUsers();
        }

        //Getting user by login
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/User/FetchByLogin/{login}")]
        public IEnumerable<User> FetchByLogin(string login)
        {
            return userObject.GetUserByLogin(login);
        }

        //Adding user
        [HttpPost]
        [Authorize(Roles="admin")]
        [Route("api/User/Create")]
        public int? Create([FromBody] User user)
        {
            return userObject.AddUser(user);
        }

        //Editing user
        [HttpPut]
        [Authorize(Roles="admin")]
        [Route("api/User/Edit")]
        public int? Edit([FromBody]User user)
        {
            return userObject.UpdateUser(user);
        }

        //Editing user email status
        [HttpPut]
        [Authorize(Roles="admin")]
        [Route("api/User/EditEmailStatus")]
        public int? EditEmailStatus([FromBody]User user)
        {
            return userObject.ChangeUserEmailStatus(user.getEmails, user.Id);
        }

        //Deleting user
        [HttpDelete]
        [Authorize(Roles="admin")]
        [Route("api/User/Delete/{login}")]
        public int Delete(string login)
        {
            return userObject.DeleteUser(login);
        }

    }
}
