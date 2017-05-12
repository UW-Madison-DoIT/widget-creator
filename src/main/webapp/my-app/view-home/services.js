'use strict';

define(['angular', 'jquery'], function(angular, $) {

  return angular.module('my-app.view-home.services', [])

    .factory('widgetCreatorService', ['$log', '$localStorage', '$http', 'SERVICE_LOC', function($log, $localStorage, $http, SERVICE_LOC) {

          var getStarterTemplates = function() {
            return $http.get(SERVICE_LOC.templates + '.json')
              .then(function (result) {
                if (result.data.templates != undefined) {
                  return result.data.templates;
                }
              })
              .catch(function (error) {
                $log.warn('Error getting starter templates');
                $log.error(error);
              });
          };

          return {
            getStarterTemplates: getStarterTemplates
          };
        }]);
});
