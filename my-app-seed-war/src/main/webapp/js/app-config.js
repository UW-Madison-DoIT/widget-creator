define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
           'welcome' : false
        })
        .constant('SERVICE_LOC', {
            'sessionInfo' : 'json/sessionsample.json',
            'welcomeInfo' : 'samples/welcome.json',
            'sidebarInfo' : 'samples/sidebar.json',
            'notificationsURL' : 'samples/notifications.json',
            'groupURL' : null
        })
        .constant('NAMES', {
            'title' : 'MyUW',
            'ariaLabelTitle' : 'My U W',
            'crest' : 'img/uwcrest_web_sm.png',
            'crestalt' : 'UW Crest',
            'sublogo' : 'seed'
        })
        .constant('SEARCH',{
            'isWeb' : false,
            'searchURL' : 'https://my.wisc.edu/web/apps/search/'
        })
        .constant('NOTIFICATION', {
            'enabled' : false,
            'groupFiltering' : false,
            'notificationFullURL' : 'notifications'
        })
        .constant('MISC_URLS',{
            'feedbackURL' : 'https://my.wisc.edu/portal/p/feedback',
            'back2ClassicURL' : null,
            'whatsNewURL' : null
        });

    return config;

});
