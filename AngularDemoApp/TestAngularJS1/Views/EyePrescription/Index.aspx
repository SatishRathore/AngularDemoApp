<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html >
<html data-ng-app="EyeRxApp">
<head id="Head1" runat="server">
    <title data-ng-bind="'Eye Priscription | ' + $state.current.data.pageTitle"></title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="X-UA-Compatiable" content="IE=edge,chrome=1">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all"
        rel="stylesheet" type="text/css" />
    <link href="../../Content/bootstrap-3.3.5-dist/css/bootstrap.min.css" rel="stylesheet"
        type="text/css" />
    <link href="../../Content/jquery-ui-1.11.4/jquery-ui.min.css" rel="stylesheet" type="text/css" />
    <!--<link href="../../Content/Site.css" rel="stylesheet" type="text/css" />-->
    <script src="../../Scripts/Jqueryv1.11.3.js" type="text/javascript"></script>
    <script src="../../Content/jquery-ui-1.11.4/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Angular.js" type="text/javascript"></script>
    <script src="../../Scripts/angular-route.js" type="text/javascript"></script>
    <script src="../../Scripts/angular-routeParams.js" type="text/javascript"></script>
    <script src="../../Scripts/ui-router.js" type="text/javascript"></script>
    <script src="../../AngularScript/app.js" type="text/javascript"></script>
    <script src="../../AngularScript/RegistrationController.js" type="text/javascript"></script>
    <script src="../../AngularScript/LoginController.js" type="text/javascript"></script>
</head>
<body>
    <div class="page" ng-controller="MainController">
        <div id="header">
            <div id="title">
                <h1>
                    Eye Priscription</h1>
            </div>
            <div id="logindisplay">
            </div>
            <div id="menucontainer">
                <ul id="menu">
                    <li><a href="../../AngViews/RegistrationForm.html" ui-sref="#/RegistrationForm.html">Sign Up</a></li>
                    <li><a href="../../AngViews/Login.html" ui-sref="#/Login.html">Sign In</a></li>
                </ul>
            </div>
        </div>
        <div ui-view ng-view>
        </div>
    </div>
</body>
</html>
