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
    public class ProjectController : Controller
    {
        ProjectDbAccess prjctObject = new ProjectDbAccess();

        //Přidání projektu
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Project/Create")]
        public int? Create([FromBody] ProjectModel prjct)
        {
            int? result = prjctObject.AddProject(prjct);
            if (prjct.ParticipientsString == null)
            {
                result = prjctObject.AssignOwner(result, prjct.Owner_Id);              
            }
            else
            {
                result = prjctObject.AddParticipants(result, prjct.ParticipientsString, prjct.Name, prjct.Owner_Id);
            }
            return result;
        }

        //získání projektu podle id majitele
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Project/Fetch/{id}")]
        public IEnumerable<ProjectModel> Fetch(int id)
        {
            return prjctObject.GetProjects(id);
        }

        //získání jednoho projektu podle jeho id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Project/FetchByProjectId/{id}")]
        public ProjectModel FetchProject(int id)
        {
            return prjctObject.GetProjectByProjectId(id);
        }


        //Ziskani projektu pomoci id jiného uživatele
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Project/FetchByParticipant/{id}")]
        public IEnumerable<ProjectParticipantsModel> FetchByParticipant(int id)
        {
            return prjctObject.GetProjectsByParticipant(id);
        }

        //Smazání projektu
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Project/Delete/{id}")]
        public int Delete(int id)
        {
            return prjctObject.DeleteProject(id);
        }

    }
}
