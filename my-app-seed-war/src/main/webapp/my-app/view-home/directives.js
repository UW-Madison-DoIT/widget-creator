'use strict';

define(['angular', 'require'], function(angular, require) {
  var app = angular.module('my-app.view-home.directives', []);

  /**
   * Example directive to show relative path with require.toUrl
   *
   */
  app.directive('subviewDirective', function(){
      return {
          restrict : 'E',
          templateUrl : require.toUrl('./partials/subview-directive.html')
      }
  });
});
