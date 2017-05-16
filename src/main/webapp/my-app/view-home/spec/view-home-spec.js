'use strict';
/* eslint-env node */
/* global inject readJSON */
define(['angular-mocks', 'my-app'], function() {
    describe('WidgetCreatorController', function() {
        var scope;
        var deferred;
        var service;
        var templateURL;
        var templates;

        beforeEach(function() {
          module('my-app');
        });

        beforeEach(inject(function(
          _$controller_, _$q_, _$rootScope_, _$templateCache_,
          _widgetCreatorService_, _SERVICE_LOC_) {
          scope = _$rootScope_.$new();
          templateURL = _SERVICE_LOC_.templates + '.json';
          templates = readJSON(templateURL).templates;
          spyOn(_$templateCache_, 'get').and.callFake(function(path) {
            return '<div></div>';
          });
          service = _widgetCreatorService_;
          deferred = _$q_.defer();
          spyOn(service, 'getStarterTemplates')
          .and.returnValue(deferred.promise);
          _$controller_('WidgetCreatorController', {
            '$scope': scope,
            'widgetCreatorService': service,
          });
          deferred.resolve(templates);
          scope.$apply();
        }));

        it('should set selectedTemplate in scope', function() {
          expect(scope.selectedTemplate).toBeTruthy();
          expect(scope.selectedTemplate).not.toEqual({});
        });

        it('should set the preview widget configuration', function() {
          expect(scope.preview).toBeTruthy();
        });
    });
});
