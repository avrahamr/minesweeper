'use strict';

(function () {

  /* @ngInject */
  function Randomizer() {
    // Public API here
    this.random = function (max) {
      return Math.floor(Math.random() * max);
    };
  }

  angular
    .module('minesweeperAppInternal')
    .service('randomizer', Randomizer);

})();
