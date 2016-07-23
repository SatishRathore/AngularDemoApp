var EyeRxApp = angular.module('EyeRxApp', ['ui.router']);

EyeRxApp.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$state = $state; // state to be accessed from view
} ]);

EyeRxApp.service('Common', function ($http, $window) {

    this.SetAllInputsDefaultState = function (attributeName) {
        attributeName.$touched = false;
        attributeName.$untouched = true;
        attributeName.$pristine = true;
        attributeName.$dirty = false;
    };

});

 