'use strict';

describe('Controller: SpinnerCtrl', function () {

  // load the controller's module
  beforeEach(module('angularmonApp'));

  var SpinnerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpinnerCtrl = $controller('SpinnerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SpinnerCtrl.awesomeThings.length).toBe(3);
  });
});
