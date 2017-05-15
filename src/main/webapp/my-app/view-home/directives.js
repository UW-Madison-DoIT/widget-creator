'use strict';

define(['angular', 'require'], function(angular, require) {
  return angular.module('my-app.view-home.directives', [])
  .directive('previewWidget', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        fname: '@',
      },
      templateUrl: require.toUrl(
        '../../portal/widgets/partials/widget-card.html'),
      controller: 'WidgetCardController',
      link: function(scope, element, attrs) {
        scope.$watch('fname', function(newValue, oldValue) {
          if (newValue) {
            scope.initializeWidget(newValue);
          }
        });
      },
    };
  });
});
