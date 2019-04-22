using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PrjctManagementSystem.Models;


namespace PrjctManagementSystem.Controllers
{
    public class FtpController : Controller
    {
        //Uploading file
        [HttpPost]
        [Authorize(Roles="admin, editableUser")]
        [Route("api/Ftp/Upload")]
        public void Upload([FromForm] IFormFile x)
        {
            Console.WriteLine(x);
            Console.WriteLine(x.ToString());
        }

    }
    public class Upload
  {
    public IFormFile file { get; set; }
  }
}
