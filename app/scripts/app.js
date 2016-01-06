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
    'ui.checkbox'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve:{
          currencies: function(apiservice){
            return apiservice.getCurrenciesList();
          },
          rates: function(apiservice){
            return apiservice.getCurrenciesRates();
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
      .otherwise({
        redirectTo: '/'
      });
  });
