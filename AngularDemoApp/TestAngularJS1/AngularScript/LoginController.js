EyeRxApp.service('LoginService', function ($http) {
    var controller = '/UserProfile/';
    this.LoginUser = function (User) {
        var req = $http({
            method: "POST",
            url: controller + 'LoginUser',
            params: { 'Email': User.Email, 'Password': User.Password }
        });
        return req;
    };

    this.SendPwd = function (Email) {
        var req = $http({
            method: "POST",
            url: controller + 'SendPwd',
            params: { 'Email': Email }
        });
        return req;
    };

    this.ValidateUser = function (Pwd, ID) {
        var req = $http({
            method: "POST",
            url: controller + 'ValidateUser',
            params: { 'Password': Pwd, 'ID': ID }
        });
        return req;
    };
});
////-------------------------------------------------------------------------------------------------------------------------------------------------


EyeRxApp.controller('LoginController', function ($scope, LoginService, Common, $window) {

    $scope.showMainForm = true;
    $scope.showerror = false;
    $scope.errorno = 0;
    $scope.ShowAlert = 0;
    $scope.User = [];
    function InitialiseUser() {
        $scope.newUserConstruct = [{
            Email: '',
            Password: ''
        }];
        $scope.User = $scope.newUserConstruct[0];
    }
    $scope.reset = function () {
        InitialiseUser();
        $scope.showerror = false;
        ClearValidations();
    };

    $scope.Login = function () {
        var getResp = LoginService.LoginUser($scope.User);
        getResp.then(function (resp) {
            if (resp.data.indexOf('does not') > -1) {
                $scope.showerror = true;
                $scope.errorno = 1;
            }
            else if (resp.data.indexOf('user invalid') > -1) {
                $scope.showerror = true;
                $scope.errorno = 2;
            }
            else {
                var Url = String($window.location).replace('Login', 'index');
                $window.location = Url + '?id=' + resp.data;
            }
        }, function (error) {
            //alert(error.data);
        });
    };

    function ClearValidations() {
        var form = $scope.LoginForm;
        Common.SetAllInputsDefaultState(form.Email);
        Common.SetAllInputsDefaultState(form.Password);
        Common.SetAllInputsDefaultState($scope.ForgotPwdForm.Email);
    }
    InitialiseUser();

    $scope.OpenMainForm = function () {
        $scope.showMainForm = true;
        DefaultState();
    }
    $scope.HideMainForm = function () {
        $scope.showMainForm = false;
        DefaultState();
    }
    function DefaultState() {
        $scope.Email = '';
        ClearValidations();
        $scope.errorno = 0;
        $scope.ShowAlert = 0;
    }

    $scope.SendPassword = function () {
        var getPwd = LoginService.SendPwd($scope.Email);
        getPwd.then(function (pwd) {
            if (pwd.data.indexOf('invalid') > -1) {
                $scope.ShowAlert = 1;
            }
            else {
                $scope.ShowAlert = 2;
            }
            $scope.Email = '';
            ClearValidations();
        }, function (error) {
            // alert(error.data);
        });
    }

    $scope.ValidateUser = function () {
        var Query = String($window.location).split('?');
        if (Query.length > 1) {
            var queryname = String(Query[1]).split('&');
            var queryvalue = [];
            angular.forEach(queryname, function (obj, key) {
                var t = String(obj).split('=');
                queryvalue.push(t[1]);
            });

            var valuser = LoginService.ValidateUser(queryvalue[0], queryvalue[1]);
            valuser.then(function (val) {
                if (val.data.indexOf('success') > -1) {
                    var Query = String($window.location).split('?');
                    $window.location = Query[0];
                }
            }, function (error) {
                //alert(error.data);
            });
        }
    }
    $scope.ValidateUser();
});
