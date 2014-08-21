'use strict';

describe('Service: minesweeperBoard', function () {

  // load the service's module
  var minePlanterSpy;
  beforeEach(function () {
    module('minesweeperAppInternal');

    //add your mocks here
    minePlanterSpy = jasmine.createSpy('minePlanterSpy');
    //add your mocks here
    module({
      minePlanter: {
        mines: minePlanterSpy
      }
    });
  });

  // instantiate service
  var MinesweeperBoard, messages;
  beforeEach(inject(function (_MinesweeperBoard_, _messages_) {
    MinesweeperBoard = _MinesweeperBoard_;
    messages = _messages_;
  }));

  it('should have board', function () {
    minePlanterSpy.andReturn([]);
    var minesweeperBoard = new MinesweeperBoard();
    expect(minesweeperBoard.board).toBeDefined();
  });

  it('should have message start', function () {
    minePlanterSpy.andReturn([]);
    var minesweeperBoard = new MinesweeperBoard();
    expect(minesweeperBoard.board).toBeDefined();
    expect(minesweeperBoard.message).toBe(messages.START);
  });

  it('should have board with 10 rows and 10 columns with 0 mines', function () {
    minePlanterSpy.andReturn([]);
    var minesweeperBoard = new MinesweeperBoard(10, 10, 0);
    expect(minesweeperBoard.board.length).toBe(10);
    minesweeperBoard.board.forEach(function (row, x) {
      expect(row.length).toBe(10);
      row.forEach(function (cell, y) {
        expect(cell.mine).toBe(false);
        expect(cell.open).toBe(false);
        expect(cell.flag).toBe(false);
        expect(cell.pos).toEqual({x: x, y: y});
      });
    });

    expect(minePlanterSpy).toHaveBeenCalled();
    expect(minePlanterSpy.argsForCall).toEqual([[10, 10, 0]]);
    expect(minePlanterSpy.callCount).toBe(1);

    expect(minesweeperBoard.message).toBe(messages.START);
  });

  it('should have board with 2 rows and 2 columns with 2 mines', function () {
    minePlanterSpy.andReturn([{x: 0, y: 0}, {x: 1, y: 1}]);
    var minesweeperBoard = new MinesweeperBoard(2, 2, 2);
    expect(minesweeperBoard.board.length).toBe(2);
    var mines = 0;
    minesweeperBoard.board.forEach(function (row) {
      expect(row.length).toBe(2);
      row.forEach(function (cell) {
        if (cell.mine) {
          mines++;
        }
      });
    });
    expect(mines).toBe(2);
    expect(minesweeperBoard.board[0][0].mine).toBe(true);
    expect(minesweeperBoard.board[1][1].mine).toBe(true);
    expect(minesweeperBoard.board[0][1].mine).toBe(false);
    expect(minesweeperBoard.board[1][0].mine).toBe(false);

    expect(minePlanterSpy).toHaveBeenCalled();
    expect(minePlanterSpy.argsForCall).toEqual([[2, 2, 2]]);
    expect(minePlanterSpy.callCount).toBe(1);
    expect(minesweeperBoard.message).toBe(messages.START);
  });

  it('if you click on a mine it should return explode', function () {
    minePlanterSpy.andReturn([{x: 0, y: 0}]);
    var minesweeperBoard = new MinesweeperBoard(1, 1, 1);
    expect(minesweeperBoard.message).toBe(messages.START);
    minesweeperBoard.click(0, 0);
    expect(minesweeperBoard.board[0][0].open).toBe(true);
    expect(minesweeperBoard.board[0][0].mine).toBe(true);
    expect(minesweeperBoard.board[0][0].label).toBe('*');
    expect(minesweeperBoard.message).toBe(messages.LOST);
  });

  it('All adjacent cells on a 2x2 board with 1 mine should have label 1', function () {
    minePlanterSpy.andReturn([{x: 1, y: 1}]);
    var minesweeperBoard = new MinesweeperBoard(2, 2, 1);
    expect(minesweeperBoard.message).toBe(messages.START);
    minesweeperBoard.click(0, 0);
    expect(minesweeperBoard.board[0][0].open).toBe(true);
    expect(minesweeperBoard.board[0][0].mine).toBe(false);
    expect(minesweeperBoard.board[0][0].label).toBe('1');
    expect(minesweeperBoard.message).toBe(messages.KEEP_GOING);
    minesweeperBoard.click(0, 1);
    expect(minesweeperBoard.board[0][1].open).toBe(true);
    expect(minesweeperBoard.board[0][1].mine).toBe(false);
    expect(minesweeperBoard.board[0][1].label).toBe('1');
    expect(minesweeperBoard.message).toBe(messages.KEEP_GOING);
    minesweeperBoard.click(1, 0);
    expect(minesweeperBoard.board[1][0].open).toBe(true);
    expect(minesweeperBoard.board[1][0].mine).toBe(false);
    expect(minesweeperBoard.board[1][0].label).toBe('1');
    minesweeperBoard.click(1, 1);
    expect(minesweeperBoard.board[1][1].open).toBe(true);
    expect(minesweeperBoard.board[1][1].mine).toBe(true);
    expect(minesweeperBoard.board[1][1].label).toBe('*');
    expect(minesweeperBoard.message).toBe(messages.LOST);
  });

  it('The only adjacent cells on a 2x2 board with 3 mines should have label 3', function () {
    minePlanterSpy.andReturn([{x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}]);
    var minesweeperBoard = new MinesweeperBoard(2, 2, 3);
    expect(minesweeperBoard.message).toBe(messages.START);
    minesweeperBoard.click(0, 0);
    expect(minesweeperBoard.board[0][0].open).toBe(true);
    expect(minesweeperBoard.board[0][0].mine).toBe(false);
    expect(minesweeperBoard.board[0][0].label).toBe('3');
    expect(minesweeperBoard.message).toBe(messages.WIN);

    minesweeperBoard.click(0, 1);
    expect(minesweeperBoard.board[0][1].open).toBe(true);
    expect(minesweeperBoard.board[0][1].mine).toBe(true);
    expect(minesweeperBoard.board[0][1].label).toBe('*');
    expect(minesweeperBoard.message).toBe(messages.LOST);

    minesweeperBoard.click(1, 0);
    expect(minesweeperBoard.board[1][0].open).toBe(true);
    expect(minesweeperBoard.board[1][0].mine).toBe(true);
    expect(minesweeperBoard.board[1][0].label).toBe('*');
    expect(minesweeperBoard.message).toBe(messages.LOST);

    minesweeperBoard.click(1, 1);
    expect(minesweeperBoard.board[1][1].open).toBe(true);
    expect(minesweeperBoard.board[1][1].mine).toBe(true);
    expect(minesweeperBoard.board[1][1].label).toBe('*');
    expect(minesweeperBoard.message).toBe(messages.LOST);
  });

  it('it should tell you you have won when no more empty cells', function () {
    minePlanterSpy.andReturn([{x: 1, y: 1}]);
    var minesweeperBoard = new MinesweeperBoard(2, 2, 1);
    minesweeperBoard.click(0, 0);
    minesweeperBoard.click(0, 1);
    minesweeperBoard.click(1, 0);
    expect(minesweeperBoard.message).toBe(messages.WIN);
  });

  function allCells(board) {
    return board.reduce(function (prev, row) {
      return prev.concat(row);
    }, []);
  }

  it('it should open all empty cells if you click in a cell with no adjacent mines - 1 click win', function () {
    var minePos = {x: 0, y: 0};
    minePlanterSpy.andReturn([minePos]);
    var minesweeperBoard = new MinesweeperBoard(3, 3, 1);
    minesweeperBoard.click(2, 2);
    allCells(minesweeperBoard.board).forEach(function (cell) {
      if (_(cell.pos).isEqual(minePos)) {
        expect(cell.open).toBe(false);
      } else {
        expect(cell.open).toBe(true);
      }
    });
    expect(minesweeperBoard.message).toBe(messages.WIN);
  });

  it('it should stop opening adjacent cells if it has a number', function () {
    var mine1 = {x: 0, y: 1};
    var mine2 = {x: 1, y: 0};
    minePlanterSpy.andReturn([mine1, mine2]);
    var minesweeperBoard = new MinesweeperBoard(3, 3, 2);
    minesweeperBoard.click(2, 2);

    expect(minesweeperBoard.board[0][0]).toEqualData({mine: false, open: false, flag: false, adjacentMines: 2, label: '#', pos: {x: 0, y: 0}});
    expect(minesweeperBoard.board[0][1]).toEqualData({mine: true, open: false, flag: false, adjacentMines: 1, label: '#', pos: {x: 0, y: 1}});
    expect(minesweeperBoard.board[0][2]).toEqualData({mine: false, open: false, flag: false, adjacentMines: 1, label: '#', pos: {x: 0, y: 2}});

    expect(minesweeperBoard.board[1][0]).toEqualData({mine: true, open: false, flag: false, adjacentMines: 1, label: '#', pos: {x: 1, y: 0}});
    expect(minesweeperBoard.board[1][1]).toEqualData({mine: false, open: true, flag: false, adjacentMines: 2, label: '2', pos: {x: 1, y: 1}});
    expect(minesweeperBoard.board[1][2]).toEqualData({mine: false, open: true, flag: false, adjacentMines: 1, label: '1', pos: {x: 1, y: 2}});

    expect(minesweeperBoard.board[2][0]).toEqualData({mine: false, open: false, flag: false, adjacentMines: 1, label: '#', pos: {x: 2, y: 0}});
    expect(minesweeperBoard.board[2][1]).toEqualData({mine: false, open: true, flag: false, adjacentMines: 1, label: '1', pos: {x: 2, y: 1}});
    expect(minesweeperBoard.board[2][2]).toEqualData({mine: false, open: true, flag: false, adjacentMines: 0, label: '', pos: {x: 2, y: 2}});

    expect(minesweeperBoard.message).toBe(messages.KEEP_GOING);
  });

  it('if you mark a mine it should be flagged, and check if you win', function () {
    minePlanterSpy.andReturn([{x: 0, y: 0}]);
    var minesweeperBoard = new MinesweeperBoard(1, 1, 1);
    expect(minesweeperBoard.message).toBe(messages.START);
    minesweeperBoard.mark(0, 0);
    expect(minesweeperBoard.board[0][0].open).toBe(false);
    expect(minesweeperBoard.board[0][0].flag).toBe(true);
    expect(minesweeperBoard.board[0][0].label).toBe('!');
    expect(minesweeperBoard.message).toBe(messages.WIN);
  });

  it('if you mark a mine you cant click, but you can unmark', function () {
    minePlanterSpy.andReturn([{x: 1, y: 1}]);
    var minesweeperBoard = new MinesweeperBoard(2, 2, 1);
    expect(minesweeperBoard.message).toBe(messages.START);
    minesweeperBoard.mark(1, 1);
    expect(minesweeperBoard.board[1][1].open).toBe(false);
    expect(minesweeperBoard.board[1][1].flag).toBe(true);
    expect(minesweeperBoard.board[1][1].label).toBe('!');
    expect(minesweeperBoard.message).toBe(messages.KEEP_GOING);

    minesweeperBoard.click(1, 1);
    expect(minesweeperBoard.board[1][1].open).toBe(false);
    expect(minesweeperBoard.board[1][1].flag).toBe(true);
    expect(minesweeperBoard.board[1][1].label).toBe('!');
    expect(minesweeperBoard.message).toBe(messages.KEEP_GOING);

    minesweeperBoard.mark(1, 1);
    expect(minesweeperBoard.board[1][1].open).toBe(false);
    expect(minesweeperBoard.board[1][1].flag).toBe(false);
    expect(minesweeperBoard.board[1][1].label).toBe('#');
    expect(minesweeperBoard.message).toBe(messages.KEEP_GOING);

  });

});
