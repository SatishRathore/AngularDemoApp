using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TestAngularJS1.Models;

namespace TestAngularJS1.Controllers
{
    public class EyePrescriptionController : Controller
    {
        EyePrescriptionEntities dbcontext = new EyePrescriptionEntities();

        public ActionResult Index()
        {
            //return Redirect("~/AngViews/Index.html");
            return View();
        }

        public JsonResult LeftEyeSpheres()
        {
            var list = dbcontext.LeftEyeSpheres.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LeftEyeCylinders()
        {
            var list = dbcontext.LeftEyeCylinders.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LeftEyeAxis()
        {
            var list = dbcontext.LeftEyeAxis.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LeftEyeAdds()
        {
            var list = dbcontext.LeftEyeAdds.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RightEyeSpheres()
        {
            var list = dbcontext.RightEyeSpheres.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RightEyeCylinders()
        {
            var list = dbcontext.RightEyeCylinders.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RightEyeAxis()
        {
            var list = dbcontext.RightEyeAxis.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RightEyeAdds()
        {
            var list = dbcontext.RightEyeAdds.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ValidateUser(string Password)
        {
            var user = dbcontext.vwUserProfiles
                .Where(a => a.PasswardSent == Password).ToList();
            return Json(user, JsonRequestBehavior.AllowGet);
        }

    }
}
