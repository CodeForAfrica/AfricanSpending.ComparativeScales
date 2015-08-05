'use strict';

describe('Directive: svgIcon', function () {

  // load the directive's module
  beforeEach(module('comparativescalesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<svg-icon></svg-icon>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the svgIcon directive');
  }));
});
