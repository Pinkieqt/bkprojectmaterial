using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrjctManagementSystem.Models;
using System.Collections.Generic;

namespace PrjctManagementSystem.Controllers
{
    public class BugController : Controller
    {
        BugDbAccess bgObject = new BugDbAccess();

        //Přidání bugu
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Bug/Create")]
        public int? Create([FromBody] BugModel bug)
        {
            return bgObject.AddBug(bug);
        }

        //aktualizace bugu
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Bug/Edit")]
        public int? Edit([FromBody]BugModel bug)
        {
            return bgObject.UpdateBug(bug);
        }

        //Aktualizace statusu u bugu
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Bug/EditStatus")]
        public int? EditBugStatus([FromBody]BugModel bug)
        {
            return bgObject.UpdateBugStatus(bug.Status, bug.Id);
        }

        //Ziskání jednoho bugu podle jeho id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Bug/Fetch/{id}")]
        public IEnumerable<BugModel> Fetch(int id)
        {
            return bgObject.GetBug(id);
        }

        //Získání všech komentářů podle id projektu
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Bug/FetchAll/{id}")]
        public IEnumerable<BugModel> FetchAll(int id)
        {
            return bgObject.GetAllBugs(id);
        }

        //Smazání bugu
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Bug/Delete/{id}")]
        public int? Delete(int id)
        {
            return bgObject.DeleteBug(id);
        }
    }
}
