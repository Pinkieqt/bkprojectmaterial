using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrjctManagementSystem.Models;
using System.Collections.Generic;

namespace PrjctManagementSystem.Controllers
{
    public class TaskController : Controller
    {
        TaskDbAccess tskObject = new TaskDbAccess();

        //Přidání úkolů
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Task/Create")]
        public int? Create([FromBody] TaskModel tsk)
        {
            return tskObject.AddTask(tsk);
        }

        //aktualizace ukolu
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Task/Edit")]
        public int? Edit([FromBody]TaskModel tsk)
        {
            return tskObject.UpdateTask(tsk);
        }

        //Aktualizace statusu u ukolu
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Task/EditStatus")]
        public int? EditTaskStatus([FromBody]TaskModel tsk)
        {

            return tskObject.UpdateTaskStatus(tsk.Status, tsk.Id);
        }

        //Archivace ukolu
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Task/Archive/{id}")]
        public int? ArchiveTask(int id)
        {
            return tskObject.ArchiveTask(id);
        }

        //Ziskani ukolu podle id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Task/Fetch/{id}")]
        public IEnumerable<TaskModel> Fetch(int id)
        {
            return tskObject.GetTask(id);
        }

        //ziskani všech ukolu podle id projekut
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Task/FetchAll/{id}")]
        public IEnumerable<TaskModel> FetchAll(int id)
        {
            return tskObject.GetAllTasks(id);
        }

        //ziskani všech archivnich ukolu podle id projekut
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Task/FetchArchivedTask/{id}")]
        public IEnumerable<ArchivedTaskModel> FetchArchivedTask(int id)
        {
            return tskObject.GetArchivedTask(id);
        }
        
        //Deleting task
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Task/Delete/{id}")]
        public int? Delete(int id)
        {
            return tskObject.DeleteTask(id);
        }
    }
}
