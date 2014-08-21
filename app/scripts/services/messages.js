'use strict';
(function () {
  var messages = {
    START: 'minesweeper.start',
    KEEP_GOING: 'minesweeper.keep.going',
    WIN: 'minesweeper.win',
    LOST: 'minesweeper.lost'
  };
  angular
    .module('minesweeperAppInternal')
    .constant('messages', messages);
}());
