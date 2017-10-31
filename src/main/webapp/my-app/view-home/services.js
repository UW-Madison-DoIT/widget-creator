'use strict';

define(['angular'], function(angular) {
  return angular
    .module('my-app.view-home.services', [])
    .factory('widgetCreatorService', [
      '$log',
      '$http',
      'SERVICE_LOC',
      function($log, $http, SERVICE_LOC) {
        var getStarterTemplates = function() {
          return $http
            .get(SERVICE_LOC.templates + '.json')
            .then(function(result) {
              return result.data.templates;
            })
            .catch(function(error) {
              $log.warn('Error getting starter templates');
              $log.error(error);
            });
        };

        return {
          getStarterTemplates: getStarterTemplates,
        };
      },
    ]);
});
