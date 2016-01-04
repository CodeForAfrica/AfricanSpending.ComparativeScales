'use strict';

describe('Directive: svgIconPreview', function () {

  // load the directive's module
  beforeEach(module('comparativescalesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<svg-icon-preview></svg-icon-preview>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the svgIconPreview directive');
  }));
});
