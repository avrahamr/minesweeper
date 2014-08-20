'use strict';

describe('Service: minesweeperBoard', function () {

  // load the service's module
  beforeEach(function () {
    module('minesweeperAppInternal');

    //add your mocks here
  });

  // instantiate service
  var MinesweeperBoard;
  beforeEach(inject(function (_MinesweeperBoard_) {
    MinesweeperBoard = _MinesweeperBoard_;
  }));

  it('should have board', function () {
    var minesweeperBoard = new MinesweeperBoard();
    expect(minesweeperBoard.board).toBeDefined();
  });

  it('should have board with 10 rows and 10 columns with mines', function () {
    var minesweeperBoard = new MinesweeperBoard(10, 10);
    expect(minesweeperBoard.board.length).toBe(10);
    minesweeperBoard.board.forEach(function (row) {
      expect(row.length).toBe(10);
      row.forEach(function (cell) {
        expect(cell.mine).toBeDefined();
      });
    });
  });

  it('should have board with 10 rows and 10 columns', function () {
    var minesweeperBoard = new MinesweeperBoard(10, 10);

    minesweeperBoard.board.forEach(function (row, x) {
      row.forEach(function (cell, y) {
        expect(cell.pos).toEqual({x: x, y: y});
      });
    });
  });

});
