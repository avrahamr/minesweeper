'use strict';

(function () {

  /* @ngInject */
  function Randomizer() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var meaningOfLife = 42;

    // Public API here
    this.someMethod = function () {
      return meaningOfLife;
    };
  }

  angular
    .module('minesweeperAppInternal')
    .service('randomizer', Randomizer);

})();
