'use strict';

describe('Directive: vtabs', function () {

  // load the directive's module
  beforeEach(module('comparativescalesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vtabs></vtabs>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the vtabs directive');
  }));
});
