define([
    'angular',
    'require',
    './view-home/routes', //add all the paths to your routes here
    'portal/settings/routes', // example pulling in portal module routes
    'portal/about/route', // Nice about page for your application
    'portal/main/routes',
    'portal',
    'app-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    './view-home/controllers', //add all your paths to your other js files here
    './view-home/directives'
], function(angular, require, homeRoutes, settingsRoutes, aboutRoute, mainRoutes) { //notice each route file is now an object

    var app = angular.module('my-app', [
        'app-config',
        'my-app.view-home.controllers', // add in your modules here
        'my-app.view-home.directives',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'portal'
    ]);

    // TODO: Think of a more extensible approach such that frame and app can each manage their own routing without conflict
    app.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider) {
        $locationProvider.html5Mode(true);
		// IMPORTANT: Keep theses paths in sync with web.xml for html5mode
        $routeProvider.
            when('/home', homeRoutes.home). //use your route object to get the templateurl
            when('/settings', settingsRoutes.betaSettings).
            when('/user-settings', settingsRoutes.userSettings).
            when('/about', aboutRoute).
            when('/access-denied', mainRoutes.accessDenied).
            otherwise({ redirectTo : '/home'});

		/*
			ANGULAR-MATERIAL THEME DEFINITION
			See: https://material.angularjs.org/latest/Theming/03_configuring_a_theme
		*/
		// Primary palette is based on the 2016 UW red color (#c5050c)
		$mdThemingProvider.definePalette('uwPrimary', {
			'50': 'FED5D7',
			'100': 'FC8B8F',
			'200': 'FB545A',
			'300': 'F90E17',
			'400': 'E3060E',
			'500': 'C5050C',
			'600': 'A7040A',
			'700': '890308',
			'800': '6B0307',
			'900': '4E0205',
			'A100': 'FED5D7',
			'A200': 'FC8B8F',
			'A400': 'E3060E',
			'A700': '890308',
			'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
												// on this palette should be dark or light
			'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
				'200', '300', '400', 'A100'],
			'contrastLightColors': undefined    // could also specify this if default was 'dark'
		});

		// Warning palette is based on a generic orange color (#E28332)
		$mdThemingProvider.definePalette('uwWarn', {
			'50': 'FFFFFF',
			'100': 'F9E7D7',
			'200': 'F2C9A6',
			'300': 'EAA368',
			'400': 'E6934D',
			'500': 'E28332',
			'600': 'D7731E',
			'700': 'BC651B',
			'800': 'A15717',
			'900': '874813',
			'A100': 'FFFFFF',
			'A200': 'F9E7D7',
			'A400': 'E6934D',
			'A700': 'BC651B',
			'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
												// on this palette should be dark or light
			'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
				'200', '300', '400', 'A100'],
			'contrastLightColors': undefined    // could also specify this if default was 'dark'
		});

		// Accent palette is based on the blue accent color from www.wisc.edu (#0479a8)
		$mdThemingProvider.definePalette('uwAccent', {
			'50': 'B8E9FD',
			'100': '6DD3FC',
			'200': '36C2FA',
			'300': '05A4E4',
			'400': '058FC6',
			'500': '0479A8',
			'600': '03638A',
			'700': '034E6C',
			'800': '02384E',
			'900': '012330',
			'A100': 'B8E9FD',
			'A200': '0479A8',
			'A400': '058FC6',
			'A700': '034E6C',
			'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
												// on this palette should be dark or light
			'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
				'200', '300', '400', 'A100'],
			'contrastLightColors': undefined    // could also specify this if default was 'dark'
		});

		// Set themes
		$mdThemingProvider.theme('default')
			.primaryPalette('uwPrimary')
			.warnPalette('uwWarn')
			.accentPalette('uwAccent');
    }]);


    return app;

});
