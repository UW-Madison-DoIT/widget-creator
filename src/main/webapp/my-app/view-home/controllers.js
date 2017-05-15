'use strict';

define(['angular', 'jquery'], function(angular, $) {
  return angular.module('my-app.view-home.controllers', [])
  // WIDGET CREATOR controller
  .controller('WidgetCreatorController', [
    '$scope', '$route', '$log', 'widgetCreatorService',
    function($scope, $route, $log, widgetCreatorService) {
    var starterTemplates = [];
    /* ---------------- */
    /* Bindable members */
    /* ---------------- */
    $scope.templateOptions = [
      {'value': 'search-with-links', 'name': 'Search with links'},
      {'value': 'list-of-links', 'name': 'List of links'},
      {'value': 'rss', 'name': 'RSS widget'},
      {'value': 'widget-creator', 'name': 'Custom'},
    ];
    $scope.selectedTemplate = {};
    $scope.content = {};
    $scope.preview = undefined;
    $scope.errorJSON = undefined;
    $scope.errorConfigJSON = undefined;

    /* --------------- */
    /* Scope functions */
    /* --------------- */

    // Reload widget preview
    $scope.reload = function() {
      $scope.prepareWidgetDataForDisplay($scope.widget);
    };

    // Clear widget configuration
    $scope.clear = function() {
      if (confirm('Are you sure, all your config will be cleared')) {
        $scope.init();
      }
    };

    // Change to newly-selected template type
    $scope.changeTemplate = function() {
      // Set widget equal to starter template that matches the selected type
      angular.forEach(starterTemplates, function(value, key) {
        if ($scope.selectedTemplate.value == value.entry.layoutObject.type) {
          $scope.widget = $scope.widgetAsEditable(value.entry.layoutObject);
        }
      });
    };

    /* --------------- */
    /* Local functions */
    /* --------------- */

    $scope.wrapLayout = function(preview) {
      var wrapped = {
        'entry': {
          'layoutObject': preview,
        },
      };
      return btoa(angular.toJson(wrapped));
    };

    /**
     * Check if json is valid
     * @param {String} json the json to parse
     * @return {Object|undefined}
     */
    $scope.parseJSON = function parseJSON(json) {
      try {
        return angular.fromJson(json);
      } catch (e) {
        return undefined;
      }
    };

    /**
     * Convert JSON objects to strings so they can be displayed in HTML
     * @param  {Object} editable The object used to store user edits
     */
    $scope.prepareWidgetDataForDisplay = function(editable) {
      var preview = angular.copy(editable);
      var widgetConfig = $scope.parseJSON(editable.widgetConfig);
      var sample = $scope.parseJSON(editable.sample);

      $scope.errorJSON = (!sample) ? 'JSON NOT VALID' : undefined;
      $scope.errorConfigJSON = (!widgetConfig) ? 'JSON NOT VALID' : undefined;

      if (widgetConfig && (!editable.jsonSample || sample)) {
        preview.widgetConfig = widgetConfig;
        $scope.content = sample;
        $scope.preview = $scope.wrapLayout(preview);
      }
    };

    /**
     * Takes a valid widget configuration and creates an user-editable version.
     * @param  {Object} widget widget configuration
     * @return {Object}        user-editable widget config
     */
    $scope.widgetAsEditable = function(widget) {
      var editable = angular.copy(widget);
      $scope.errorConfigJSON = undefined;
      if (!angular.isString(editable.widgetConfig)) {
        editable.widgetConfig = angular.toJson(editable.widgetConfig);
      }
      $scope.errorJSON = undefined;
      if (editable.jsonSample) {
        editable.sample = angular.toJson(editable.jsonSample);
        $scope.content = editable.jsonSample;
      }
      return editable;
    };

    /**
     * Initialize widget creator
     * @return {Promise<Array>} starter templates
     */
    $scope.init = function() {
      return widgetCreatorService.getStarterTemplates()
        .then(function(templates) {
          starterTemplates = templates;
          $log.log('Got starter templates');
          if (templates[0].entry.layoutObject) {
            // Set default widget type
            $scope.widget = $scope.widgetAsEditable(
              templates[0].entry.layoutObject);
            $scope.prepareWidgetDataForDisplay($scope.widget);

            // Set selected template
            angular.forEach($scope.templateOptions, function(value, key) {
              if ($scope.widget.type === value.value) {
                $scope.selectedTemplate = value;
              }
            });
          }
          return templates;
        });
    };

    $scope.init().catch(function(error) {
      $log.warn('WidgetCreatorController couldn\'t get starter templates');
      $log.error(error);
    });
  }]);
});
