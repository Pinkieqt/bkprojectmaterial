using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrjctManagementSystem.Models;
using System.Collections.Generic;

namespace PrjctManagementSystem.Controllers
{
    public class CommentController : Controller
    {
        CommentDbAccess cmntObject = new CommentDbAccess();


        /*
        
            Task comment

         */


        //Adding comment
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/TaskComment/Create")]
        public int? Create([FromBody] TaskCommentModel cmnt)
        {
            return cmntObject.AddComment(cmnt);
        }

        //Editing comment
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/TaskComment/Edit")]
        public int? Edit([FromBody] TaskCommentModel cmnt)
        {
            return cmntObject.UpdateComment(cmnt);
        }
        //Getting all tasks by project Id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/TaskComment/GetAllComments/{id}")]
        public IEnumerable<TaskCommentModel> GetAllComments(int id)
        {
            return cmntObject.GetAllComments(id);
        }

        //Getting all tasks by project Id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/TaskComment/GetAllArchivedComments/{id}")]
        public IEnumerable<TaskCommentArchiveModel> GetAllArchivedComments(int id)
        {
            return cmntObject.GetAllArchivedComments(id);
        }

        //Deleting comment
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/TaskComment/Delete/{id}")]
        public int? Delete(int id)
        {
            return cmntObject.DeleteComment(id);
        }

        /*
        
            Task comment

         */


        //Adding comment
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/BugComment/Create")]
        public int? BCreate([FromBody] BugCommentModel cmnt)
        {
            return cmntObject.AddCommentBug(cmnt);
        }

        //Editing comment
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/BugComment/Edit")]
        public int? BEdit([FromBody] BugCommentModel cmnt)
        {
            return cmntObject.UpdateCommentBug(cmnt);
        }
        //Getting all tasks by project Id
        [HttpGet]
        [Authorize(Roles="admin, editableUser, readOnlyUser")]
        [Route("api/BugComment/GetAllComments/{id}")]
        public IEnumerable<BugCommentModel> BGetAllComments(int id)
        {
            return cmntObject.GetAllCommentsBug(id);
        }

        //Deleting comment
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/BugComment/Delete/{id}")]
        public int? BDelete(int id)
        {
            return cmntObject.DeleteCommentBug(id);
        }
    }
}
