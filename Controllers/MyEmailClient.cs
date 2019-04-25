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

            //Od koho email pochází - v hlavičce, jinak nahrazeno emailem, který je použitý pro odesílání
            message.From.Add(new MailboxAddress("ProjectManagementSystem", "prjct123456@gmail.com"));

            //Komu email zaslat
            message.To.Add(new MailboxAddress(name, emailaddress));

            //Předmět emailové zprávy
            message.Subject = "Přidání uživatele k projektu";

            //Text emailové zprávy
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

                //Připojení na smtp server
                client.Connect("smtp.gmail.com", 587, false);

                //Potřeba odstranit XOAUTH2 ověření, pokud je použitý účet od gmailu
                client.AuthenticationMechanisms.Remove("XOAUTH2");

                // Ověření uživatele na straně serveru
                client.Authenticate("prjct123456@gmail.com", "Kolobezka12");

                //Odeslání správny
                client.Send(message);

                //Odpojení klienta
                client.Disconnect(true);
            }

        }

    }
}