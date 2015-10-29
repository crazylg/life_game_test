var chai = require('chai');
var expect = require('chai').expect;
var assert = require('assert');
var main_file = require('./main');

function shouldconsider(x, y) {
    if (x < 1 || y <1 || x > main_file.column || y > main_file.row)
    	return false;
    return true;
};

describe('Test main.js', function(){
	describe('Test init_map()', function(){
		it('should init every grid\'s value to 0', function(){
			main_file.init_map();
			for (var i = 0; i < main_file.column; i++) {
				for (var j = 0; j < main_file.row; j++) {
					var element = main_file.map[i][j]
					expect(element).to.equal(0);
				}
			}
		});
	});

    describe('Test set_wall(i, j)', function(){
    	it('should set the value of map[][](0 or 1) as -1, map[][](-1) as 0', function(){
    		main_file.map[10][10] = 0;
    		main_file.map[10][11] = 1;
    		main_file.map[10][12] = -1;
    		main_file.set_wall(10, 10);
    		main_file.set_wall(10, 11);
    		main_file.set_wall(10, 12);
    		expect(main_file.map[10][10]).to.equal(-1);
    		expect(main_file.map[10][11]).to.equal(-1);
    		expect(main_file.map[10][12]).to.equal(0);
    	});
    });

    describe('Test randomData()', function(){
    	it('should have about total * start_percent_of_cell alive cells', function(){
			main_file.init_map();
			main_file.randomData(main_file.map, main_file.start_percent_of_cell);
    		var live_cell = 0;
    		var total = main_file.column * main_file.row;
    		for (var i = 0; i < main_file.column; i++) {
				for (var j = 0; j < main_file.row; j++) {
					var element = main_file.map[i][j]
					if (element == 1) {
                	    live_cell++;
					}
					else if (element == -1){
                    	total --;
					}
				}
			}
			var per = parseFloat(live_cell/total);
			var flag = true;
			if (per >= main_file.start_percent_of_cell - 0.05 && per <= main_file.start_percent_of_cell + 0.05)
				flag = true;
			else
				flag = false;
			expect(flag).to.equal(true);
			
    	});
    });

    describe('Test getRoot(m, x, y)', function(){
    	it('should return the value of m[x][y], if m[x][y] isn\'t out of the map or a wall cell, or it will return 0', function(){
			expect(main_file.getRoot(main_file.map, -1, 0)).to.equal(0);
    		expect(main_file.getRoot(main_file.map, -1, -1)).to.equal(0);
    		expect(main_file.getRoot(main_file.map, 0, -1)).to.equal(0);
    		expect(main_file.getRoot(main_file.map, main_file.column, 0)).to.equal(0);
    		expect(main_file.getRoot(main_file.map, 0, main_file.row)).to.equal(0);
    		expect(main_file.getRoot(main_file.map, main_file.column, main_file.row)).to.equal(0);
    		main_file.map[10][10] = 0;
    		main_file.map[10][11] = 1;
    		main_file.map[10][12] = -1;
			expect(main_file.getRoot(main_file.map, 10, 10)).to.equal(0);
			expect(main_file.getRoot(main_file.map, 10, 11)).to.equal(1);
			expect(main_file.getRoot(main_file.map, 10, 12)).to.equal(0);
    	});
    });

    describe('Test countBeside(m, x, y)', function(){
    	it('should calculate the number of alive cells around [x][y]', function(){
			main_file.init_map();
    		for (var i = 0; i < 5; i++)
				for (var j = 0; j < 5; j++)
					main_file.map[i][j] = 1;
			expect(main_file.countBeside(main_file.map, 0, 0)).to.equal(4);
			expect(main_file.countBeside(main_file.map, 0, 1)).to.equal(5);
			expect(main_file.countBeside(main_file.map, 0, 2)).to.equal(6);
			expect(main_file.countBeside(main_file.map, 0, 3)).to.equal(5);
			expect(main_file.countBeside(main_file.map, 0, 4)).to.equal(4);
			expect(main_file.countBeside(main_file.map, 1, 0)).to.equal(5);
			expect(main_file.countBeside(main_file.map, 1, 1)).to.equal(6);
			expect(main_file.countBeside(main_file.map, 1, 2)).to.equal(7);
			expect(main_file.countBeside(main_file.map, 1, 3)).to.equal(6);
			expect(main_file.countBeside(main_file.map, 1, 4)).to.equal(5);
			expect(main_file.countBeside(main_file.map, -1, 4)).to.equal(0);
			expect(main_file.countBeside(main_file.map, 0, -1)).to.equal(0);
			expect(main_file.countBeside(main_file.map, main_file.column, 0)).to.equal(0);
			expect(main_file.countBeside(main_file.map, 0, main_file.row)).to.equal(0);
    	});
    });
	
	describe('Test updateMatrix(map)', function(){
		it('should satisfy rules of the game', function(){
			main_file.init_map();
			main_file.map[0][1] = 1;
			main_file.map[0][2] = 1;
			main_file.map[0][3] = 1;
			main_file.map[0][4] = 1;
			
			main_file.map[8][1] = 1;
			main_file.map[8][2] = 0;
			main_file.map[8][3] = 1;
			main_file.map[8][4] = 1;
			
			main_file.map[12][1] = 0;
			main_file.map[12][2] = 1;
			main_file.map[12][3] = 1;
			
			main_file.map[20][0] = 1;
			main_file.map[20][1] = 1;
			main_file.map[20][2] = 0;
			main_file.map[20][3] = 1;
			main_file.map[20][4] = 1;
			
			main_file.map[30][0] = 1;
			main_file.map[30][1] = 1;
			main_file.map[30][2] = 1;
			main_file.map[30][3] = 1;
			main_file.map[30][4] = 1;
			
			main_file.updateMatrix(main_file.map);
			
    		expect(main_file.map[0][1]).to.equal(1);
    		expect(main_file.map[0][2]).to.equal(1);
			
    		expect(main_file.map[8][2]).to.equal(1);
			
    		expect(main_file.map[12][1]).to.equal(0);
			
			expect(main_file.map[20][2]).to.equal(0);
			
			expect(main_file.map[30][2]).to.equal(0);
		});
	});
});