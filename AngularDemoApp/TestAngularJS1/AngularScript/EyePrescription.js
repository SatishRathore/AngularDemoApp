EyeRxApp.controller('EyePresController', function ($scope, Common, $window) {
    $scope.EyeDetails = [];
    if ($window.sessionStorage.length > 0) {
        $scope.EyeDetails = angular.fromJson($window.sessionStorage.UserData);
    }

});