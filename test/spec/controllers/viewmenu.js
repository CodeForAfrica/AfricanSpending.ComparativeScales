'use strict';

describe('Controller: ViewmenuCtrl', function () {

  // load the controller's module
  beforeEach(module('comparativescalesApp'));

  var ViewmenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewmenuCtrl = $controller('ViewmenuCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
