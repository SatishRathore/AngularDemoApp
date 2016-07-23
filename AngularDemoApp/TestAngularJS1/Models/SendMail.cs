using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Net;
using System.Configuration;

namespace TestAngularJS1.Models
{
    public class SendMail
    {

        public static string EmailValidationMail(string Firstname, string LastName, string Email, int UserID)
        {
            string AuthEmail = ConfigurationManager.AppSettings["Email"].ToString();
            string Password = ConfigurationManager.AppSettings["Password"].ToString();
            string Subject = ConfigurationManager.AppSettings["Subject"].ToString();
            string Host = ConfigurationManager.AppSettings["Host"].ToString();

            string EmailContentFile = HttpContext.Current.Server.MapPath("~/AngViews/ValidationEmail.html");
            string Body = System.IO.File.ReadAllText(EmailContentFile);

            Body = Body.Replace("username", Firstname + " " + LastName);

            string randmPwd = RandomString() + DateTime.Now.ToString("ddMMyyyyhhmmss");

            string vallink = "<a href='" + Host + "?id=" + randmPwd + "&instace=" + UserID.ToString() + "'><b>Click to verify</b></a>";
            Body = Body.Replace("verificationlink", vallink);
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress(AuthEmail, "Eye Prescription");
                mail.To.Add(Email);
                mail.Subject = Subject;
                mail.Body = Body;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential(AuthEmail, Password);
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);

            }
            catch (Exception ex)
            {
                randmPwd = "";
            }
            return randmPwd;
        }

        public static void ForgotPwdMail(string Firstname, string LastName, string Email, string Password)
        {
            string AuthEmail = ConfigurationManager.AppSettings["Email"].ToString();
            string AuthPassword = ConfigurationManager.AppSettings["Password"].ToString();
            string Subject = ConfigurationManager.AppSettings["ForgotPwdSubject"].ToString();
            string Host = ConfigurationManager.AppSettings["Host"].ToString();

            string EmailContentFile = HttpContext.Current.Server.MapPath("~/AngViews/ForgotPwdEmail.html");
            string Body = System.IO.File.ReadAllText(EmailContentFile);

            Body = Body.Replace("username", Firstname + " " + LastName);

            Body = Body.Replace("givenpassword", Password);
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress(AuthEmail, "Eye Prescription");
                mail.To.Add(Email);
                mail.Subject = Subject;
                mail.Body = Body;
                mail.IsBodyHtml = true;
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential(AuthEmail, AuthPassword);
                SmtpServer.EnableSsl = true;

                SmtpServer.Send(mail);

            }
            catch (Exception ex)
            {

            }
        }

        public static string RandomString()
        {
            int length = 20;
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}