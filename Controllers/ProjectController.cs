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

        //Adding project
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Project/Create")]
        public int? Create([FromBody] ProjectModel prjct)
        {
            int? result = prjctObject.AddProject(prjct);
            if (result == null || prjct.ParticipientsString == null) return -1;
            else
            {
                prjctObject.AddParticipants(result, prjct.ParticipientsString, prjct.Name);
            }
            return result;
        }

        //Getting projects by owner ID
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Project/Fetch/{id}")]
        public IEnumerable<ProjectModel> Fetch(int id)
        {
            return prjctObject.GetProjects(id);
        }

        //Getting one project info by project ID
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Project/FetchByProjectId/{id}")]
        public ProjectModel FetchProject(int id)
        {
            return prjctObject.GetProjectByProjectId(id);
        }


        //Getting project participants
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Project/FetchByParticipant/{id}")]
        public IEnumerable<ProjectParticipantsModel> FetchByParticipant(int id)
        {
            return prjctObject.GetProjectsByParticipant(id);
        }

        //Deleting project
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Project/Delete/{id}")]
        public int Delete(int id)
        {
            return prjctObject.DeleteProject(id);
        }

    }
}
