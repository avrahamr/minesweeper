'use strict';

describe('Service: randomizer', function () {

  // load the service's module
  beforeEach(function () {
    module('minesweeperAppInternal');

    //add your mocks here
  });

  // instantiate service
  var randomizer;
  beforeEach(inject(function (_randomizer_) {
    randomizer = _randomizer_;
  }));

  it('should do something', function () {
    expect(randomizer.someMethod()).toBe(42);
  });

});
