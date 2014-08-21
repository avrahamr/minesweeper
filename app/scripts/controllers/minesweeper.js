'use strict';

(function () {

  /* @ngInject */
  function MinesweeperController(MinesweeperBoard) {
    this.rows = 10;
    this.cols = 10;
    this.mines = 15;

    this.startGame = function () {
      this.minesweeperBoard = new MinesweeperBoard(this.rows, this.cols, this.mines);
    };

    this.startGame();
  }

  angular
    .module('minesweeperAppInternal')
    .controller('MinesweeperController', MinesweeperController);

})();
