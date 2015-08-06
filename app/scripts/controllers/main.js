'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('MainCtrl', function ($scope, $timeout, $http, $location, Upload) {
    $scope.viewModel = 'input';
    $scope.bignumber;
    $scope.description;
    $scope.objDescription;
    $scope.objvalue;
    $scope.source;
    $scope.units = ['USD', 'ZAR'];
    $scope.selUnit = $scope.units[0];
    $scope.showComparison = false;
    $scope.showImage = false;
    $scope.showImageButton = true;
    $scope.icon;
    $scope.boxwidth = 600;
    $scope.boxheight = 300;
    $scope.iframeheight = 600;
    //$scope.gistId = 'b529d1b9692e12f20004';
    $scope.gistId;
    $scope.gistVersion;
    $scope.embedCode;
    $scope.baseUrl = $location.absUrl() + 'embed?';
    $scope.outButtonDisabled = true;
    $scope.credits;
    $scope.savinggist = false;

    $scope.addComparison = function(){
      $scope.showComparison = true;
    }

    $scope.addImage = function(){
      $scope.showImage = true;
    }

    $scope.$watch('icon', function (newValue, oldValue) {
      if(newValue != oldValue && newValue){
        $scope.upload([$scope.icon]);
      }
    });

    $scope.$watch("[boxwidth, boxheight, gistId, iframeheight, gistVersion]", function (newValue, oldValue) {
      if(newValue[0] && newValue[1] && newValue[2] && newValue[3] && newValue[4]){
        $scope.embedCode = '<iframe src="' +$scope.baseUrl
        + 'width=' + newValue[0]
        + '&boxheight='
        + newValue[1]
         + '&id='+ newValue[2] + '&version=' + newValue[4] +'" width="' + newValue[0] +'" height="' + newValue[3] +'" frameborder="0"></iframe>'
      }
    });

    $scope.svgIcon;

    $scope.$watch("[objDescription, objvalue, svgIcon, source]", function (newValue, oldValue) {
      if(newValue[0] && newValue[1] && newValue[2] && newValue[3]){
          $scope.outButtonDisabled = false;
        }else{
          $scope.outButtonDisabled = true;
        }
    });

    $scope.getNumber = function(num) {
      if(num){
        return new Array(Math.round(num));
      }
    }

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //console.log(file)

                var reader = new FileReader();

					reader.onload = function(e) {
						var text = reader.result;
            $timeout(function(){
              $scope.svgIcon = text;
            })

			    };

					reader.readAsText(file);
            }
        }
    };

    $scope.publishGist = function(){
        var config = {
          bignumber: $scope.bignumber,
          description: $scope.description,
          selUnit: $scope.selUnit,
          objDescription: $scope.objDescription,
          source: $scope.source,
          credits: $scope.credits,
          itemsNumber: Math.ceil($scope.bignumber/$scope.objvalue)
        }
            var data = 	{
      	  "description": $scope.description,
      	  "public": true,
      	  "files": {
      	    "config.json": {
      	      "content": JSON.stringify(config)
      	    },
            "icon.svg": {
              "content": $scope.svgIcon
            }
      	  }
      	};

      data = JSON.stringify( data );
      $scope.savinggist = true;
      $http.post('https://api.github.com/gists', data).
        then(function(response) {
          console.log(response)
          $scope.gistId = response.data.id
          $scope.gistVersion = response.data.history[0].version;
          $scope.savinggist = false;
        }, function(error) {
            console.log(error)
            $scope.savinggist = false;
        });

    }


  });
