using System;

using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace PrjctManagementSystem.Controllers
{
    public class MyEmailClient
    {
        MimeMessage message = new MimeMessage();

        public void SendEmail(string name, string emailaddress, string prjctName){
            message.From.Add(new MailboxAddress("ProjectManagementSystem", "prjct123456@gmail.com"));
            message.To.Add(new MailboxAddress(name, emailaddress));

            message.Subject = "Email test";
            message.Body = new TextPart ("plain") 
            {
			    Text = 
                @"Dobrý den,
            
byl/a jste přidán na seznam spolupracovníků k úkolu " + prjctName + @".

-- Project Management System Team"
			};

            using (var client = new SmtpClient())
            {
                client.ServerCertificateValidationCallback = (s,c,h,e) => true;
                client.Connect("smtp.gmail.com", 587, false);
                client.AuthenticationMechanisms.Remove("XOAUTH2");

                // Note: only needed if the SMTP server requires authentication
                client.Authenticate("prjct123456@gmail.com", "Kolobezka12");

                client.Send(message);
                client.Disconnect(true);
            }

        }

    }
}