EyeRxApp.service('MainService', function ($http) {
    var controller = '/EyePrescription/';
    this.LeftEyeSphere = function () {
        var req = $http({
            method: "GET",
            url: controller + 'LeftEyeSpheres'
        });
        return req;
    };

    this.LeftEyeCylinder = function () {
        var req = $http({
            method: "GET",
            url: controller + 'LeftEyeCylinders'
        });
        return req;
    };
    this.LeftEyeAxis = function () {
        var req = $http({
            method: "GET",
            url: controller + 'LeftEyeAxis'
        });
        return req;
    };
    this.LeftEyeAdd = function () {
        var req = $http({
            method: "GET",
            url: controller + 'LeftEyeAdds'
        });
        return req;
    };


    this.RightEyeSphere = function () {
        var req = $http({
            method: "GET",
            url: controller + 'RightEyeSpheres'
        });
        return req;
    };

    this.RightEyeCylinder = function () {
        var req = $http({
            method: "GET",
            url: controller + 'RightEyeCylinders'
        });
        return req;
    };
    this.RightEyeAxis = function () {
        var req = $http({
            method: "GET",
            url: controller + 'RightEyeAxis'
        });
        return req;
    };
    this.RightEyeAdd = function () {
        var req = $http({
            method: "GET",
            url: controller + 'RightEyeAdds'
        });
        return req;
    };


    this.ValidateUser = function (pwd) {
        var req = $http({
            method: "GET",
            url: controller + 'ValidateUser',
            params: { 'Password': pwd }
        });
        return req;
    };
});
////-------------------------------------------------------------------------------------------------------------------------------------------------
EyeRxApp.controller('MainController', function ($scope, MainService, Common, $window, $filter) {

    $scope.LeftEyeSphere = [];
    $scope.LeftEyeCylinder = [];
    $scope.LeftEyeAxis = [];
    $scope.LeftEyeAdd = [];

    $scope.RightEyeSphere = [];
    $scope.RightEyeCylinder = [];
    $scope.RightEyeAxis = [];
    $scope.RightEyeAdd = [];

    $scope.EyeRx = [];

    IntialiseEyeRx();
    function IntialiseEyeRx() {
        $scope.EyeRxConstruct = [
        {
            EyeAdd: '1',
            EyeAddVal: '',
            RightShpere: '0',
            RightShpereVal: '',
            RightCylinder: '0',
            RightCylinderVal: '',
            RightAxis: '0',
            RightAxisVal: '',
            LeftShpere: '0',
            LeftShpereVal: '',
            LeftCylinder: '0',
            LeftCylinderVal: '',
            LeftAxis: '0',
            LeftAxisVal: ''
        }];
        $scope.EyeRx = $scope.EyeRxConstruct[0];
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

            var valuser = MainService.ValidateUser(queryvalue[0]);
            valuser.then(function (val) {
                if (val.data.length > 0) {
                    $scope.ValidUser = true;
                }
            }, function (error) {
                $scope.ValidUser = false;
                //alert(error.data);
            });
        }
        else {
            $scope.ValidUser = false;
        }
    };


    $scope.LeftEyeSpheres = function () {
        var getShp = MainService.LeftEyeSphere();
        getShp.then(function (shpere) {
            $scope.LeftEyeSphere = angular.fromJson(shpere.data);
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.LeftEyeCylinder = function () {
        var getShp = MainService.LeftEyeCylinder();
        getShp.then(function (cyn) {
            $scope.LeftEyeCylinder = angular.fromJson(cyn.data);
        }, function (error) {
            alert(error.data);
        });
    };
    $scope.LeftEyeAxis = function () {
        var getShp = MainService.LeftEyeAxis();
        getShp.then(function (axis) {
            $scope.LeftEyeAxis = angular.fromJson(axis.data);
        }, function (error) {
            alert(error.data);
        });
    };
    $scope.LeftEyeAdd = function () {
        var getShp = MainService.LeftEyeAdd();
        getShp.then(function (add) {
            $scope.LeftEyeAdd = angular.fromJson(add.data);
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.RightEyeSphere = function () {
        var getShp = MainService.RightEyeSphere();
        getShp.then(function (shpere) {
            $scope.RightEyeSphere = angular.fromJson(shpere.data);
        }, function (error) {
            alert(error.data);
        });
    };

    $scope.RightEyeCylinder = function () {
        var getShp = MainService.RightEyeCylinder();
        getShp.then(function (cyn) {
            $scope.RightEyeCylinder = angular.fromJson(cyn.data);
        }, function (error) {
            alert(error.data);
        });
    };
    $scope.RightEyeAxis = function () {
        var getShp = MainService.RightEyeAxis();
        getShp.then(function (axis) {
            $scope.RightEyeAxis = angular.fromJson(axis.data);
        }, function (error) {
            //alert(error.data);
        });
    };
    $scope.RightEyeAdd = function () {
        var getShp = MainService.RightEyeAdd();
        getShp.then(function (add) {
            $scope.RightEyeAdd = angular.fromJson(add.data);
        }, function (error) {
            //alert(error.data);
        });
    };

    $scope.ValidateUser();
    $scope.RightEyeAdd();
    $scope.LeftEyeAdd();

    $scope.RightEyeSphere();
    $scope.RightEyeCylinder();
    $scope.RightEyeAxis();


    $scope.LeftEyeSpheres();
    $scope.LeftEyeCylinder();
    $scope.LeftEyeAxis();



    $scope.OpenAnalysis = function () {
        $window.sessionStorage.UserData = null;
        $scope.EyeRx.EyeAddVal = $filter('filter')($scope.RightEyeAdd, { ID: $scope.EyeRx.EyeAdd })[0].Description;
        $scope.EyeRx.RightShpereVal = $filter('filter')($scope.RightEyeSphere, { ID: $scope.EyeRx.RightShpere })[0].Description;
        $scope.EyeRx.RightCylinderVal = $filter('filter')($scope.RightEyeCylinder, { ID: $scope.EyeRx.RightCylinder })[0].Description;
        $scope.EyeRx.RightAxisVal = $filter('filter')($scope.RightEyeAxis, { ID: $scope.EyeRx.RightAxis })[0].Description;

        $scope.EyeRx.LeftShpereVal = $filter('filter')($scope.LeftEyeSphere, { ID: $scope.EyeRx.LeftShpere })[0].Description;
        $scope.EyeRx.LeftCylinderVal = $filter('filter')($scope.LeftEyeCylinder, { ID: $scope.EyeRx.LeftCylinder })[0].Description;
        $scope.EyeRx.LeftAxisVal = $filter('filter')($scope.LeftEyeAxis, { ID: $scope.EyeRx.LeftAxis })[0].Description;
        $window.sessionStorage.UserData = angular.toJson($scope.EyeRx);
        var Url = String($window.location).replace('index', 'EyePrescription');
        $window.location = Url;
    }

});