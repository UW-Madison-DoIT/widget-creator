'use strict';

define(['angular', 'jquery'], function (angular, $) {

  var app = angular.module('my-app.view-home.controllers', []);

  // WIDGET CREATOR controller
  app.controller('WidgetCreatorController', ['$scope', '$route', '$log', 'widgetCreatorService', function ($scope, $route, $log, widgetCreatorService) {

    var starterTemplates = [];
    /*------------------*/
    /* Bindable members */
    /*------------------*/
    $scope.templateOptions = [
      { "value": "search-with-links", "name": "Search with links" },
      { "value": "list-of-links", "name": "List of links" },
      { "value": "rss", "name": "RSS widget" },
      { "value": "widget-creator", "name": "Custom" }
    ];
    $scope.selectedTemplate = {};
    $scope.content = {};
    $scope.preview = undefined;

    /*-----------------*/
    /* Scope functions */
    /*-----------------*/

    // Reload widget preview
    $scope.reload = function () {
      prepareWidgetDataForDisplay();
    };

    // Clear widget configuration
    $scope.clear = function () {
      if (confirm('Are you sure, all your config will be cleared')) {
        init();
      }
    };

    // Change to newly-selected template type
    $scope.changeTemplate = function() {
      // Set widget equal to starter template that matches the selected type
      angular.forEach(starterTemplates, function(value, key) {
        if ($scope.selectedTemplate.value == value.entry.layoutObject.type) {
          $scope.widget = value.entry.layoutObject;
        }
      });

    };

    var wrapLayout = function(preview) {
      var wrapped = {
        'entry': {
          'layoutObject': preview
        }
      };
      return JSON.stringify(wrapped);
    }

    /*-----------------*/
    /* Local functions */
    /*-----------------*/

    /**
     * Check if json is valid
     * @param json
     * @returns {boolean}
     */
    var isValidJSON = function isValidJson(json) {
      try {
        JSON.parse(json);
        return true;
      } catch (e) {
        return false;
      }
    };

    /**
     * Convert JSON objects to strings so they can be displayed in HTML
     */
    var prepareWidgetDataForDisplay = function() {
      var preview = angular.copy($scope.widget);
      if (!angular.isString($scope.widget.widgetConfig)) {
        $scope.widget.widgetConfig = JSON.stringify($scope.widget.widgetConfig);
      }
      preview.widgetConfig = JSON.parse($scope.widget.widgetConfig);
      if (preview.jsonSample) {
        $scope.content = JSON.stringify($scope.widget.jsonSample)
      }
      $scope.preview = wrapLayout(preview);
    };

    /**
     * Initialize widget creator
     */
    var init = function() {
      return widgetCreatorService.getStarterTemplates()
        .then(function(templates) {
          starterTemplates = templates;
          $log.log('Got starter templates');
          if (templates[0].entry.layoutObject) {

            // Set default widget type
            $scope.widget = templates[0].entry.layoutObject;
            prepareWidgetDataForDisplay();

            // Set selected template
            angular.forEach($scope.templateOptions, function(value, key) {
              if ($scope.widget.type === value.value) {
                $scope.selectedTemplate = value;
              }
            });

          }
        })
    };

    init().catch(function(error) {
      $log.warn('WidgetCreatorController couldn\'t get starter templates');
      $log.error(error);
    });
  }]);

});
