using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrjctManagementSystem.Models;
using System.Collections.Generic;

namespace PrjctManagementSystem.Controllers
{
    public class BugController : Controller
    {
        BugDbAccess bgObject = new BugDbAccess();

        //Adding task
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Bug/Create")]
        public int? Create([FromBody] BugModel bug)
        {
            return bgObject.AddBug(bug);
        }

        //Editing task
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Bug/Edit")]
        public int? Edit([FromBody]BugModel bug)
        {
            return bgObject.UpdateBug(bug);
        }

        //Editing task status
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Bug/EditStatus")]
        public int? EditBugStatus([FromBody]BugModel bug)
        {
            return bgObject.UpdateBugStatus(bug.Status, bug.Id);
        }

        //Getting one task by its id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Bug/Fetch/{id}")]
        public IEnumerable<BugModel> Fetch(int id)
        {
            return bgObject.GetBug(id);
        }

        //Getting all tasks by project Id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Bug/FetchAll/{id}")]
        public IEnumerable<BugModel> FetchAll(int id)
        {
            return bgObject.GetAllBugs(id);
        }

        //Deleting task
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Bug/Delete/{id}")]
        public int? Delete(int id)
        {
            return bgObject.DeleteBug(id);
        }
    }
}
