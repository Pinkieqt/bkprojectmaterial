using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PrjctManagementSystem.Models;
using System.Collections.Generic;

namespace PrjctManagementSystem.Controllers
{
    public class CommentController : Controller
    {
        CommentDbAccess cmntObject = new CommentDbAccess();

        //Adding comment
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/TaskComment/Create")]
        public int? Create([FromBody] CommentModel cmnt)
        {
            return cmntObject.AddComment(cmnt);
        }

        //Editing comment
        [HttpPut]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/TaskComment/Edit")]
        public int? Edit([FromBody] CommentModel cmnt)
        {
            return cmntObject.UpdateComment(cmnt);
        }
        //Getting all tasks by project Id
        [HttpGet]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/TaskComment/GetAllComments/{id}")]
        public IEnumerable<CommentModel> GetAllComments(int id)
        {
            return cmntObject.GetAllComments(id);
        }

        //Deleting comment
        [HttpDelete]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/TaskComment/Delete/{id}")]
        public int? Delete(int id)
        {
            return cmntObject.DeleteComment(id);
        }
    }
}
