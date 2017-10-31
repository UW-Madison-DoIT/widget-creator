define(['angular'], function(angular) {
  // see https://uw-madison-doit.github.io/uw-frame/configuration.html for howto
  return angular.module('override', []).constant('OVERRIDE', {
    APP_FLAGS: {
      defaultTheme: 'uwMadison',
      showSearch: false,
      isWeb: false,
      loginOnLoad: false,
    },
    NAMES: {
      title: 'Widget Creator',
      fname: 'widget-creator',
    },
    SERVICE_LOC: {
      kvURL: null,
      groupURL: 'staticFeeds/groups.json',
      sessionInfo: 'staticFeeds/guest-session.json',
      shibbolethSessionURL: 'staticFeeds/Shibboleth.sso/Session.json',
      templates: 'json/starter-templates',
      widgetApi: {
        // For local testing, change to 'staticFeeds/'
        entry: 'data:application/json;base64,',
        entrySuffix: '',
        entries: null,
      },
    },
    MISC_URLS: {
      rootURL: 'https://my.wisc.edu',
    },
  });
});
