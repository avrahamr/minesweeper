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

  it('should return a number between 0 and 9', function () {
    expect(randomizer.random(10)).toBeGreaterThan(-1);
    expect(randomizer.random(10)).toBeLessThan(10);
  });

});
