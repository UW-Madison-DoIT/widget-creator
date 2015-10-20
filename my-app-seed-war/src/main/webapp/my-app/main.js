define([
    'angular',
    'require',
    './example/routes', //add all the paths to your routes here
    'portal/settings/route', // example pulling in portal module routes
    'portal/about/route', // Nice about page for your application
    'portal',
    'app-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    './example/controllers', //add all your paths to your other js files here
    './example/directives',
], function(angular, require, exampleRoutes, settingsRoute, aboutRoute) { //notice each route file is now an object

    var app = angular.module('my-app', [
        'app-config',
        'my-app.example.controllers', // add in your modules here
        'my-app.example.directives',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'portal'
    ]);

    // TODO: Think of a more extensible approach such that frame and app can each manage their own routing without conflict
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.
            when('/default', exampleRoutes.default). //use your route object to get the templateurl
            when('/view2', exampleRoutes.second).
            when('/settings', settingsRoute).
            when('/about', aboutRoute).
            otherwise({ redirectTo : '/default'});

            //keep theses paths in sync with web.xml for html5mode
    }]);


    return app;

});
