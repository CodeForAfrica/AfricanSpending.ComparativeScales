'use strict';

describe('Controller: IconmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('comparativescalesApp'));

  var IconmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IconmodalCtrl = $controller('IconmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IconmodalCtrl.awesomeThings.length).toBe(3);
  });
});
