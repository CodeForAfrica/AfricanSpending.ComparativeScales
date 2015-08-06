'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('MainCtrl', function ($scope, $timeout, $http, Upload) {
    $scope.viewModel = 'input';
    $scope.bignumber;
    $scope.description;
    $scope.objDescription;
    $scope.objvalue;
    $scope.units = ['USD', 'ZAR'];
    $scope.selUnit = $scope.units[0];
    $scope.showComparison = false;
    $scope.showImage = false;
    $scope.showImageButton = true;
    $scope.icon;
    $scope.boxwidth = 600;
    $scope.boxheight = 600;
    $scope.gistId = '50a3b5cee2d4a7fe12f4';
    $scope.embedCode;
    $scope.baseUrl = 'http://localhost:9000/#/embed?';



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

    $scope.$watch("[boxwidth, boxheight, gistId]", function (newValue, oldValue) {
      if(newValue[0] && newValue[1] && newValue[2]){
        $scope.embedCode = '<iframe src="' +$scope.baseUrl
        + 'width=' + newValue[0]
        + '&boxheight='
        + newValue[1]
         + '&id='+ newValue[2] + '" width="' + newValue[0] +'" frameborder="0"></iframe>'
      }
    });

    $scope.svgIcon;

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
          source: $scope.soure,
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
      console.log(data)
      $http.post('https://api.github.com/gists', data).
        then(function(response) {
          console.log(response)
          $scope.gistId = response.data.id
        }, function(error) {
            console.log(error)
        });

      // $.ajax({
      //     url: 'https://api.github.com/gists',
      //     success:function(d){ console.log(d) },
      //     type: 'POST',
      //     data: data,
      //     dataType: 'json'
      // })
    }


  });
