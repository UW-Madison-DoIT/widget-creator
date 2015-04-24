'use strict';

define(['angular', 'require'], function(angular, require) {
  var app = angular.module('my-app.example.directives', []);

  /**
   * Example directive to show relative path with require.toUrl
   *
   */
  app.directive('exampleDir', function(){
      return {
          restrict : 'E',
          templateUrl : require.toUrl('./partials/example.html')
      }
  });
});
