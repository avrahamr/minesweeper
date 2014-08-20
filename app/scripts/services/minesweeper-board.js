'use strict';

(function () {

  /* @ngInject */
  function minesweeperBoardFactory() {
    return function MinesweeperBoard(rows, cols) {
      var board = [];
      _(rows).times(function (i) {
        var row = [];
        _(cols).times(function (j) {
          row.push({mine: false, pos: {x: i, y: j}});
        });
        board.push(row);
      });

      this.board = board;
    };
  }

  angular
    .module('minesweeperAppInternal')
    .factory('MinesweeperBoard', minesweeperBoardFactory);

})();
