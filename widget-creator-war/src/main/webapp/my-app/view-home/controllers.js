'use strict';

define(['angular', 'jquery'], function (angular, $) {

  var app = angular.module('my-app.view-home.controllers', []);

  // WIDGET CREATOR controller
  app.controller('WidgetCreatorController', ['$scope', '$route', '$localStorage', '$log', 'widgetCreatorService', function ($scope, $route, $localStorage, $log, widgetCreatorService) {

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
    $scope.storage = {};
    $scope.storage.isInitialized = false;

    /*-----------------*/
    /* Scope functions */
    /*-----------------*/

    // Reload widget preview
    $scope.reload = function () {
      updateStorage();
      $route.reload();
    };

    // Clear widget configuration
    $scope.clear = function () {
      if (confirm('Are you sure, all your config will be cleared')) {
        $localStorage.$reset();
        init();
        $route.reload();
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

      updateStorage();

      $scope.reload();
    };

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
      // Cast widget objects as string for display
      $scope.widget.widgetConfig = JSON.stringify($scope.widget.widgetConfig);
      if ($scope.widget.jsonSample) {
        $scope.content = JSON.stringify($scope.widget.jsonSample)
      }
    };

    /**
     * Update local storage with current scope content
     */
    var updateStorage = function() {
      $scope.storage.selectedTemplate = $scope.selectedTemplate;
      $scope.storage.widget = $scope.widget;
      $scope.storage.widgetConfig = $scope.widget.widgetConfig;
      $scope.storage.content = $scope.content;
      $scope.storage.isInitialized = true;
    };

    /**
     * Get starter templates and setup scope variables
     */
    var setupDefaults = function() {
      widgetCreatorService.getStarterTemplates()
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
        .catch(function(error) {
          $log.warn('WidgetCreatorController couldn\'t get starter templates');
          $log.error(error);
        })
    };

    /**
     * Setup scope variables based on content of local storage
     */
    var setupDefaultsFromStorage = function() {
      $scope.widget = $scope.storage.widget;
      $scope.selectedTemplate = $scope.storage.selectedTemplate;

      // If a user has entered values into custom widget type fields, make sure it's valid and display correctly
      if ($scope.storage.widgetConfig && isValidJSON($scope.storage.widgetConfig)) {
        // Parse widgetConfig as JSON
        $scope.widget.widgetConfig = JSON.parse($scope.storage.widgetConfig);
      } else {
        $scope.errorConfigJSON = $scope.storage.widgetConfig ? 'JSON NOT VALID' : '';
      }

      if ($scope.storage.content && isValidJSON($scope.storage.content)) {
        $scope.content = $scope.storage.content;
      } else {
        console.log($scope.storage.content);
        $scope.errorJSON = $scope.storage.content ? 'JSON NOT VALID' : '';
      }

      prepareWidgetDataForDisplay();
      $scope.storage.isInitialized = true;
    };

    /**
     * Initialize widget creator
     */
    var init = function() {
      // Setup variable in local storage
      $localStorage.widgetCreator = $localStorage.widgetCreator || {};

      // Makes the widget creator stuff contained
      $scope.storage = $localStorage.widgetCreator;

      if ($scope.storage.isInitialized) {
        // Get defaults from storage
        setupDefaultsFromStorage();
      } else {
        setupDefaults();
      }
    };

    init();
  }]);

});
