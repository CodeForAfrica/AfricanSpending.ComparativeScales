'use strict';

describe('Service: apiservice', function () {

  // load the service's module
  beforeEach(module('comparativescalesApp'));

  // instantiate service
  var apiservice;
  beforeEach(inject(function (_apiservice_) {
    apiservice = _apiservice_;
  }));

  it('should do something', function () {
    expect(!!apiservice).toBe(true);
  });

});
