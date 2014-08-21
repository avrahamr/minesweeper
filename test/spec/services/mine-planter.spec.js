'use strict';

describe('Service: minePlanter', function () {

  // load the service's module
  var randomSpy;
  beforeEach(function () {
    module('minesweeperAppInternal');

    randomSpy = jasmine.createSpy('random');
    //add your mocks here
    module({
      randomizer: {
        random: randomSpy
      }
    });
  });

  // instantiate service
  var minePlanter;
  beforeEach(inject(function (_minePlanter_) {
    minePlanter = _minePlanter_;
  }));

  it('should return 1 mine positions', function () {
    randomSpy.andReturn(1);
    expect(minePlanter.mines(10, 10, 1)).toEqual([{x: 1, y: 1}]);
    expect(randomSpy).toHaveBeenCalled();
    expect(randomSpy.callCount).toBe(2);
    expect(randomSpy.argsForCall).toEqual([[10], [10]]);
  });

  it('should return 2 mine positions', function () {
    var nextRandom = 0;
    randomSpy.andCallFake(function () {
      return ++nextRandom;
    });
    expect(minePlanter.mines(10, 10, 2)).toEqual([{x: 1, y: 2}, {x: 3, y: 4}]);

    expect(randomSpy).toHaveBeenCalled();
    expect(randomSpy.callCount).toBe(4);
  });

  it('should return 2 mine positions without repeating any mine', function () {
    var nextRandom = 0;
    randomSpy.andCallFake(function () {
      ++nextRandom;
      if (nextRandom < 5) {
        return 1;
      }
      return nextRandom;
    });
    expect(minePlanter.mines(10, 10, 2)).toEqual([{x: 1, y: 1}, {x: 5, y: 6}]);

    expect(randomSpy).toHaveBeenCalled();
    expect(randomSpy.callCount).toBe(6);
  });
});
