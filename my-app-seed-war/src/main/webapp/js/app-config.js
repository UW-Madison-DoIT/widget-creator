define(['angular'], function(angular) {
angular.module('app-config', [])
    .constant('SERVICE_LOC', {
       'sessionInfo' : 'json/sessionsample.json',
       'sidebarInfo' : 'samples/sidebar.json'
    })
    .constant('NAMES', {
       'title' : 'MyUW',
       'crest' : 'img/uwcrest_web_sm.png',
       'crestalt' : 'UW Crest'
    });

});
