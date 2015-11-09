'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('MainCtrl', function ($scope, $timeout, $http, $location, Upload, currencies) {

    //edit mode
    $scope.viewModel = 'input';

    //source comparison values
    $scope.currencies = currencies;
    $scope.bignumber;
    $scope.description;
    $scope.units = d3.keys($scope.currencies);
    $scope.selUnit = 'USD';

    //output comparison values

    $scope.comparisons = [];

    $scope.objDescription;
    $scope.objvalue;
    $scope.source;
    $scope.showImageButton = true;
    $scope.icon;

    //output mode values
    $scope.boxwidth = 600;
    $scope.boxheight = 300;
    $scope.iframeheight = 600;
    $scope.gistId;
    $scope.gistVersion;
    $scope.embedCode;
    $scope.baseUrl = $location.absUrl() + 'embed?';
    $scope.outButtonDisabled = true;
    $scope.addButtonDisabled =true;
    $scope.credits;
    $scope.savinggist = false;

    $scope.addComparison = function(){
      $scope.editMode = true;
      var id = $scope.comparisons.length?$scope.comparisons.length:0;
      var elm = {
        objDescription: '',
        source: '',
        credits: '',
        itemsNumber: '',
        id : id,
        icon: '',
        isSelected: false,
        isActive:true
      }
      $scope.comparisons.push(elm)

    }

    $scope.saveComparison = function(id){
        var comparison = $scope.comparisons.filter(function(d){
          return d.id == id
        })

        if(comparison.length){
          comparison[0].isActive = false;
        }else{
          console.warn("No comparison found!")
        }
        $scope.editMode = false;
    }

    $scope.removeComparison = function(id){

      var ids = $scope.comparisons.map(function(d){return d.id});
      $scope.comparisons.splice(ids.indexOf(id),1)
      $scope.editMode = false;

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

    $scope.upload = function (files, index) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var reader = new FileReader();
					reader.onload = function(e) {
						var text = reader.result;
            $timeout(function(){

              var comparison = $scope.comparisons.filter(function(d){
                return d.id == index;
              })

              if(comparison.length){
                comparison[0].icon = text;
              }else{
                console.warn("No comparison found!")
              }
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
          $scope.gistId = response.data.id
          $scope.gistVersion = response.data.history[0].version;
          $scope.savinggist = false;
        }, function(error) {
            $scope.savinggist = false;
        });

    }


  });
