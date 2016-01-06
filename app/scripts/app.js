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
          }
        }
      })
      .when('/embed', {
        templateUrl: 'views/embed.html',
        controller: 'EmbedCtrl',
        resolve:{
          // gist : function (apiservice, $location) {
          //   var params = $location.search();
          //   console.log(params.id)
          //   return apiservice.getGist(params.id)
          // },
          config : function (apiservice, $location) {
            var params = $location.search();
            return apiservice.getGistFile(params.id, params.version, 'config.json')
          }
          // svgIcon : function (apiservice, $location) {
          //   var params = $location.search();
          //   return apiservice.getGistFile(params.id, params.version, 'icon.svg')
          // }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
