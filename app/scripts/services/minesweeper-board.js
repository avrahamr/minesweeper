'use strict';

(function () {
  /* @ngInject */
  function minesweeperBoardFactory(minePlanter, messages) {
    return function MinesweeperBoard(rows, cols, num) {
      var board = [];
      _(rows).times(function (i) {
        var row = [];
        _(cols).times(function (j) {
          row.push({
            mine: false,
            open: false,
            flag: false,
            pos: {x: i, y: j},
            adjacentMines: 0,
            label: '#',
            reveal: function () {
              this.open = true;
              if (this.mine) {
                this.label = '*';
              } else {
                if (this.adjacentMines === 0) {
                  this.label = '';
                } else {
                  this.label = '' + this.adjacentMines;
                }
              }
            },
            mark: function () {
              if (!this.open) {
                this.flag = !this.flag;
              }
              if (this.flag) {
                this.label = '!';
              } else {
                this.label = '#';
              }
            }
          });
        });
        board.push(row);
      });

      function incrementAdjacent(x, y) {
        for (var i = Math.max(x - 1, 0); i <= Math.min(x + 1, rows - 1); i++) {
          for (var j = Math.max(y - 1, 0); j <= Math.min(y + 1, cols - 1); j++) {
            if (i !== x || j !== y) { //Not the same cell;
              board[i][j].adjacentMines++;
            }
          }
        }
      }

      var mines = minePlanter.mines(rows, cols, num);
      mines.forEach(function (mine) {
        board[mine.x][mine.y].mine = true;
        incrementAdjacent(mine.x, mine.y);
      });

      this.board = board;
      this.message = messages.START;

      function mineOrOpen(cell) {
        return cell.mine || cell.open;
      }

      function haveWon(board) {
        return board.every(function (row) {
          return row.every(mineOrOpen);
        });
      }

      function openAdjacentAssNeeded(board, pos) {
        if (board[pos.x][pos.y].adjacentMines > 0) {
          return;
        }
        for (var i = Math.max(pos.x - 1, 0); i <= Math.min(pos.x + 1, rows - 1); i++) {
          for (var j = Math.max(pos.y - 1, 0); j <= Math.min(pos.y + 1, cols - 1); j++) {
            if (i !== pos.x || j !== pos.y) { //Not the same cell;
              var cell = board[i][j];
              if (!cell.mine && !cell.open) {
                cell.reveal();
                openAdjacentAssNeeded(board, cell.pos);
              }
            }
          }
        }
      }

      this.click = function (x, y) {
        var cell = board[x][y];
        if (cell.flag) {
          return;
        }
        cell.reveal();

        if (cell.mine) {
          this.message = messages.LOST;
          return;
        }
        openAdjacentAssNeeded(this.board, cell.pos);
        if (haveWon(this.board)) {
          this.message = messages.WIN;
        } else {
          this.message = messages.KEEP_GOING;
        }
      };

      this.mark = function (x, y) {
        var cell = board[x][y];
        cell.mark();

        if (haveWon(this.board)) {
          this.message = messages.WIN;
        } else {
          this.message = messages.KEEP_GOING;
        }
      }
    };
  }

  angular
    .module('minesweeperAppInternal')
    .factory('MinesweeperBoard', minesweeperBoardFactory);

})();
