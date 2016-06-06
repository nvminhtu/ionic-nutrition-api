// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngResource','draw.controllers','draw.services'])
.value('nutritionixConst', {
  'appId' :'347c016b',
  'appKey' : '820b8a35d443d584fe51db5eb49d7b25'
})
/**
* sample using collection repeat and data is provided using $htp and $resource
*
* additional documentation on collection-repeat
* - http://ionicframework.com/docs/api/directive/collectionRepeat/
*/
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller : 'HomeCtrl'
  })

  .state('detail', {
    url: "/detail/:index",
    templateUrl: "templates/detail.html",
    controller: "DetailCtrl"
  });

  $urlRouterProvider.otherwise("/");
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
    StatusBar.styleDefault();
  }
});
});
