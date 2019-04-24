using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrjctManagementSystem.Models;
using System.Collections.Generic;

namespace PrjctManagementSystem.Controllers
{
    public class TaskController : Controller
    {
        TaskDbAccess tskObject = new TaskDbAccess();

        //Adding task
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Task/Create")]
        public int? Create([FromBody] TaskModel tsk)
        {
            return tskObject.AddTask(tsk);
        }

        //Editing task
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Task/Edit")]
        public int? Edit([FromBody]TaskModel tsk)
        {
            return tskObject.UpdateTask(tsk);
        }

        //Editing task status
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Task/EditStatus")]
        public int? EditTaskStatus([FromBody]TaskModel tsk)
        {

            return tskObject.UpdateTaskStatus(tsk.Status, tsk.Id);
        }

        //Archiving task
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Task/Archive/{id}")]
        public int? ArchiveTask(int id)
        {
            return tskObject.ArchiveTask(id);
        }

        //Getting one task by its id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Task/Fetch/{id}")]
        public IEnumerable<TaskModel> Fetch(int id)
        {
            return tskObject.GetTask(id);
        }

        //Getting all tasks by project Id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Task/FetchAll/{id}")]
        public IEnumerable<TaskModel> FetchAll(int id)
        {
            return tskObject.GetAllTasks(id);
        }

        //Getting archived tasks by project Id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Task/FetchArchivedTask/{id}")]
        public IEnumerable<ArchivedTaskModel> FetchArchivedTask(int id)
        {
            return tskObject.GetArchivedTask(id);
        }

        //Getting archived tasks by project Id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/Task/FetchArchived/{id}")]
        public IEnumerable<ArchivedTaskModel> FetchArchived(int id)
        {
            return tskObject.GetArchivedTasks(id);
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
