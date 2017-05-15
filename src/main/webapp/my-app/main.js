define([
    'angular',
    'require',
    './view-home/routes', // add all the paths to your routes here
    'portal/settings/routes', // example pulling in portal module routes
    'portal/about/route', // Nice about page for your application
    'portal/main/routes',
    'portal',
    'app-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    './view-home/controllers', // add all your paths to your other js files here
    './view-home/directives',
    './view-home/services',
  ], function(
    angular,
    require,
    homeRoutes,
    settingsRoutes,
    aboutRoute,
    mainRoutes
  ) { // notice each route file is now an object
    return angular.module('my-app', [
        'app-config',
        'my-app.view-home.controllers', // add in your modules here
        'my-app.view-home.directives',
        'my-app.view-home.services',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'portal',
    ])
    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        // IMPORTANT: Keep theses paths in sync with web.xml for html5mode
        $routeProvider
          .when('/home', homeRoutes.home)
          .when('/settings', settingsRoutes.betaSettings)
          .when('/user-settings', settingsRoutes.userSettings)
          .when('/about', aboutRoute)
          .when('/access-denied', mainRoutes.accessDenied)
          .otherwise({'redirectTo': '/home'});
    }]);
});
