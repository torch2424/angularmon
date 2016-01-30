'use strict';

describe('Service: BattleManager', function () {

  // load the service's module
  beforeEach(module('angularmonApp'));

  // instantiate service
  var BattleManager;
  beforeEach(inject(function (_BattleManager_) {
    BattleManager = _BattleManager_;
  }));

  it('should do something', function () {
    expect(!!BattleManager).toBe(true);
  });

});
