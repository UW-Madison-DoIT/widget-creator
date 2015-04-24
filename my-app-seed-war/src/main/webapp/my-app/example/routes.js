define(['require'], function(require){

  return {
    default : {templateUrl: require.toUrl('./partials/my-app.html')},
    second  : {templateUrl: require.toUrl('./partials/my-app-view-2.html')}
  }
});
