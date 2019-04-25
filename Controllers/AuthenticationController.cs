using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PrjctManagementSystem.Models;
using ProjectManagementSystem;
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
        //Ziskani klíče pro podepsání jwt tokenu
        private readonly string SecretKey = Startup.SecretKeyString;
        UserDbAccess userObject = new UserDbAccess();

        //Metoda použitá pro ověření a přihlášení uživatele
        [HttpPost]
        [Route("api/User/Login")]
        public IActionResult Login([FromBody]LoginModel user)
        {
            
            if (user == null)
            {
                return BadRequest("Neplatný parametr.");
            }

            //Ziskání uživatele z databáze
            IEnumerable<User> tmp = userObject.GetUserByLogin(user.Login);

            //Pokud uživatel s daným loginem neexistuje, tak neověřit
            if (tmp.Count() < 1)
            {
                return Unauthorized();
            }

            User tmpUser = tmp.First();

            //Ověření jestli sedí hash z databáze s hashem zadaného hesla
            if (userObject.CheckHash(user.Password, tmpUser.Password))
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));
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


                //Připsání role do JWT tokenu
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Role, temporaryRole)
                };

                var tokenOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5000",
                    audience: "http://localhost:5000",
                    claims: claims,                    
                    expires: DateTime.Now.AddMinutes(15),
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
