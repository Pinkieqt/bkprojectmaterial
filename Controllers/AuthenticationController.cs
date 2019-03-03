using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PrjctManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PrjctManagementSystem.Controllers
{
    public class AuthenticationController : Controller
    {
        //private readonly string SecretKey = Startup.SecretKeyString;
        UserDbAccess userObject = new UserDbAccess();

        [HttpPost]
        [Route("api/User/Login")]
        public IActionResult Login([FromBody]LoginModel user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            //Getting user by login from db
            IEnumerable<User> tmp = userObject.GetUserByLogin(user.Login);

            //If user doesn't exists, return unauthorized
            if (tmp.Count() < 1)
            {
                return Unauthorized();
            }

            User tmpUser = tmp.First();

            if (userObject.CheckHash(user.Password, tmpUser.Password))
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("tadytomusimreplacnoutjeste"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                //Default hodnota - nejmenší
                string temporaryRole = "readOnlyUser";
                switch(tmpUser.Role)
                {
                    case 1:
                        temporaryRole = "admin";
                        break;
                    case 2:
                        temporaryRole = "editableUser";
                        break;
                    case 3:
                        temporaryRole = "readOnlyUser";
                        break;
                }

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Role, temporaryRole)
                };

                var tokenOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5000",
                    audience: "http://localhost:5000",
                    claims: claims,                    
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signinCredentials
                );

                
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
