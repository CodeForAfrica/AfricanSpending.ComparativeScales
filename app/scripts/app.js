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
    'ngFileUpload',
    'ui.select',
    'angular-loading-bar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl',
        resolve:{
          currencies: function(apiservice){
            return apiservice.getCurrenciesList();
          },
          rates: function(apiservice){
            return apiservice.getCurrenciesRates();
          },
          editorpicks: function(apiservice){
            return apiservice.getFile('data/editorpicks/data.json');
          }
        }
      })
      .when('/embed', {
        templateUrl: 'views/embed.html',
        controller: 'EmbedCtrl',
        resolve:{
          config : function (apiservice, $location) {
            var params = $location.search();
            return apiservice.getGistFile(params.id, params.version, 'config.json')
          }
        }
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  }]);
