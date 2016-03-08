define(['angular'], function(angular) {

  /*Keep in sync with docs/mardown/configuration.md*/

    var config = angular.module('override', []);
    config
        //see configuration.md for howto
        .constant('OVERRIDE', {
          'NAMES' : {
            'title' : 'My App Seed Name',
            'fname' : 'app-seed-fname'
          },
          'APP_BETA_FEATURES' : [
            {
              "id" : "someAdditionalBetaFeature",
              "title" : "App Seed Beta Feature",
              "description" : "This is just an example of a toggle. Look at your localStorage after you switch this on for the first time."
            }
          ]
        })

    return config;

});
