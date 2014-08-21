'use strict';

(function () {

  /* @ngInject */
  function MinePlanter(randomizer) {
    function contains(array, item) {
      for (var i = 0; i < array.length; i++) {
        if (angular.equals(array[i], item)) {
          return true;
        }
      }
      return false;
    }

    // Public API here
    this.mines = function (rows, cols, num) {
      var resp = [];
      while (resp.length < num) {
        var mine = {
          x: randomizer.random(rows),
          y: randomizer.random(cols)
        };
        if (!contains(resp, mine)) {
          resp.push(mine);
        }
      }
      return resp;
    };
  }

  angular
    .module('minesweeperAppInternal')
    .service('minePlanter', MinePlanter);

})();
