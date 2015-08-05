'use strict';

/**
 * @ngdoc overview
 * @name comparativescalesApp
 * @description
 * # comparativescalesApp
 *
 * Main module of the application.
 */
angular
  .module('comparativescalesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngFileUpload'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/embed', {
        templateUrl: 'views/embed.html',
        controller: 'EmbedCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
