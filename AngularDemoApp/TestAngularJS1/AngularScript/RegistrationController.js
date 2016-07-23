EyeRxApp.service('RegistrationService', function ($http) {
    var controller = '/UserProfile/';
    this.InsertUser = function (newUser) {
        var req = $http({
            method: "POST",
            url: controller + 'InsertUser',
            params: { 'FirstName': newUser.FirstName, 'LastName': newUser.LastName, 'Email': newUser.Email, 'Password': newUser.Password }
        });
        return req;
    };
});
////-------------------------------------------------------------------------------------------------------------------------------------------------
EyeRxApp.controller('RegistrationController', function ($scope, RegistrationService, Common) {

    $scope.newUser = [];
    $scope.showMainForm = true;
    function InitialiseUser() {
        $scope.newUserConstruct = [{
            ID: 0,
            FirstName: '',
            LastName: '',
            Email: '',
            ReEmail: '',
            Password: '',
            RePassword: '',
            IsValidated: false,
            PasswardSent: ''
        }];
        $scope.newUser = $scope.newUserConstruct[0];
    }


    $scope.reset = function () {
        InitialiseUser();
        ClearValidations();
        $scope.accepted = false;
    };
    function ClearValidations() {
        var form = $scope.RegistrationForm;
        Common.SetAllInputsDefaultState(form.FirstName);
        Common.SetAllInputsDefaultState(form.LastName);
        Common.SetAllInputsDefaultState(form.Email);
        Common.SetAllInputsDefaultState(form.ReEmail);
        Common.SetAllInputsDefaultState(form.Password);
        Common.SetAllInputsDefaultState(form.RePassword);
    }

    $scope.InsertUser = function () {
        var getResp = RegistrationService.InsertUser($scope.newUser);
        getResp.then(function (user) {
            $scope.showMainForm = false;
        }
        , function (error) {
            //alert(error.data);
        });

    };

    $scope.OpenForm = function () {
        $scope.reset();
        $scope.showMainForm = true;
    };
    InitialiseUser();

});

 