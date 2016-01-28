'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('CreateCtrl', function ($scope, $timeout, $http, $location, $uibModal, $log, Upload, currencies, rates, editorpicks) {

    //edit mode
    $scope.viewModel = 'input';
    $scope.editorpicks = editorpicks;
    $scope.editorpicks.forEach(function(d,i){
      d.isEditorpick = true;
      d.id = 'ep_' + i;
      d.isActive = false;
      d.isSelected = false;
      d.itemsNumber = '';
    })
    $scope.rates = rates;
    $scope.comparisonSearch;
    $scope.Math = Math;

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
    $scope.iframeheight = 600;
    $scope.boxheight = $scope.iframeheight-200;
    $scope.gistId;
    $scope.gistVersion;
    $scope.embedCode;
    $scope.baseUrl = $location.absUrl().replace('#'+$location.path(),'#') + '/embed?';
    $scope.outButtonDisabled = true;
    $scope.addButtonDisabled =true;
    $scope.credits;
    $scope.savinggist = false;
    $scope.fontsList = [
      {label:'Montserrat/Open Sans', slug:'moop'},
      {label:'Georgia/Arial', slug:'tica'}
    ];
    $scope.selectedFonts = 'moop';

    $scope.iconsSize = ['small', 'medium', 'large'];
    $scope.iconSize = $scope.iconsSize[1];


    $scope.iconsStyle = ['light', 'dark'];
    $scope.iconStyle = $scope.iconsStyle[0];

    $scope.layouts = ['tabs', 'columns'];
    $scope.layout = $scope.layouts[0];

    $scope.emb = {
      boxwidth:$scope.boxwidth,
      boxheight:$scope.boxheight,
      iframeheight: $scope.iframeheight,
      iconSize:$scope.iconSize,
      iconStyle:$scope.iconStyle,
      layout: $scope.layout
    }

    $scope.disableComparison = function(comparison){

      var dis;

      if(comparison && comparison.isEditorpick){
        dis = $scope.bignumber/(comparison.objvalue*$scope.rates.rates[$scope.selUnit.selected])<1?true:false
      }else if(comparison && !comparison.isEditorpick){
        console.log("ciao")
        dis = $scope.bignumber/comparison.objvalue<1?true:false
      }
      if(dis){
        comparison.isSelected = false;
        var inSelected = $scope.selectedComparisons.filter(function(d){
          return d == comparison.id;
        })

        if(inSelected.length){
          $scope.selectedComparisons.splice($scope.selectedComparisons.indexOf(comparison.id),1)
        }

        return dis;
      }
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
      $scope.selectedComparisons.splice($scope.selectedComparisons.indexOf(id),1)
      //$scope.editMode = false;

    }

    $scope.modComparisons = function(isSelected, id){
      if(isSelected){
        $scope.comparisons.filter(function(d){
          return d.id == id;
        })[0].isSelected = true;
        $scope.selectedComparisons.push(id)
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

    $scope.backtoedit = function(){
      $scope.viewModel = 'input'
      $scope.gistId = null;
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


    $scope.updateEmbedCode = function(){
      $scope.boxheight = $scope.emb.iframeheight-200;
      $scope.emb.boxheight = $scope.boxheight;

      $scope.embedCode = '<iframe src="' +$scope.baseUrl
      + '&boxheight=' + $scope.emb.boxheight
      + '&height=' + $scope.emb.iframeheight
      + '&layout=' + $scope.emb.layout
      + '&style=' + $scope.emb.iconStyle
      + '&size=' + $scope.emb.iconSize
      + '&fonts=' + $scope.emb.selectedFonts
      + '&id='+ $scope.gistId + '&version=' + $scope.gistVersion +'" width="' + $scope.emb.boxwidth +'" height="' + $scope.emb.iframeheight +'" frameborder="0"></iframe>'
    }


    $scope.getNumber = function(num, itemsNumber) {
      if(itemsNumber){
        return new Array(Math.round(itemsNumber));
      }else if(num){
        return new Array(Math.round(num));
      }
    }

    $scope.limit = 100
    $scope.increaseLimit = function () {
      //if ($scope.limit < $scope.items.length) {
        $scope.limit += 100;

      //}
    };

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
        var comparisons = $scope.comparisons.concat($scope.editorpicks)
          .filter(function(d){return d.isSelected})
          .map(function(d){
            var elm = {
              objDescription: d.objDescription,
              source: d.source,
              credits: d.credits,
              itemsNumber: Math.ceil($scope.bignumber/d.objvalue),
              id: d.id,
              icon: d.icon
            };
            return elm;
          })

        var changeRate = $scope.selUnit != 'USD'?{rate: rates.rates[$scope.selUnit.selected],date:rates.timestamp}:null;

        var config = {
          bignumber: $scope.bignumber,
          description: $scope.description,
          selUnit: $scope.selUnit.selected,
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
          $scope.updateEmbedCode();
        }, function(error) {
            $scope.savinggist = false;
        });

    }


  });
