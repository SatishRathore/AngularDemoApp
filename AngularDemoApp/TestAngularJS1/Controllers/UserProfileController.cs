using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestAngularJS1.Models;

namespace TestAngularJS1.Controllers
{
    public class UserProfileController : Controller
    {
        EyePrescriptionEntities dbcontext = new EyePrescriptionEntities();
        UserProfile usr = new UserProfile();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string InsertUser(string FirstName, string LastName, string Email, string Password)
        {
            string msg = "";
            try
            {
                usr.FirstName = FirstName;
                usr.LastName = LastName;
                usr.Email = Email;
                usr.Password = Password;
                usr.IsValidated = false;
                usr.AddedDate = DateTime.Now;
                dbcontext.UserProfiles.AddObject(usr);
                dbcontext.SaveChanges();
                int maxID = dbcontext.UserProfiles.Max(d => d.ID);
                string randmPwd = SendMail.EmailValidationMail(FirstName, LastName, Email, maxID);
                var user = dbcontext.UserProfiles.Where(a => a.ID == maxID);
                foreach (UserProfile u in user)
                {
                    u.PasswardSent = randmPwd;
                }
                dbcontext.SaveChanges();
            }

            catch (Exception ex)
            {

            }
            return msg;
        }

        [HttpPost]
        public JsonResult LoginUser(string Email, string Password)
        {
            string msg = "";
            try
            {
                var user = dbcontext.vwUserProfiles
                     .Where(a => a.Email == Email && a.Password == Password)
                     .ToList();
                if (user.Count == 0)
                {
                    msg = "User does not exist";
                }
                else
                {
                    var vailduser = user.Where(a => a.IsValidated == true)
                                                                          .ToList();
                    if (vailduser.Count == 0)
                    {
                        msg = "user invalid";
                    }
                    else
                    {
                        foreach (vwUserProfile u in vailduser)
                        {
                            msg = u.PasswardSent;
                        }
                    }

                }
            }
            catch (Exception ex)
            {

            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ValidateUser(string Password, int ID)
        {
            string msg = "failed";
            var user = dbcontext.UserProfiles.Where(a => a.ID == ID && a.PasswardSent == Password).ToList();
            if (user.Count > 0)
            {
                foreach (UserProfile u in user)
                {
                    u.IsValidated = true;
                }
                dbcontext.SaveChanges();
                msg = "success";
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SendPwd(string Email)
        {
            string sent = "invalid";
            var user = dbcontext.vwUserProfiles.Where(a => a.Email == Email).ToList();
            if (user.Count > 0)
            {
                string fn = "", ln = "", email = "", pwd = "";
                foreach (vwUserProfile u in user)
                {
                    fn = u.FirstName;
                    ln = u.LastName;
                    email = u.Email;
                    pwd = u.Password;
                }
                SendMail.ForgotPwdMail(fn, ln, email, pwd);
                sent = "success";
            }
            return Json(sent, JsonRequestBehavior.AllowGet);
        }
    }
}
