'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('CreateCtrl', function ($scope, $timeout, $http, $location, $uibModal, Upload, currencies, rates, editorpicks) {

    //edit mode
    $scope.viewModel = 'input';
    $scope.editorpicks = editorpicks;
    $scope.editorpicks.forEach(function(d){
      d.isEditorpick = true;
    })

    //source comparison values
    $scope.currencies = currencies;
    $scope.bignumber;
    $scope.description;
    $scope.units = d3.keys($scope.currencies);
    //$scope.selUnit = 'USD';
    $scope.selUnit = {selected:'USD'};

    //output comparison values

    $scope.comparisons = [];

    $scope.objDescription;
    $scope.objvalue;
    $scope.source;
    $scope.showImageButton = true;
    $scope.icon;

    $scope.selectedComparisons = [];

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
    $scope.fontsList = [
      {label:'Montserrat/Open', slug:'moop'},
      {label:'Tizio/Caio', slug:'tica'},
      {label:'Gino/Pinotto', slug:'gipi'}
    ];
    $scope.selectedFonts = $scope.fontsList[0].slug;
    $scope.iconsSize = ['small', 'medium', 'large'];
    $scope.iconSize = $scope.iconsSize[1];
    $scope.iconsStyle = ['light', 'dark'];
    $scope.iconStyle = $scope.iconsStyle[0];
    $scope.layouts = ['tabs', 'columns'];
    $scope.layout = $scope.layouts[0];

    $scope.addComparison_old = function(){
      $scope.editMode = true;
      var id = $scope.comparisons.length?$scope.comparisons.length:0;
      var elm = {
        objDescription: '',
        source: '',
        credits: '',
        itemsNumber: '',
        objvalue: '',
        id : id,
        icon: '',
        isSelected: false,
        isActive:true
      }
      $scope.comparisons.push(elm)
    }

    $scope.addComparison = function(comparison){

      if(!comparison.id){
        var id = $scope.comparisons.length?$scope.comparisons.length+1:1;
        comparison.id = id;
        $scope.comparisons.push(comparison)
      }
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

    $scope.modComparisons = function(isSelected, id){
      //console.log(isSelected, id)
      if(isSelected){
        $scope.comparisons.filter(function(d){
          return d.id == id;
        })[0].isSelected = true;
        $scope.selectedComparisons.push(id)
        //console.log("aggiunto")
      }else{
        $scope.selectedComparisons.splice($scope.selectedComparisons.indexOf(id),1)
        $scope.comparisons.filter(function(d){
          return d.id == id;
        })[0].isSelected = false;
      }
    }

    $scope.modEditorpicks = function(isSelected, id){
      //console.log(isSelected, id)
      if(isSelected){
        $scope.editorpicks.filter(function(d){
          return d.id == id;
        })[0].isSelected = true;
        $scope.selectedComparisons.push(id)
      }else{
        $scope.selectedComparisons.splice($scope.selectedComparisons.indexOf(id),1)
        $scope.editorpicks.filter(function(d){
          return d.id == id;
        })[0].isSelected = false;
      }
    }

    $scope.open = function (comparison) {

      var modalInstance = $uibModal.open({
        templateUrl: 'views/addicon.html',
        controller: 'IconmodalCtrl',
        size: 'lg',
        resolve: {
          comparison: function () {
            return comparison;
          },
          bignumber:function(){
            return $scope.bignumber;
          },
          selUnit: function(){
            return $scope.selUnit.selected;
          }
        }
      });

      modalInstance.result.then(function (comparison) {
          $scope.addComparison(comparison)
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.$watch('icon', function (newValue, oldValue) {
      if(newValue != oldValue && newValue){
        $scope.upload([$scope.icon]);
      }
    });


    $scope.$watch("[boxwidth, boxheight, iframeheight, layout, iconStyle, iconSize, selectedFonts, gistId, gistVersion]", function (newValue, oldValue) {
      if(newValue[0] && newValue[1] && newValue[2] && newValue[3] && newValue[4]){
        $scope.embedCode = '<iframe src="' +$scope.baseUrl
        + '&boxheight=' + newValue[1]
        + '&height=' + newValue[2]
        + '&layout=' + newValue[3]
        + '&style=' + newValue[4]
        + '&size=' + newValue[5]
        + '&fonts=' + newValue[6]
        + '&id='+ newValue[7] + '&version=' + newValue[8] +'" width="' + newValue[0] +'" height="' + newValue[2] +'" frameborder="0"></iframe>'
      }
    });

    // $scope.svgIcon;
    //
    // $scope.$watch("[objDescription, objvalue, svgIcon, source]", function (newValue, oldValue) {
    //   if(newValue[0] && newValue[1] && newValue[2] && newValue[3]){
    //       $scope.outButtonDisabled = false;
    //     }else{
    //       $scope.outButtonDisabled = true;
    //     }
    // });

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
        var comparisons = $scope.comparisons
          .filter(function(d){return d.isSelected})
          .map(function(d){
            var elm = {
              objDescription: d.objDescription,
              source: d.source,
              credits: d.credits,
              itemsNumber: Math.ceil($scope.bignumber/d.objvalue),
              icon: d.icon
            };
            return elm;
          })

        var changeRate = $scope.selUnit != 'USD'?{rate: rates.rates[selUnit],date:rates.timestamp}:null;

        var config = {
          bignumber: $scope.bignumber,
          description: $scope.description,
          selUnit: $scope.selUnit,
          changeRate: changeRate,
          comparisons: comparisons
        }

        var data = 	{
          "description": $scope.description,
          "public": true,
          "files": {
            "config.json": {
              "content": JSON.stringify(config)
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
