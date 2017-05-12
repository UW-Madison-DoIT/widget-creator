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
    $scope.errorJSON = undefined;
    $scope.errorConfigJSON = undefined;

    /*-----------------*/
    /* Scope functions */
    /*-----------------*/

    // Reload widget preview
    $scope.reload = function () {
      prepareWidgetDataForDisplay($scope.widget);
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
          $scope.widget = widgetAsEditable(value.entry.layoutObject);
        }
      });

    };

    var wrapLayout = function(preview) {
      var wrapped = {
        'entry': {
          'layoutObject': preview
        }
      };
      return btoa(JSON.stringify(wrapped));
    }

    /*-----------------*/
    /* Local functions */
    /*-----------------*/

    /**
     * Check if json is valid
     * @param json
     * @returns {boolean}
     */
    var parseJSON = function parseJSON(json) {
      try {
        return JSON.parse(json);
      } catch (e) {
        return undefined;
      }
    };

    /**
     * Convert JSON objects to strings so they can be displayed in HTML
     */
    var prepareWidgetDataForDisplay = function(editable) {
      var preview = angular.copy(editable);
      var widgetConfig = parseJSON(editable.widgetConfig);
      var sample = parseJSON(editable.sample);

      $scope.errorJSON = (!sample) ? 'JSON NOT VALID' : undefined;
      $scope.errorConfigJSON = (!widgetConfig) ? 'JSON NOT VALID' : undefined;

      if (widgetConfig && (!editable.jsonSample || sample)) {
        preview.widgetConfig = widgetConfig;
        $scope.content = sample
        $scope.preview = wrapLayout(preview);
      }
    };

    var widgetAsEditable = function(widget) {
      var editable = angular.copy(widget);
      $scope.errorConfigJSON = undefined;
      if (!angular.isString(editable.widgetConfig)) {
        editable.widgetConfig = JSON.stringify(editable.widgetConfig);
      }
      $scope.errorJSON = undefined;
      if (editable.jsonSample) {
        editable.sample = JSON.stringify(editable.jsonSample);
        $scope.content = editable.jsonSample;
      }
      return editable;
    }

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
            $scope.widget = widgetAsEditable(templates[0].entry.layoutObject);
            prepareWidgetDataForDisplay($scope.widget);

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
