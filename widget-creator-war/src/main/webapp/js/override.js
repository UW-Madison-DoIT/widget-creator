define(['angular'], function(angular) {

  /*Keep in sync with docs/mardown/configuration.md*/

    var config = angular.module('override', []);
    config
        //see http://uw-madison-doit.github.io/uw-frame/latest/#/md/configuration for howto
        .constant('OVERRIDE', {
          'NAMES': {
            'title': 'Widget Creator',
            'fname': 'widget-creator',
          },
          'SERVICE_LOC': {
            'templates': 'json/starter-templates',
            'widgetApi': {
              // For local testing, change to 'staticFeeds/'
              'entry': 'data:application/json;base64,',
              'entrySuffix': '',
              'entries': '/portal/api/marketplace/entries.json',
            },
          }
        });

    return config;

});
